package com.corhuila.Backend_CaffeNet.modules.comprobante_reserva.IService;

import com.corhuila.Backend_CaffeNet.common.base.IBaseService;
import com.corhuila.Backend_CaffeNet.modules.comprobante_reserva.Entity.Comprobante_reserva;

import java.util.Optional;

public interface IComprobante_reservaService extends IBaseService<Comprobante_reserva> {

    Optional<Comprobante_reserva> findByPagoReservaId(Long pagoId) throws Exception;
}

