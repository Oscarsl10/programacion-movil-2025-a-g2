package com.corhuila.Backend_CaffeNet.modules.admin.IRepository;

import com.corhuila.Backend_CaffeNet.modules.admin.Entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IAdminRepository extends JpaRepository <Admin, String> {
    boolean existsAdminByEmail(String email); // Método para verificar si el correo existe
}
