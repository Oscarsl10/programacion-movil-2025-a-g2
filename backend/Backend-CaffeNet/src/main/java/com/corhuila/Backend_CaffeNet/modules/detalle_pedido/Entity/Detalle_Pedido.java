package com.corhuila.Backend_CaffeNet.modules.detalle_pedido.Entity;

import com.corhuila.Backend_CaffeNet.common.base.ABaseEntity;
import com.corhuila.Backend_CaffeNet.modules.pedido.Entity.Pedido;
import com.corhuila.Backend_CaffeNet.modules.producto.Entity.Producto;
import com.corhuila.Backend_CaffeNet.modules.user.Entity.Users;
import jakarta.persistence.*;

@Entity
@Table(name = "detalle_pedido")
public class Detalle_Pedido extends ABaseEntity {

    @Column(name = "subtotal")
    private Double subtotal;

    @ManyToOne
    @JoinColumn(name = "pedido_id", nullable = false) // Clave foránea
    private Pedido pedido;

    @ManyToOne
    @JoinColumn(name = "producto_id", nullable = false) // Clave foránea
    private Producto producto;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Users users;

    public Double getSubtotal() {
        return subtotal = calcularSubtotal();
    }

    public void setSubtotal(Double subtotal) {
        this.subtotal = subtotal;
    }

    public Pedido getPedido() {
        return pedido;
    }

    public void setPedido(Pedido pedido) {
        this.pedido = pedido;
    }

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


    public double calcularSubtotal() {
        if (producto == null) {
            throw new IllegalStateException("El producto no puede ser nulo.");
        }

        if (producto.getPrecio() == null) {
            throw new IllegalStateException("El precio del producto no puede ser nulo.");
        }

        if (pedido.getCantidad() == null || pedido.getCantidad() <= 0) {
            throw new IllegalStateException("La cantidad debe ser mayor que cero.");
        }

        // Cálculo del subtotal
        double precio = producto.getPrecio();
        double totalPagar = pedido.getCantidad() * precio;

        // Guardar el subtotal en el atributo
        this.subtotal = totalPagar;

        return totalPagar;
    }
}
