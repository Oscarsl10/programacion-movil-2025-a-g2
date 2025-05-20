package com.corhuila.Backend_CaffeNet.modules.pago.Entity;

import com.corhuila.Backend_CaffeNet.common.base.ABaseEntity;
import com.corhuila.Backend_CaffeNet.modules.detalle_pedido.Entity.Detalle_Pedido;
import com.corhuila.Backend_CaffeNet.modules.user.Entity.Users;
import jakarta.persistence.*;

@Entity
@Table(name = "pago")
public class Pago extends ABaseEntity {

    @Column(name = "metodo_Pago")
    private String metodo_Pago;

    @Column(name = "monto")
    private Double monto;

    @ManyToOne
    @JoinColumn(name = "detalle_pedido_id", nullable = false) // Clave foránea
    private Detalle_Pedido detalle_pedido;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Users users;

    public String getMetodo_Pago() {
        return metodo_Pago;
    }

    public void setMetodo_Pago(String metodo_Pago) {
        this.metodo_Pago = metodo_Pago;
    }

    public Double getMonto() {
        return monto = detalle_pedido.getCarBuy().getTotal();
    }

    public void setMonto(Double monto) {
        this.monto = monto;
    }

    public Users getUsers() {
        return users;
    }

    public void setUsers(Users users) {
        this.users = users;
    }

    public Detalle_Pedido getDetalle_pedido() {
        return detalle_pedido;
    }

    public void setDetalle_pedido(Detalle_Pedido detalle_pedido) {
        this.detalle_pedido = detalle_pedido;
    }
}
