package com.corhuila.parcial.modules.contacto.Service;

import com.corhuila.parcial.modules.contacto.Entity.Contacto;
import com.corhuila.parcial.modules.contacto.IRepository.IContactoRepository;
import com.corhuila.parcial.modules.contacto.IService.IContactoService;
import com.corhuila.parcial.common.base.ABaseService;
import com.corhuila.parcial.common.base.IBaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ContactoService extends ABaseService<Contacto> implements IContactoService {

    @Autowired
    private IContactoRepository clienteRepository;

    @Override
    protected IBaseRepository<Contacto, Long> getRepository() {
        return clienteRepository;
    }
}
