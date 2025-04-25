package com.corhuila.Backend_CaffeNet.modules.reserva.Entity;

import com.corhuila.Backend_CaffeNet.common.base.ABaseEntity;
import com.corhuila.Backend_CaffeNet.modules.user.Entity.Users;
import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "reserva")
public class Reserva extends ABaseEntity {

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "fecha_inicio")
    private Date fecha_inicio;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "fecha_fin")
    private Date fecha_fin;

    @Column(name = "numero_Personas")
    private Integer numero_Personas;

    @Column(name = "estado")
    private String estado;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Users users;


    public Date getFecha_inicio() {
        return fecha_inicio;
    }

    public void setFecha_inicio(Date fecha_inicio) {
        this.fecha_inicio = fecha_inicio;
    }

    public Integer getNumero_Personas() {
        return numero_Personas;
    }

    public void setNumero_Personas(Integer numero_Personas) {
        this.numero_Personas = numero_Personas;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public Users getUsers() {
        return users;
    }

    public void setUsers(Users users) {
        this.users = users;
    }

    public Date getFecha_fin() {
        return fecha_fin;
    }

    public void setFecha_fin(Date fecha_fin) {
        this.fecha_fin = fecha_fin;
    }
}
