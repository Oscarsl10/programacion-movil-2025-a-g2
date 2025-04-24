package com.corhuila.Backend_CaffeNet.modules.reserva.Controller;

import com.corhuila.Backend_CaffeNet.modules.reserva.IService.IReservaService;
import com.corhuila.Backend_CaffeNet.common.base.ABaseController;
import com.corhuila.Backend_CaffeNet.modules.reserva.Entity.Reserva;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = {"http://localhost:8100"})

@RestController
@RequestMapping("/api/v1/reserva")
public class ReservaController extends ABaseController<Reserva, IReservaService> {

    public ReservaController(IReservaService service) {
        super(service, "Continent");
    }
}
