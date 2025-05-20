package com.corhuila.Backend_CaffeNet.modules.mesa.Entity;

import com.corhuila.Backend_CaffeNet.common.base.ABaseEntity;
import com.corhuila.Backend_CaffeNet.common.base.ABaseService;
import jakarta.persistence.*;

@Entity
@Table(name = "mesa")
public class Mesa extends ABaseEntity {

    @Column(name = "numero", nullable = false, unique = true)
    private Integer numero;

    @Column(name = "capacidad", nullable = false)
    private Integer capacidad;

    @Column(name = "ubicacion", length = 100, nullable = false)
    private String ubicacion;

    @Column(name = "estado", length = 20)
    private String estado;

    @Column(name = "precio")
    private Double precio;

    public Integer getNumero() {
        return numero;
    }

    public void setNumero(Integer numero) {
        this.numero = numero;
    }

    public Integer getCapacidad() {
        return capacidad;
    }

    public void setCapacidad(Integer capacidad) {
        this.capacidad = capacidad;
    }

    public String getUbicacion() {
        return ubicacion;
    }

    public void setUbicacion(String ubicacion) {
        this.ubicacion = ubicacion;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public Double getPrecio() {
        return precio;
    }

    public void setPrecio(Double precio) {
        this.precio = precio;
    }
}
