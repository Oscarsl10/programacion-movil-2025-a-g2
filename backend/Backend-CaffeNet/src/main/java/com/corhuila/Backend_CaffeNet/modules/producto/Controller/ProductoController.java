package com.corhuila.Backend_CaffeNet.modules.producto.Controller;

import com.corhuila.Backend_CaffeNet.modules.producto.IService.IProductoService;
import com.corhuila.Backend_CaffeNet.common.base.ABaseController;
import com.corhuila.Backend_CaffeNet.modules.producto.Entity.Producto;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")

@RestController
@RequestMapping("/api/v1/producto")
public class ProductoController extends ABaseController<Producto, IProductoService> {

    public ProductoController(IProductoService service) {
        super(service, "Continent");
    }
}
