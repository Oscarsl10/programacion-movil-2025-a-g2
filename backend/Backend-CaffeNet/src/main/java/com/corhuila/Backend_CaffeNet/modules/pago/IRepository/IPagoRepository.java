package com.corhuila.Backend_CaffeNet.modules.pago.IRepository;

import com.corhuila.Backend_CaffeNet.common.base.IBaseRepository;
import com.corhuila.Backend_CaffeNet.modules.pago.Entity.Pago;
import org.springframework.stereotype.Repository;

@Repository
public interface IPagoRepository extends IBaseRepository<Pago, Long> {
}
