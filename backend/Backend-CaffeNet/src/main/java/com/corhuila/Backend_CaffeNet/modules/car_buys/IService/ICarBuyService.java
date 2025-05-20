package com.corhuila.Backend_CaffeNet.modules.car_buys.IService;

import com.corhuila.Backend_CaffeNet.common.base.IBaseService;
import com.corhuila.Backend_CaffeNet.modules.car_buys.Entity.CarBuy;
import com.corhuila.Backend_CaffeNet.modules.comprobante.Entity.Comprobante;

public interface ICarBuyService extends IBaseService<CarBuy> {

    void deleteAll();

    void deleteById(Long id);

}
