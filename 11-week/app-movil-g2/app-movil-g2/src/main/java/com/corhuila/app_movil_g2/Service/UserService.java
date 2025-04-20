package com.corhuila.app_movil_g2.Service;

import com.corhuila.app_movil_g2.Entity.User;
import com.corhuila.app_movil_g2.IRepository.IBaseRepository;
import com.corhuila.app_movil_g2.IRepository.IUserRepository;
import com.corhuila.app_movil_g2.IService.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService extends ABaseService<User> implements IUserService {

    @Override
    protected IBaseRepository<User, Long> getRepository() {
        return userRepository;
    }

    @Autowired
    private IUserRepository userRepository;
}
