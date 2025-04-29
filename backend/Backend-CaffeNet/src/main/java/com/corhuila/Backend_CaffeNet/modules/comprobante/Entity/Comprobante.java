package com.corhuila.Backend_CaffeNet.modules.comprobante.Entity;

import com.corhuila.Backend_CaffeNet.common.base.ABaseEntity;
import com.corhuila.Backend_CaffeNet.modules.pedido.Entity.Pedido;
import com.corhuila.Backend_CaffeNet.modules.user.Entity.Users;
import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "comprobante")
public class Comprobante extends ABaseEntity {

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "fecha_Emision")
    private Date fecha_Emision;

    @ManyToOne
    @JoinColumn(name = "pedido_id", nullable = false)
    private Pedido pedido;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Users users;

    public Date getFecha_Emision() {
        return fecha_Emision;
    }

    public void setFecha_Emision(Date fecha_Emision) {
        this.fecha_Emision = fecha_Emision;
    }

    public Pedido getPedido() {
        return pedido;
    }

    public void setPedido(Pedido pedido) {
        this.pedido = pedido;
    }

    public Users getUsers() {
        return users;
    }

    public void setUsers(Users users) {
        this.users = users;
    }
}
