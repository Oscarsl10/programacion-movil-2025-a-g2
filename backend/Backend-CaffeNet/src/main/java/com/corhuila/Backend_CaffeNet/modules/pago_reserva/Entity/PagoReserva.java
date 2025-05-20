package com.corhuila.Backend_CaffeNet.modules.pago_reserva.Entity;

import com.corhuila.Backend_CaffeNet.common.base.ABaseEntity;
import com.corhuila.Backend_CaffeNet.modules.reserva.Entity.Reserva;
import com.corhuila.Backend_CaffeNet.modules.user.Entity.Users;
import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "pago_reserva")
public class PagoReserva extends ABaseEntity {

    @Column(name = "metodo_pago", nullable = false)
    private String metodo_pago;

    @Column(name = "monto")
    private BigDecimal monto;

    @ManyToOne
    @JoinColumn(name = "reserva_id", nullable = false)
    private Reserva reserva;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Users users;

    public String getMetod_pago() {
        return metodo_pago;
    }

    public void setMetod_pago(String metod_pago) {
        this.metodo_pago = metod_pago;
    }

    public BigDecimal getMonto() {
        return monto;
    }

    public void setMonto(BigDecimal monto) {
        this.monto = monto;
    }

    public Reserva getReserva() {
        return reserva;
    }

    public void setReserva(Reserva reserva) {
        this.reserva = reserva;
    }

    public String getMetodo_pago() {
        return metodo_pago;
    }

    public void setMetodo_pago(String metodo_pago) {
        this.metodo_pago = metodo_pago;
    }

    public Users getUsers() {
        return users;
    }

    public void setUsers(Users users) {
        this.users = users;
    }

    public void calcularMontoDesdeReserva() {
        if (reserva != null && reserva.getFechaInicio() != null && reserva.getFechaFin() != null) {
            long diferenciaMilisegundos = reserva.getFechaFin().getTime() - reserva.getFechaInicio().getTime();
            double horas = diferenciaMilisegundos / (1000.0 * 60 * 60); // convierte a horas

            double total = horas * reserva.getPrecio();
            this.monto = BigDecimal.valueOf(total);
        } else {
            this.monto = BigDecimal.ZERO; // Monto en cero si hay datos inválidos
        }
    }
}
