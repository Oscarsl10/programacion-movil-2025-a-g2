package com.corhuila.Backend_CaffeNet.modules.mesa.IService;

import com.corhuila.Backend_CaffeNet.common.base.IBaseService;
import com.corhuila.Backend_CaffeNet.modules.mesa.Entity.Mesa;

public interface IMesaService extends IBaseService<Mesa> {

    public void ocuparMesa(Long idMesa);

    public boolean estaDisponible(Long idMesa);

    public void liberarMesa(Long idMesa);
}
