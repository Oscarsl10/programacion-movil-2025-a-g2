package com.corhuila.parcial.Service;

import com.corhuila.parcial.Entity.Reserva;
import com.corhuila.parcial.IRepository.IBaseRepository;
import com.corhuila.parcial.IRepository.IReservaRepository;
import com.corhuila.parcial.IService.IReservaService;
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
