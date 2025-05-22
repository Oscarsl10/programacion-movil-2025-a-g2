package com.corhuila.Backend_CaffeNet.modules.comprobante.Controller;

import com.corhuila.Backend_CaffeNet.modules.comprobante.IService.IComprobanteService;
import com.corhuila.Backend_CaffeNet.modules.comprobante_reserva.Entity.Comprobante_reserva;
import com.corhuila.Backend_CaffeNet.modules.pago.Entity.Pago;
import com.corhuila.Backend_CaffeNet.modules.pago.IRepository.IPagoRepository;
import com.corhuila.Backend_CaffeNet.modules.pago_reserva.Entity.PagoReserva;
import com.corhuila.Backend_CaffeNet.common.Dto.ApiResponseDto;
import com.corhuila.Backend_CaffeNet.common.base.ABaseController;
import com.corhuila.Backend_CaffeNet.modules.comprobante.Entity.Comprobante;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*")

@RestController
@RequestMapping("/api/v1/comprobante")
public class ComprobanteController extends ABaseController<Comprobante, IComprobanteService> {

    @Autowired
    private IPagoRepository pagoRepository;

    public ComprobanteController(IComprobanteService service) {
        super(service, "Continent");
    }

    @PostMapping("/generar_comprobante")
    public ResponseEntity<ApiResponseDto<Comprobante>> generarComprobante(@RequestParam Long pagoId) {
        try {
            Pago pago = pagoRepository.findById(pagoId)
                    .orElseThrow(() -> new RuntimeException("Pago no encontrado"));

            // Validación: evitar comprobantes duplicados para el mismo pago
            if (service.findByPagoId(pagoId).isPresent()) {
                return ResponseEntity.badRequest().body(
                        new ApiResponseDto<>("Ya existe un comprobante para este pago", null, false));
            }

            Comprobante comprobante = new Comprobante();
            comprobante.setFecha_emision(new Date());
            comprobante.setPago(pago);
            comprobante.setDetalle_pedido(pago.getDetalle_pedido());
            comprobante.setUsers(pago.getUsers());

            Comprobante creado = service.save(comprobante);

            return ResponseEntity.ok(new ApiResponseDto<>("Comprobante generado exitosamente", creado, true));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new ApiResponseDto<>(e.getMessage(), null, false));
        }
    }

    @GetMapping("/by-producto/{pagoId}")
    public ResponseEntity<ApiResponseDto<Comprobante>> getByPago(@PathVariable Long pagoId) {
        try {
            Comprobante c = service.findByPagoId(pagoId)
                    .orElseThrow(() -> new RuntimeException("Comprobante no encontrado para pagoId=" + pagoId));
            return ResponseEntity.ok(new ApiResponseDto<>("Comprobante encontrado", c, true));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(new ApiResponseDto<>(e.getMessage(), null, false));
        }
    }
}
