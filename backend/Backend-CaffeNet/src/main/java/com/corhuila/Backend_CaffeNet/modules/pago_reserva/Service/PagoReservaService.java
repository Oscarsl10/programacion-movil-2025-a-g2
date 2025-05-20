package com.corhuila.Backend_CaffeNet.modules.pago_reserva.Service;
import com.corhuila.Backend_CaffeNet.common.base.ABaseService;
import com.corhuila.Backend_CaffeNet.common.base.IBaseRepository;
import com.corhuila.Backend_CaffeNet.modules.pago_reserva.Entity.PagoReserva;
import com.corhuila.Backend_CaffeNet.modules.pago_reserva.IRepository.IPagoReservaRepository;
import com.corhuila.Backend_CaffeNet.modules.pago_reserva.IService.IPagoReservaService;
import com.corhuila.Backend_CaffeNet.modules.reserva.Entity.Reserva;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Service
public class PagoReservaService extends ABaseService<PagoReserva> implements IPagoReservaService {

    @Autowired
    private IPagoReservaRepository PagoReservaRepository;

    @Override
    protected IBaseRepository<PagoReserva, Long> getRepository() {
        return PagoReservaRepository;
    }

    @Override
    public PagoReserva save(PagoReserva pagoReserva) {
        pagoReserva.calcularMontoDesdeReserva(); // Se calcula automáticamente el monto
        return PagoReservaRepository.save(pagoReserva);
    }

    @Override
    public List<PagoReserva> findByReservaCodigo(String codigo) {
        return PagoReservaRepository.findByReservaCodigo(codigo);
    }

}
