package com.corhuila.Backend_CaffeNet.modules.admin.Controller;

import com.corhuila.Backend_CaffeNet.modules.admin.Entity.Admin;
import com.corhuila.Backend_CaffeNet.modules.user.Entity.Users;
import com.corhuila.Backend_CaffeNet.modules.user.IRepository.IUsersRepository;
import com.corhuila.Backend_CaffeNet.modules.admin.request.LoginAdminRequest;
import com.corhuila.Backend_CaffeNet.modules.admin.Service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = {"http://localhost:8100"})

@RestController
@RequestMapping("/api")
public class AdminRestController {

    @Autowired
    AdminService adminService;
    @Autowired
    IUsersRepository usersRepository;

    @GetMapping("/admin")
    public List<Admin> index(){
        return adminService.findAll();
    }

    @PostMapping("/addAdmin")
    public ResponseEntity<?> addAdmin(@RequestBody Admin admin, @RequestParam String authorizedEmail) {
        // Verifica si el usuario que está intentando registrar es "admin@gmail.com"
        if (!"admin@gmail.com".equals(authorizedEmail)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("No tienes permisos para esta acción.");
        }

        // Validación para no permitir el uso de un correo existente en Users
        Optional<Users> usersExistente = usersRepository.findById(admin.getEmail());
        if (usersExistente.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("USER_EMAIL");
        }

        try {
            Admin newAdmin = adminService.addAdmin(admin);
            return ResponseEntity.ok(newAdmin);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("ADMIN_EMAIL");
        }
    }

    @PostMapping("/loginAdmin")
    public Boolean loginAdmin(@RequestBody LoginAdminRequest loginAdminRequest){
        return adminService.loginAdmin(loginAdminRequest);
    }

    @GetMapping("/getAdmin/{email}")
    public Admin show(@PathVariable String email){
        return adminService.findById(email);
    }


    @GetMapping("/checkEmailAdmin")
    public ResponseEntity<Boolean> checkEmail(@RequestParam String email) {
        boolean exists = adminService.existsAdminByEmail(email);
        return ResponseEntity.ok(exists);
    }

    @PutMapping("/admin/{email}")
    @ResponseStatus(HttpStatus.CREATED)
    public Admin update(@RequestBody Admin admin, @PathVariable String email){
        Admin adminActual = adminService.findById(email);
        adminActual.setFull_name(admin.getFull_name());
        adminActual.setTelefono(admin.getTelefono());

        // Verifica si se envió una nueva contraseña antes de encriptarla
        if (admin.getPassword() != null && !admin.getPassword().isEmpty()) {
            adminActual.setPassword(adminService.hashContrasenia(admin.getPassword()));
        }

        return adminService.save(adminActual);
    }
}
