package com.corhuila.parcial.modules.contacto.Entity;

import com.corhuila.parcial.common.base.ABaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "contacto")
public class Contacto extends ABaseEntity {

    @Column(name = "name", length = 250)
    private String name;
    @Column(name = "phone")
    private String phone;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
}
