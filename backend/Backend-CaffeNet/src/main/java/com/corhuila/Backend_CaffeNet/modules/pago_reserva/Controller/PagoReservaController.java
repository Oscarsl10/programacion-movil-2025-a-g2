package com.corhuila.Backend_CaffeNet.modules.pago_reserva.Controller;

import com.corhuila.Backend_CaffeNet.common.base.ABaseController;
import com.corhuila.Backend_CaffeNet.modules.pago_reserva.Entity.PagoReserva;
import com.corhuila.Backend_CaffeNet.modules.pago_reserva.IService.IPagoReservaService;
import com.corhuila.Backend_CaffeNet.modules.pago_reserva.Service.PagoReservaService;
import com.corhuila.Backend_CaffeNet.modules.producto.Entity.Producto;
import com.corhuila.Backend_CaffeNet.modules.producto.IService.IProductoService;
import com.corhuila.Backend_CaffeNet.modules.reserva.Entity.Reserva;
import com.corhuila.Backend_CaffeNet.modules.reserva.IRepository.IReservaRepository;
import com.corhuila.Backend_CaffeNet.modules.reserva.Service.ReservaService;
import com.corhuila.Backend_CaffeNet.modules.user.Entity.Users;
import com.corhuila.Backend_CaffeNet.modules.user.IRepository.IUsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@CrossOrigin(origins = "*")

@RestController
@RequestMapping("/api/v1/pago/reserva")
public class PagoReservaController extends ABaseController<PagoReserva, IPagoReservaService> {

    @Autowired
    PagoReservaService pagoReservaService;
    @Autowired
    IReservaRepository reservaRepository;
    @Autowired
    IUsersRepository usersRepository;

    public PagoReservaController(IPagoReservaService service) {
        super(service, "Continent");
    }

    @PostMapping("/add")
    public ResponseEntity<PagoReserva> create(@RequestBody PagoReserva pagoReserva) {
        Reserva reserva = reservaRepository.findById(pagoReserva.getReserva().getId())
                .orElseThrow(() -> new RuntimeException("Reserva no encontrada"));

        Users usuario = usersRepository.findById(pagoReserva.getUsers().getEmail())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        pagoReserva.setReserva(reserva);
        pagoReserva.setUsers(usuario); // Aquí se asigna bien la relación

        PagoReserva nuevoPago = pagoReservaService.save(pagoReserva);

        return ResponseEntity.status(HttpStatus.CREATED).body(nuevoPago);
    }

    @GetMapping("/by-codigo")
    public ResponseEntity<List<PagoReserva>> getByReservaCodigo(@RequestParam String codigo) {
        List<PagoReserva> list = pagoReservaService.findByReservaCodigo(codigo);
        return ResponseEntity.ok(list);
    }

}
