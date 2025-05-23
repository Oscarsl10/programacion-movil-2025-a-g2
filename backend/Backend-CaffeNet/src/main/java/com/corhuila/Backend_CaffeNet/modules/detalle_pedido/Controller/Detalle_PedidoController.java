package com.corhuila.Backend_CaffeNet.modules.detalle_pedido.Controller;

import com.corhuila.Backend_CaffeNet.modules.detalle_pedido.IService.IDetalle_PedidoService;
import com.corhuila.Backend_CaffeNet.common.base.ABaseController;
import com.corhuila.Backend_CaffeNet.modules.detalle_pedido.Entity.Detalle_Pedido;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*")

@RestController
@RequestMapping("/api/v1/detalle_pedido")
public class Detalle_PedidoController extends ABaseController<Detalle_Pedido, IDetalle_PedidoService> {

    public Detalle_PedidoController(IDetalle_PedidoService service) {
        super(service, "Continent");
    }
}
