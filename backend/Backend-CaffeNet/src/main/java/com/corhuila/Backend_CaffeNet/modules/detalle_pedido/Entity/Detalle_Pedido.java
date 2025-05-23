package com.corhuila.Backend_CaffeNet.modules.detalle_pedido.Entity;

import com.corhuila.Backend_CaffeNet.common.base.ABaseEntity;
import com.corhuila.Backend_CaffeNet.modules.car_buys.Entity.CarBuy;
import com.corhuila.Backend_CaffeNet.modules.producto.Entity.Producto;
import com.corhuila.Backend_CaffeNet.modules.user.Entity.Users;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "detalle_pedido")
public class Detalle_Pedido extends ABaseEntity {


    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm", timezone = "America/Bogota")
    @Column(name = "fecha_emision")
    private Date fecha_emision;

    @ManyToOne
    @JoinColumn(name = "car_buy_id", nullable = false)
    private CarBuy carBuy;

    @ManyToOne
    @JoinColumn(name = "producto_id", nullable = false) // Clave foránea
    private Producto producto;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Users users;


    public Producto getProducto() {
        return producto;
    }

    public void setProducto(Producto producto) {
        this.producto = producto;
    }

    public Users getUsers() {
        return users;
    }

    public void setUsers(Users users) {
        this.users = users;
    }

    public CarBuy getCarBuy() {
        return carBuy;
    }

    public void setCarBuy(CarBuy carBuy) {
        this.carBuy = carBuy;
    }

    public Date getFecha_emision() {
        return fecha_emision;
    }

    public void setFecha_emision(Date fecha_emision) {
        this.fecha_emision = fecha_emision;
    }
}
