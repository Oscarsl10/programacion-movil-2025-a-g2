package com.corhuila.Backend_CaffeNet.modules.mesa.Controller;

import com.corhuila.Backend_CaffeNet.common.base.ABaseController;
import com.corhuila.Backend_CaffeNet.modules.mesa.Entity.Mesa;
import com.corhuila.Backend_CaffeNet.modules.mesa.IService.IMesaService;
import com.corhuila.Backend_CaffeNet.modules.mesa.Service.MesaService;
import com.corhuila.Backend_CaffeNet.modules.reserva.IService.IReservaService;
import com.corhuila.Backend_CaffeNet.modules.reserva.Service.ReservaService;
import com.corhuila.Backend_CaffeNet.modules.user.Entity.Users;
import com.corhuila.Backend_CaffeNet.modules.user.Service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/mesas")
@CrossOrigin(origins = "*")
public class MesaController extends ABaseController<Mesa, IMesaService> {

    @Autowired
    private IMesaService mesaService;
    @Autowired
    private IReservaService reservaService;


    public MesaController(IMesaService service) {
        super(service, "Continent");
    }

    @PutMapping("/{id}/ocupar")
    public String ocuparMesa(@PathVariable Long id) {
        mesaService.ocuparMesa(id);
        return "Mesa marcada como OCUPADO.";
    }

    @PutMapping("/{id}/liberar")
    public String liberarMesa(@PathVariable Long id) {
        mesaService.liberarMesa(id);
        return "Mesa marcada como DISPONIBLE.";
    }

    @PutMapping("/liberar-finalizadas")
    public String liberarMesasFinalizadas() {
        reservaService.liberarMesasReservasFinalizadas();
        return "Mesas de reservas finalizadas liberadas.";
    }

    @GetMapping("/{id}/disponible")
    public boolean estaDisponible(@PathVariable Long id) {
        return mesaService.estaDisponible(id);
    }
}
