package com.corhuila.Backend_CaffeNet.modules.user.Service;

import com.corhuila.Backend_CaffeNet.modules.user.Entity.Users;
import com.corhuila.Backend_CaffeNet.modules.user.IRepository.IUsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HexFormat;
import java.util.List;

@Service
public class UsersService {

    @Autowired
    IUsersRepository usersRepository;


    public boolean existsByEmail(String email) {
        return usersRepository.existsByEmail(email);
    }

    @Transactional(readOnly = true)
    public Users findById(String email){
        return usersRepository.findById(email).orElse(null);
    }

    public Users addUser(Users user) {
        if (existsByEmail(user.getEmail())) { // Primero verifica si el email ya existe
            throw new RuntimeException("El correo ya está registrado.");
        }

        user.setPassword(hashContrasenia(user.getPassword()));
        return usersRepository.save(user);
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

    @Transactional
    public Users save(Users user){
        return usersRepository.save(user);
    }

    public boolean verificarContrasenia(String rawPassword, String hashedPassword) {
        return hashedPassword.equals(hashContrasenia(rawPassword));
    }

    @Transactional(readOnly = true)
    public List<Users> findAll(){
        return (List<Users>) usersRepository.findAll();
    }
}