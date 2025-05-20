package com.corhuila.Backend_CaffeNet.modules.pago_reserva.IRepository;

import com.corhuila.Backend_CaffeNet.common.base.IBaseRepository;
import com.corhuila.Backend_CaffeNet.modules.pago_reserva.Entity.PagoReserva;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface IPagoReservaRepository extends IBaseRepository<PagoReserva, Long> {

    List<PagoReserva> findByReservaCodigo(String codigo);
}
