package com.corhuila.Backend_CaffeNet.modules.pedido.IRepository;

import com.corhuila.Backend_CaffeNet.common.base.IBaseRepository;
import com.corhuila.Backend_CaffeNet.modules.pedido.Entity.Pedido;
import org.springframework.stereotype.Repository;

@Repository
public interface IPedidoRepository extends IBaseRepository<Pedido, Long> {
}
