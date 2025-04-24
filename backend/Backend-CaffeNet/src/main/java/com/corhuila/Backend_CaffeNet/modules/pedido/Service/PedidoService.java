package com.corhuila.Backend_CaffeNet.modules.pedido.Service;

import com.corhuila.Backend_CaffeNet.common.base.ABaseService;
import com.corhuila.Backend_CaffeNet.modules.detalle_pedido.Entity.Detalle_Pedido;
import com.corhuila.Backend_CaffeNet.modules.detalle_pedido.IRepository.IDetalle_PedidoRepository;
import com.corhuila.Backend_CaffeNet.modules.pedido.Entity.Pedido;
import com.corhuila.Backend_CaffeNet.modules.pedido.IService.IPedidoService;
import com.corhuila.Backend_CaffeNet.common.base.IBaseRepository;
import com.corhuila.Backend_CaffeNet.modules.pedido.IRepository.IPedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PedidoService extends ABaseService<Pedido> implements IPedidoService {

    @Autowired
    private IPedidoRepository pedidoRepository;

    @Override
    protected IBaseRepository<Pedido, Long> getRepository() {
        return pedidoRepository;
    }
}
