package com.corhuila.Backend_CaffeNet.modules.comprobante.Controller;

import com.corhuila.Backend_CaffeNet.modules.comprobante.IService.IComprobanteService;
import com.corhuila.Backend_CaffeNet.common.base.ABaseController;
import com.corhuila.Backend_CaffeNet.modules.comprobante.Entity.Comprobante;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*")

@RestController
@RequestMapping("/api/v1/comprobante")
public class ComprobanteController extends ABaseController<Comprobante, IComprobanteService> {

    public ComprobanteController(IComprobanteService service) {
        super(service, "Continent");
    }

}
