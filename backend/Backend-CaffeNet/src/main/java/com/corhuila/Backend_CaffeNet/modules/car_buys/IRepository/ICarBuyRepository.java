package com.corhuila.Backend_CaffeNet.modules.car_buys.IRepository;

import java.util.List;

import com.corhuila.Backend_CaffeNet.common.base.IBaseRepository;
import com.corhuila.Backend_CaffeNet.modules.car_buys.Entity.CarBuy;
import com.corhuila.Backend_CaffeNet.modules.car_buys.Enum.EstadoCarrito;
import com.corhuila.Backend_CaffeNet.modules.comprobante.Entity.Comprobante;

public interface ICarBuyRepository extends IBaseRepository<CarBuy, Long> {

    List<CarBuy> findByProductoIdAndEstado(Long productoId, EstadoCarrito estado);

    List<CarBuy> findByUserEmailAndProductoIdAndEstado(String email, Long productoId, EstadoCarrito estado);
}
