package com.corhuila.Backend_CaffeNet.modules.detalle_pedido.Service;

import com.corhuila.Backend_CaffeNet.common.base.ABaseService;
import com.corhuila.Backend_CaffeNet.modules.detalle_pedido.Entity.Detalle_Pedido;
import com.corhuila.Backend_CaffeNet.modules.detalle_pedido.IService.IDetalle_PedidoService;
import com.corhuila.Backend_CaffeNet.common.base.IBaseRepository;
import com.corhuila.Backend_CaffeNet.modules.detalle_pedido.IRepository.IDetalle_PedidoRepository;
import com.corhuila.Backend_CaffeNet.modules.pedido.Entity.Pedido;
import com.corhuila.Backend_CaffeNet.modules.pedido.IRepository.IPedidoRepository;
import com.corhuila.Backend_CaffeNet.modules.producto.Entity.Producto;
import com.corhuila.Backend_CaffeNet.modules.producto.IRepository.IProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class Detalle_PedidoService extends ABaseService<Detalle_Pedido> implements IDetalle_PedidoService {

    @Autowired
    private IDetalle_PedidoRepository detalle_pedidoRepository;

    @Override
    protected IBaseRepository<Detalle_Pedido, Long> getRepository() {
        return detalle_pedidoRepository;
    }

}
