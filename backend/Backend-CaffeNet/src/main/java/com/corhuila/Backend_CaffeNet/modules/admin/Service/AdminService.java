package com.corhuila.Backend_CaffeNet.modules.admin.Service;

import com.corhuila.Backend_CaffeNet.modules.admin.Entity.Admin;
import com.corhuila.Backend_CaffeNet.modules.admin.IRepository.IAdminRepository;
import com.corhuila.Backend_CaffeNet.modules.admin.request.LoginAdminRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HexFormat;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class AdminService {

    @Autowired
    IAdminRepository adminRepository;
    @Autowired
    JavaMailSender mailSender;

    // Método para recuperar contraseña
    public void recuperarContrasenia(String email) {
        Optional<Admin> usuario = adminRepository.findById(email);

        if (usuario.isEmpty()) {
            throw new RuntimeException("El correo no está registrado.");
        }

        // Generar una nueva contraseña aleatoria
        String nuevaContrasenia = generarContraseniaAleatoria(8);
        String contraseniaEncriptada = hashContrasenia(nuevaContrasenia);

        // Guardar la nueva contraseña encriptada en la BD
        Admin admin = usuario.get();
        admin.setPassword(contraseniaEncriptada);
        adminRepository.save(admin);

        // Enviar la nueva contraseña por correo
        enviarCorreo(email, nuevaContrasenia);
    }

    // Método para generar una contraseña aleatoria
    private String generarContraseniaAleatoria(int length) {
        String caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        Random random = new Random();
        StringBuilder sb = new StringBuilder(length);

        for (int i = 0; i < length; i++) {
            sb.append(caracteres.charAt(random.nextInt(caracteres.length())));
        }
        return sb.toString();
    }

    // Método para enviar la nueva contraseña por correo
    private void enviarCorreo(String destinatario, String nuevaContrasenia) {
        SimpleMailMessage mensaje = new SimpleMailMessage();
        mensaje.setTo(destinatario);
        mensaje.setSubject("Recuperación de contraseña");
        mensaje.setText("Tu nueva contraseña temporal es: " + nuevaContrasenia +
                "\nPor favor, inicia sesión y cámbiala lo antes posible.");

        mailSender.send(mensaje);
    }

    public boolean existsAdminByEmail(String email) {
        return adminRepository.existsAdminByEmail(email);
    }

    @Transactional(readOnly = true)
    public Admin findById(String email){
        return adminRepository.findById(email).orElse(null);
    }

    public Admin addAdmin(Admin admin){
        if (existsAdminByEmail(admin.getEmail())) { // Primero verifica si el email ya existe
            throw new RuntimeException("El correo ya está registrado.");
        }

        admin.setPassword(hashContrasenia(admin.getPassword()));
        return adminRepository.save(admin);
    }

    public String hashContrasenia(String password){
        try{
            MessageDigest instancia = MessageDigest.getInstance("SHA-256");
            byte [] hash = instancia.digest(password.getBytes(StandardCharsets.UTF_8));
            return HexFormat.of().formatHex(hash);
        }catch (NoSuchAlgorithmException e){
            throw new RuntimeException("Error al encriptar la contraseña");
        }
    }

    public Boolean loginAdmin(LoginAdminRequest loginAdminRequest){
        Optional<Admin> admin = adminRepository.findById(loginAdminRequest.getUserId());

        if (admin.isEmpty()){
            return false;
        }

        Admin admin1 = admin.get();

        if (!admin1.getPassword().equals(hashContrasenia(loginAdminRequest.getPassword()))){
            return false;
        }

        return true;
    }

    @Transactional
    public Admin save(Admin admin){
        return adminRepository.save(admin);
    }


    @Transactional(readOnly = true)
    public List<Admin> findAll(){
        return (List<Admin>) adminRepository.findAll();
    }

    public boolean verificarContrasenia(String rawPassword, String hashedPassword) {
        return hashedPassword.equals(hashContrasenia(rawPassword));
    }
}
