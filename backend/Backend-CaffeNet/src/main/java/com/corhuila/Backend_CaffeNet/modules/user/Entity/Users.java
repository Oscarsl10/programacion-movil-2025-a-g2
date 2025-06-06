package com.corhuila.Backend_CaffeNet.modules.user.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class Users {

    public Users(){

    }

    public Users(String email, String full_name, String password){
        super();
        this.email = email;
        this.full_name = full_name;
        this.password = password;
    }

    @Id
    private String email;

    @Column(length = 100)
    private String full_name;

    private String password;

    @Column(length = 10)
    private String telefono;

    @Column(length = 100, nullable = false)
    private String direccion;


    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFull_name() {
        return full_name;
    }

    public void setFull_name(String full_name) {
        this.full_name = full_name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }
}
