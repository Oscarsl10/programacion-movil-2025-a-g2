package com.corhuila.Backend_CaffeNet.modules.pedido.Controller;

import com.corhuila.Backend_CaffeNet.modules.pedido.IService.IPedidoService;
import com.corhuila.Backend_CaffeNet.common.base.ABaseController;
import com.corhuila.Backend_CaffeNet.modules.pedido.Entity.Pedido;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = {"http://localhost:8100"})

@RestController
@RequestMapping("/api/v1/pedido")
public class PedidoController extends ABaseController<Pedido, IPedidoService> {

    public PedidoController(IPedidoService service) {
        super(service, "Continent");
    }
}
