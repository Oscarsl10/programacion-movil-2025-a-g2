package com.corhuila.Backend_CaffeNet.modules.pago_reserva.IService;

import com.corhuila.Backend_CaffeNet.common.base.IBaseService;
import com.corhuila.Backend_CaffeNet.modules.pago_reserva.Entity.PagoReserva;
import com.corhuila.Backend_CaffeNet.modules.producto.Entity.Producto;

import java.util.List;

public interface IPagoReservaService extends IBaseService<PagoReserva> {

    PagoReserva save(PagoReserva pagoReserva); // Se sobrescribe para calcular el monto

    List<PagoReserva> findByReservaCodigo(String codigo);
}
