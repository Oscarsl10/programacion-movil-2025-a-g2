package com.corhuila.Backend_CaffeNet.modules.comprobante_reserva.Controller;

import com.corhuila.Backend_CaffeNet.common.Dto.ApiResponseDto;
import com.corhuila.Backend_CaffeNet.common.base.ABaseController;
import com.corhuila.Backend_CaffeNet.modules.comprobante_reserva.Entity.Comprobante_reserva;
import com.corhuila.Backend_CaffeNet.modules.comprobante_reserva.IService.IComprobante_reservaService;
import com.corhuila.Backend_CaffeNet.modules.pago_reserva.Entity.PagoReserva;
import com.corhuila.Backend_CaffeNet.modules.pago_reserva.IRepository.IPagoReservaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@CrossOrigin(origins = "*")

@RestController
@RequestMapping("/api/v1/comprobante_reserva")
public class Comprobante_reservaController extends ABaseController<Comprobante_reserva, IComprobante_reservaService> {

    @Autowired
    private IPagoReservaRepository pagoReservaRepository;

    public Comprobante_reservaController(IComprobante_reservaService service) {
        super(service, "Continent");
    }

    @PostMapping("/generar")
    public ResponseEntity<ApiResponseDto<Comprobante_reserva>> generarComprobante(@RequestParam Long pagoId) {
        try {
            PagoReserva pago = pagoReservaRepository.findById(pagoId)
                    .orElseThrow(() -> new RuntimeException("Pago no encontrado"));

            Comprobante_reserva comprobante = new Comprobante_reserva();
            comprobante.setFecha_emision(new Date());
            comprobante.setPagoReserva(pago);
            comprobante.setReserva(pago.getReserva());
            comprobante.setUsers(pago.getUsers());

            Comprobante_reserva creado = service.save(comprobante);

            return ResponseEntity.ok(new ApiResponseDto<>("Comprobante generado exitosamente", creado, true));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new ApiResponseDto<>(e.getMessage(), null, false));
        }
    }

    @GetMapping("/by-pago/{pagoId}")
    public ResponseEntity<ApiResponseDto<Comprobante_reserva>> getByPago(@PathVariable Long pagoId) {
        try {
            Comprobante_reserva c = service.findByPagoReservaId(pagoId)
                    .orElseThrow(() -> new RuntimeException("Comprobante no encontrado para pagoId=" + pagoId));
            return ResponseEntity.ok(new ApiResponseDto<>("Comprobante encontrado", c, true));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(new ApiResponseDto<>(e.getMessage(), null, false));
        }
    }
}