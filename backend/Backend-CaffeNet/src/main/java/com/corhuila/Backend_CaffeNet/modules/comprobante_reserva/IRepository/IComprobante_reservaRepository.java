package com.corhuila.Backend_CaffeNet.modules.comprobante_reserva.IRepository;

import com.corhuila.Backend_CaffeNet.common.base.IBaseRepository;
import com.corhuila.Backend_CaffeNet.modules.comprobante_reserva.Entity.Comprobante_reserva;

import java.util.Optional;

public interface IComprobante_reservaRepository extends IBaseRepository<Comprobante_reserva, Long> {

    Optional<Comprobante_reserva> findByPagoReservaId(Long pagoId);

}
