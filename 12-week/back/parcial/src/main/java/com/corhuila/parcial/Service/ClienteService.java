package com.corhuila.parcial.Service;

import com.corhuila.parcial.Entity.Cliente;
import com.corhuila.parcial.IRepository.IBaseRepository;
import com.corhuila.parcial.IRepository.IClienteRepository;
import com.corhuila.parcial.IService.IClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ClienteService extends ABaseService<Cliente> implements IClienteService {

    @Override
    protected IBaseRepository<Cliente, Long> getRepository() {
        return clienteRepository;
    }

    @Autowired
    private IClienteRepository clienteRepository;
}
