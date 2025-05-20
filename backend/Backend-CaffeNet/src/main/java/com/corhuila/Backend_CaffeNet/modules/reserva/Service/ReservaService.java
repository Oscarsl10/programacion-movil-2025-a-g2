package com.corhuila.Backend_CaffeNet.modules.reserva.Service;

import com.corhuila.Backend_CaffeNet.common.base.ABaseService;
import com.corhuila.Backend_CaffeNet.modules.mesa.Entity.Mesa;
import com.corhuila.Backend_CaffeNet.modules.mesa.IRepository.IMesaRepository;
import com.corhuila.Backend_CaffeNet.modules.mesa.IService.IMesaService;
import com.corhuila.Backend_CaffeNet.modules.mesa.Service.MesaService;
import com.corhuila.Backend_CaffeNet.modules.reserva.Entity.Reserva;
import com.corhuila.Backend_CaffeNet.modules.reserva.IService.IReservaService;
import com.corhuila.Backend_CaffeNet.common.base.IBaseRepository;
import com.corhuila.Backend_CaffeNet.modules.reserva.IRepository.IReservaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;


@Service
public class ReservaService extends ABaseService<Reserva> implements IReservaService {


    @Autowired
    private IMesaRepository mesaRepository;
    @Autowired
    private IReservaRepository reservaRepository;
    @Autowired
    private IMesaService mesaService;

    @Override
    protected IBaseRepository<Reserva, Long> getRepository() {
        return reservaRepository;
    }

    @Override
    public void liberarMesasReservasFinalizadas() {
        Date ahora = new Date();
        List<Reserva> reservasFinalizadas = reservaRepository.findByFechaFinBeforeAndEstadoNot(ahora, "FINALIZADA");

        for (Reserva reserva : reservasFinalizadas) {
            Mesa mesa = reserva.getMesa();
            mesa.setEstado("DISPONIBLE");
            mesaRepository.save(mesa);

            reserva.setEstado("FINALIZADA");
            reservaRepository.save(reserva);
        }
    }

    @Override
    public void crearReserva(Reserva reserva) {
        Long idMesa = reserva.getMesa().getId();

        // 1) Obtener la mesa y validar capacidad
        Mesa mesa = mesaRepository.findById(idMesa)
                .orElseThrow(() -> new IllegalArgumentException("Mesa no encontrada"));

        if (reserva.getNumero_personas() > mesa.getCapacidad()) {
            throw new IllegalArgumentException(
                    "El número de personas (" + reserva.getNumero_personas() +
                            ") excede la capacidad de la mesa (" + mesa.getCapacidad() + ")."
            );
        }

        // 2) Verificar disponibilidad
        if (!mesaService.estaDisponible(idMesa)) {
            throw new IllegalStateException("La mesa seleccionada está ocupada.");
        }

        // 3) Crear reserva y ocupar mesa
        reserva.setEstado("ACTIVA");
        reservaRepository.save(reserva);
        mesaService.ocuparMesa(idMesa);
    }

    @Override
    public void finalizarReserva(Long idReserva) {
        Reserva reserva = reservaRepository.findById(idReserva)
                .orElseThrow(() -> new IllegalArgumentException("Reserva no encontrada"));

        reserva.setEstado("FINALIZADA");
        reservaRepository.save(reserva);

        mesaService.liberarMesa(reserva.getMesa().getId());
    }

    @Override
    public Optional<Reserva> findByCodigo(String codigo) {
        return reservaRepository.findByCodigo(codigo);
    }
}
