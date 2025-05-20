package com.corhuila.Backend_CaffeNet.modules.reserva.IRepository;

import com.corhuila.Backend_CaffeNet.common.base.IBaseRepository;
import com.corhuila.Backend_CaffeNet.modules.reserva.Entity.Reserva;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface IReservaRepository extends IBaseRepository<Reserva, Long> {
    List<Reserva> findByFechaFinBeforeAndEstadoNot(Date fechaFin, String estado);

    Optional<Reserva> findByCodigo(String codigo);
}
