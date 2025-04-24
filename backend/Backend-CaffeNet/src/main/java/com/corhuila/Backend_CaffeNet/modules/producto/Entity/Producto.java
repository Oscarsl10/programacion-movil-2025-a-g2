package com.corhuila.Backend_CaffeNet.modules.producto.Entity;

import com.corhuila.Backend_CaffeNet.common.base.ABaseEntity;
import jakarta.persistence.*;


@Entity
@Table(name = "producto")
public class Producto extends ABaseEntity {

    @Column(name = "nombre", length = 150)
    private String nombre;

    @Column(name = "descripcion", length = 250)
    private String descripcion;

    @Column(name = "estado")
    private String estado;

    @Column(name = "precio")
    private Double precio;

    @Column(name = "stock")
    private Integer stock;

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Double getPrecio() {
        return precio;
    }

    public void setPrecio(Double precio) {
        this.precio = precio;
    }

    public Integer getStock() {
        return stock;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }
}
