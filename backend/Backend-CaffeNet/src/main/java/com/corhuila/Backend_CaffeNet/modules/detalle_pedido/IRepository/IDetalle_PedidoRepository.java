package com.corhuila.Backend_CaffeNet.modules.detalle_pedido.IRepository;

import com.corhuila.Backend_CaffeNet.common.base.IBaseRepository;
import com.corhuila.Backend_CaffeNet.modules.detalle_pedido.Entity.Detalle_Pedido;
import org.springframework.stereotype.Repository;


@Repository
public interface IDetalle_PedidoRepository extends IBaseRepository<Detalle_Pedido, Long> {

}
