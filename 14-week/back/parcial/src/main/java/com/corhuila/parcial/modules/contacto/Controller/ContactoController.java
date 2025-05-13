package com.corhuila.parcial.modules.contacto.Controller;

import com.corhuila.parcial.modules.contacto.Entity.Contacto;
import com.corhuila.parcial.modules.contacto.IService.IContactoService;
import com.corhuila.parcial.common.base.ABaseController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*")

@RestController
@RequestMapping("/api/v1/contact")
public class ContactoController extends ABaseController<Contacto, IContactoService> {

    public ContactoController(IContactoService service) {
        super(service, "Continent");
    }
}
