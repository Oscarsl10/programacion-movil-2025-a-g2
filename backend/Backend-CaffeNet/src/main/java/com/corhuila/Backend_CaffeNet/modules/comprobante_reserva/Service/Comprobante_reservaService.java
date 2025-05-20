package com.corhuila.Backend_CaffeNet.modules.comprobante_reserva.Service;

import com.corhuila.Backend_CaffeNet.common.base.ABaseService;
import com.corhuila.Backend_CaffeNet.common.base.IBaseRepository;
import com.corhuila.Backend_CaffeNet.modules.comprobante_reserva.Entity.Comprobante_reserva;
import com.corhuila.Backend_CaffeNet.modules.comprobante_reserva.IRepository.IComprobante_reservaRepository;
import com.corhuila.Backend_CaffeNet.modules.comprobante_reserva.IService.IComprobante_reservaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class Comprobante_reservaService extends ABaseService<Comprobante_reserva> implements IComprobante_reservaService {

    @Autowired
    private IComprobante_reservaRepository comprobante_reservaRepository;

    @Override
    protected IBaseRepository<Comprobante_reserva, Long> getRepository() {
        return comprobante_reservaRepository;
    }

    @Override
    public Optional<Comprobante_reserva> findByPagoReservaId(Long pagoId) {
        return comprobante_reservaRepository.findByPagoReservaId(pagoId);
    }
}
