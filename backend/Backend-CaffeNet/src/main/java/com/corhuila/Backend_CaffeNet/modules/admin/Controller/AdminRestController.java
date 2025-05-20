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

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "*")

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
        if (!"caffenet.service@gmail.com".equals(authorizedEmail)) {
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

    @GetMapping("/admin/{email}")
    public Admin show(@PathVariable String email){
        return adminService.findById(email);
    }


    @GetMapping("/checkEmailAdmin")
    public ResponseEntity<Boolean> checkEmail(@RequestParam String email) {
        boolean exists = adminService.existsAdminByEmail(email);
        return ResponseEntity.ok(exists);
    }

    @PutMapping("/admin/{email}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?> update(@RequestBody Map<String, String> requestData, @PathVariable String email) {
        Admin adminActual = adminService.findById(email);

        if (adminActual == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no encontrado.");
        }

        adminActual.setFull_name(requestData.get("full_name"));
        adminActual.setTelefono(requestData.get("telefono"));

        // Manejo de la actualización de la contraseña
        String oldPassword = requestData.get("oldPassword");
        String newPassword = requestData.get("newPassword");

        if (oldPassword != null && newPassword != null && !newPassword.isEmpty()) {
            // Verificar si oldPassword es correcta
            if (!adminService.verificarContrasenia(oldPassword, adminActual.getPassword())) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("La contraseña actual es incorrecta.");
            }

            // Verificar que la nueva contraseña no sea la misma que la actual
            String newPasswordHashed = adminService.hashContrasenia(newPassword);
            if (newPasswordHashed.equals(adminActual.getPassword())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("La nueva contraseña no puede ser igual a la actual.");
            }

            // Encriptar la nueva contraseña y guardarla
            adminActual.setPassword(adminService.hashContrasenia(newPassword));
        }

        Admin usuarioActualizado = adminService.save(adminActual);
        return ResponseEntity.ok(usuarioActualizado);
    }

    // Endpoint para recuperar la contraseña
    @PostMapping("/recuperar-contrasenia-admin")
    public ResponseEntity<Map<String, String>> recuperarContrasenia(@RequestParam String email) {
        Map<String, String> response = new HashMap<>();
        try {
            adminService.recuperarContrasenia(email);
            response.put("message", "Se ha enviado una nueva contraseña a tu correo.");
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
}
