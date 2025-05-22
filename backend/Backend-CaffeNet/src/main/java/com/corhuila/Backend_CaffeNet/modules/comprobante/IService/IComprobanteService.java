package com.corhuila.Backend_CaffeNet.modules.comprobante.IService;

import java.util.Optional;

import com.corhuila.Backend_CaffeNet.common.base.IBaseService;
import com.corhuila.Backend_CaffeNet.modules.comprobante.Entity.Comprobante;

public interface IComprobanteService extends IBaseService<Comprobante> {

    Comprobante save(Comprobante entity) throws Exception;
    Optional<Comprobante> findByPagoId(Long pagoId) throws Exception;
}
