package com.corhuila.Backend_CaffeNet.modules.reserva.Controller;

import com.corhuila.Backend_CaffeNet.modules.reserva.IService.IReservaService;
import com.corhuila.Backend_CaffeNet.common.base.ABaseController;
import com.corhuila.Backend_CaffeNet.modules.reserva.Entity.Reserva;
import com.corhuila.Backend_CaffeNet.modules.reserva.Service.ReservaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Map;

@CrossOrigin(origins = "*")

@RestController
@RequestMapping("/api/v1/reserva")
public class ReservaController extends ABaseController<Reserva, IReservaService> {

    @Autowired
    private IReservaService reservaService;

    public ReservaController(IReservaService service) {
        super(service, "Continent");
         this.reservaService=service;
    }

    @PostMapping("/liberar")
    public ResponseEntity<Map<String, String>> liberarMesasFinalizadas() {
        reservaService.liberarMesasReservasFinalizadas();
        return ResponseEntity.ok(Collections.singletonMap("message","Mesas liberadas correctamente."));
    }

    @PostMapping("/addReservation")
    public ResponseEntity<Map<String,String>> crearReserva(@RequestBody Reserva reserva) {
        reservaService.crearReserva(reserva);
        return ResponseEntity.ok(Collections.singletonMap("message","Reserva creada y mesa ocupada."));
    }

    @PutMapping("/{id}/finalizar")
    public String finalizarReserva(@PathVariable Long id) {
        reservaService.finalizarReserva(id);
        return "Reserva finalizada y mesa liberada.";
    }

    @GetMapping("/by-codigo")
    public ResponseEntity<Reserva> getByCodigo(@RequestParam String codigo) {
        return reservaService.findByCodigo(codigo)
                .map(res -> ResponseEntity.ok(res))
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }
}
