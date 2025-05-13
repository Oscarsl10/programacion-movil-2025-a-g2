package com.corhuila.parcial.Controller;

import com.corhuila.parcial.Entity.Mesa;
import com.corhuila.parcial.IService.IMesaService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = {"http://localhost:8100"})

@RestController
@RequestMapping("/api/v1/mesa")
public class MesaController extends ABaseController<Mesa, IMesaService> {

    public MesaController (IMesaService service) {
        super(service, "Continent");
    }

}
