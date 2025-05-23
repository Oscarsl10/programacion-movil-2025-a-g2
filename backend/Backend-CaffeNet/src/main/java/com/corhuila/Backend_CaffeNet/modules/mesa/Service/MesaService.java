package com.corhuila.Backend_CaffeNet.modules.mesa.Service;

import com.corhuila.Backend_CaffeNet.common.base.ABaseService;
import com.corhuila.Backend_CaffeNet.common.base.IBaseRepository;
import com.corhuila.Backend_CaffeNet.modules.mesa.Entity.Mesa;
import com.corhuila.Backend_CaffeNet.modules.mesa.IRepository.IMesaRepository;
import com.corhuila.Backend_CaffeNet.modules.mesa.IService.IMesaService;
import com.corhuila.Backend_CaffeNet.modules.user.Entity.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service

public class MesaService extends ABaseService<Mesa> implements IMesaService {

    @Autowired
    private IMesaRepository mesaRepository;

    @Override
    protected IBaseRepository<Mesa, Long> getRepository() {
        return mesaRepository;
    }

    @Override
    public void ocuparMesa(Long idMesa) {
        Mesa mesa = mesaRepository.findById(idMesa)
                .orElseThrow(() -> new IllegalArgumentException("Mesa no encontrada"));

        if (!"DISPONIBLE".equalsIgnoreCase(mesa.getEstado())) {
            throw new IllegalStateException("La mesa no está disponible para ser ocupada.");
        }

        mesa.setEstado("OCUPADO");
        mesaRepository.save(mesa);
    }

    @Override
    public boolean estaDisponible(Long idMesa) {
        Mesa mesa = mesaRepository.findById(idMesa)
                .orElseThrow(() -> new IllegalArgumentException("Mesa no encontrada"));

        return "DISPONIBLE".equalsIgnoreCase(mesa.getEstado());
    }

    @Override
    public void liberarMesa(Long idMesa) {
        Mesa mesa = mesaRepository.findById(idMesa)
                .orElseThrow(() -> new IllegalArgumentException("Mesa no encontrada"));

        mesa.setEstado("DISPONIBLE");
        mesaRepository.save(mesa);
    }
}
