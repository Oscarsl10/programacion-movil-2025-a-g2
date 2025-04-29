package com.corhuila.Backend_CaffeNet.modules.user.IRepository;

import com.corhuila.Backend_CaffeNet.modules.user.Entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IUsersRepository extends JpaRepository <Users, String> {
    boolean existsByEmail(String email); // Método para verificar si el correo existe
}
