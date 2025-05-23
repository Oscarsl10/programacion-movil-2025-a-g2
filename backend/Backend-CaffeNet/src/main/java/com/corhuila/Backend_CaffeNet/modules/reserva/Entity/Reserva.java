package com.corhuila.Backend_CaffeNet.modules.reserva.Entity;

import com.corhuila.Backend_CaffeNet.common.base.ABaseEntity;
import com.corhuila.Backend_CaffeNet.modules.mesa.Entity.Mesa;
import com.corhuila.Backend_CaffeNet.modules.pago_reserva.Entity.PagoReserva;
import com.corhuila.Backend_CaffeNet.modules.user.Entity.Users;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name = "reserva")
public class Reserva extends ABaseEntity {

    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm", timezone = "America/Bogota")
    @Column(name = "fecha_inicio", nullable = false)
    private Date fechaInicio;

    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm", timezone = "America/Bogota")
    @Column(name = "fecha_fin", nullable = false)
    private Date fechaFin;

    @Column(name = "numero_personas", nullable = false)
    private Integer numero_personas;

    @Column(name = "codigo", nullable = false, unique = true)
    private String codigo;

    @Column(name = "estado")
    private String estado = "Disponible";

    @Column(name = "precio")
    private Double precio;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Users users;

    @ManyToOne
    @JoinColumn(name = "mesa_id", nullable = false)
    private Mesa mesa;


    public Mesa getMesa() {
        return mesa;
    }

    public void setMesa(Mesa mesa) {
        this.mesa = mesa;
    }

    public Users getUsers() {
        return users;
    }

    public void setUsers(Users users) {
        this.users = users;
    }

    public Double getPrecio() {
        return precio = calcularMontoR();
    }

    public void setPrecio(Double precio) {
        this.precio = precio;
    }

    public Integer getNumero_personas() {
        return numero_personas;
    }

    public void setNumero_personas(Integer numero_personas) {
        this.numero_personas = numero_personas;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public Date getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaInicio(Date fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public Date getFechaFin() {
        return fechaFin;
    }

    public void setFechaFin(Date fechaFin) {
        this.fechaFin = fechaFin;
    }

    public String getEstado() {
        return estado;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public Double calcularMontoR() {
        if (this.getFechaInicio() != null && this.getFechaFin() != null && this.getMesa() != null) {
            long diferenciaMilisegundos = this.getFechaFin().getTime() - this.getFechaInicio().getTime();
            double horas = diferenciaMilisegundos / (1000.0 * 60 * 60); // Duración en horas
            double total = horas * this.getMesa().getPrecio(); // Usa el precio por hora de la mesa
            return Double.valueOf(total);
        } else {
            return 0.0;
        }
    }
}
