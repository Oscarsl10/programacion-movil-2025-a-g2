package com.corhuila.Backend_CaffeNet.modules.pago.Controller;

import com.corhuila.Backend_CaffeNet.modules.pago.IService.IPagoService;
import com.corhuila.Backend_CaffeNet.common.base.ABaseController;
import com.corhuila.Backend_CaffeNet.modules.pago.Entity.Pago;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")

@RestController
@RequestMapping("/api/v1/pago")
public class PagoController extends ABaseController<Pago, IPagoService> {

    public PagoController(IPagoService service) {
        super(service, "Continent");
    }
}
