package com.corhuila.Backend_CaffeNet.modules.pago.Entity;

import com.corhuila.Backend_CaffeNet.common.base.ABaseEntity;
import com.corhuila.Backend_CaffeNet.modules.pedido.Entity.Pedido;
import jakarta.persistence.*;

@Entity
@Table(name = "pago")
public class Pago extends ABaseEntity {

    @Column(name = "metodo_Pago")
    private String metodo_Pago;

    @Column(name = "monto")
    private String monto;

    @ManyToOne
    @JoinColumn(name = "pedido_id", nullable = false) // Clave foránea
    private Pedido pedido;

    public String getMetodo_Pago() {
        return metodo_Pago;
    }

    public void setMetodo_Pago(String metodo_Pago) {
        this.metodo_Pago = metodo_Pago;
    }

    public String getMonto() {
        return monto;
    }

    public void setMonto(String monto) {
        this.monto = monto;
    }

    public Pedido getPedido() {
        return pedido;
    }

    public void setPedido(Pedido pedido) {
        this.pedido = pedido;
    }

}
