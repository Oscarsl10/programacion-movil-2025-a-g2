package com.corhuila.Backend_CaffeNet.modules.reserva.Service;

import com.corhuila.Backend_CaffeNet.common.base.ABaseService;
import com.corhuila.Backend_CaffeNet.modules.reserva.Entity.Reserva;
import com.corhuila.Backend_CaffeNet.modules.reserva.IService.IReservaService;
import com.corhuila.Backend_CaffeNet.common.base.IBaseRepository;
import com.corhuila.Backend_CaffeNet.modules.reserva.IRepository.IReservaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class ReservaService extends ABaseService<Reserva> implements IReservaService {

    @Override
    protected IBaseRepository<Reserva, Long> getRepository() {
        return reservaRepository;
    }

    @Autowired
    private IReservaRepository reservaRepository;
}
