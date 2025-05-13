package com.corhuila.parcial.Service;

import com.corhuila.parcial.Entity.Fecha_hora;
import com.corhuila.parcial.IRepository.IBaseRepository;
import com.corhuila.parcial.IRepository.IFecha_horaRepository;
import com.corhuila.parcial.IService.IFecha_horaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.Provider;
import java.security.SecureRandom;

@Service
public class Fecha_horaService extends ABaseService<Fecha_hora> implements IFecha_horaService {

    @Override
    protected IBaseRepository<Fecha_hora, Long> getRepository() {
        return fecha_horaRepository;
    }

    @Autowired
    private IFecha_horaRepository fecha_horaRepository;
}
