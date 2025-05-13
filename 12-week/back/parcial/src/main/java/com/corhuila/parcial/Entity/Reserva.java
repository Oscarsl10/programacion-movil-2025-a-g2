package com.corhuila.parcial.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "reserva")
public class Reserva extends ABaseEntity{

    @Column(name = "num_reserva")
    private Integer num_reserva;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Cliente cliente;

    @ManyToOne
    @JoinColumn(name = "fecha_hora_id", nullable= false)
    private Fecha_hora fecha_hora;

    @ManyToOne
    @JoinColumn(name = "mesa_id", nullable = false)
    private Mesa mesa;

    public Integer getNum_reserva() {
        return num_reserva;
    }

    public void setNum_reserva(Integer num_reserva) {
        this.num_reserva = num_reserva;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public Fecha_hora getFecha_hora() {
        return fecha_hora;
    }

    public void setFecha_hora(Fecha_hora fecha_hora) {
        this.fecha_hora = fecha_hora;
    }

    public Mesa getMesa() {
        return mesa;
    }

    public void setMesa(Mesa mesa) {
        this.mesa = mesa;
    }
}
