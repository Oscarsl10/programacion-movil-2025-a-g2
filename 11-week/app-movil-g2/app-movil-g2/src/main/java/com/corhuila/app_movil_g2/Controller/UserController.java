package com.corhuila.app_movil_g2.Controller;

import com.corhuila.app_movil_g2.Entity.User;
import com.corhuila.app_movil_g2.IService.IUserService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = {"http://localhost:8100"})

@RestController
@RequestMapping("/api/v1/user")
public class UserController extends ABaseController<User, IUserService> {

    public UserController (IUserService service) {
        super(service, "Continent");
    }
}
