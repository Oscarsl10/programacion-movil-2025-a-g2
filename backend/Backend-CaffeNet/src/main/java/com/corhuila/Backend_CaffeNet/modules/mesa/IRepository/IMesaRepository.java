package com.corhuila.Backend_CaffeNet.modules.mesa.IRepository;

import com.corhuila.Backend_CaffeNet.common.base.IBaseRepository;
import com.corhuila.Backend_CaffeNet.modules.mesa.Entity.Mesa;
import com.corhuila.Backend_CaffeNet.modules.pago.Entity.Pago;
import org.springframework.stereotype.Repository;

@Repository
public interface IMesaRepository extends IBaseRepository<Mesa, Long> {
}
