package com.corhuila.Backend_CaffeNet.modules.comprobante.Service;

import com.corhuila.Backend_CaffeNet.common.base.ABaseService;
import com.corhuila.Backend_CaffeNet.modules.comprobante.Entity.Comprobante;
import com.corhuila.Backend_CaffeNet.modules.comprobante.IService.IComprobanteService;
import com.corhuila.Backend_CaffeNet.common.base.IBaseRepository;
import com.corhuila.Backend_CaffeNet.modules.comprobante.IRepository.IComprobanteRepository;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class ComprobanteService extends ABaseService<Comprobante> implements IComprobanteService {

    @Autowired
    private IComprobanteRepository comprobanteRepository;

    @Override
    protected IBaseRepository<Comprobante, Long> getRepository() {
        return comprobanteRepository;
    }

    @Override
    public Optional<Comprobante> findByPagoId(Long pagoId) {
        return comprobanteRepository.findByPagoId(pagoId);
    }
}
