package com.corhuila.parcial.Service;

import com.corhuila.parcial.Entity.Mesa;
import com.corhuila.parcial.IRepository.IBaseRepository;
import com.corhuila.parcial.IRepository.IMesaRepository;
import com.corhuila.parcial.IService.IMesaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MesaService extends ABaseService<Mesa> implements IMesaService {

    @Override
    protected IBaseRepository<Mesa, Long> getRepository() {
        return mesaRepository;
    }

    @Autowired
    private IMesaRepository mesaRepository;
}
