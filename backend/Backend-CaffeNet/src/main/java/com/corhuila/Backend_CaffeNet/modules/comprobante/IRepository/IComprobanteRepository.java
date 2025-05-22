package com.corhuila.Backend_CaffeNet.modules.comprobante.IRepository;

import com.corhuila.Backend_CaffeNet.common.base.IBaseRepository;
import com.corhuila.Backend_CaffeNet.modules.comprobante.Entity.Comprobante;

import java.util.Optional;

import org.springframework.stereotype.Repository;

@Repository
public interface IComprobanteRepository extends IBaseRepository<Comprobante, Long> {

    Optional<Comprobante> findByPagoId(Long pagoId);
}
