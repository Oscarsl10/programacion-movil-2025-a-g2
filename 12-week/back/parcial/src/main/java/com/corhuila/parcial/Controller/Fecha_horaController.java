package com.corhuila.parcial.Controller;

import com.corhuila.parcial.Entity.Fecha_hora;
import com.corhuila.parcial.IService.IFecha_horaService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = {"http://localhost:8100"})

@RestController
@RequestMapping("/api/v1/fecha_hora")
public class Fecha_horaController extends ABaseController<Fecha_hora, IFecha_horaService> {

    public Fecha_horaController (IFecha_horaService service) {
        super(service, "Continent");
    }
}
