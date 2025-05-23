package com.corhuila.Backend_CaffeNet.modules.pago.Service;

import com.corhuila.Backend_CaffeNet.common.base.ABaseService;
import com.corhuila.Backend_CaffeNet.modules.car_buys.Entity.CarBuy;
import com.corhuila.Backend_CaffeNet.modules.car_buys.Enum.EstadoCarrito;
import com.corhuila.Backend_CaffeNet.modules.car_buys.IRepository.ICarBuyRepository;
import com.corhuila.Backend_CaffeNet.modules.detalle_pedido.Entity.Detalle_Pedido;
import com.corhuila.Backend_CaffeNet.modules.pago.Entity.Pago;
import com.corhuila.Backend_CaffeNet.modules.pago.IService.IPagoService;

import jakarta.transaction.Transactional;

import com.corhuila.Backend_CaffeNet.common.base.IBaseRepository;
import com.corhuila.Backend_CaffeNet.modules.pago.IRepository.IPagoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PagoService extends ABaseService<Pago> implements IPagoService {


    @Autowired
    private IPagoRepository pagoRepository;
    @Autowired
    private ICarBuyRepository carBuyRepository;

    @Override
    protected IBaseRepository<Pago, Long> getRepository() {
        return pagoRepository;
    }

    @Override
    @Transactional
    public Pago save(Pago entity) throws Exception {
        // Cambiar estado del carrito a COMPRADO
        Detalle_Pedido detalle = entity.getDetalle_pedido();
        if (detalle != null && detalle.getCarBuy() != null) {
            CarBuy carBuy = carBuyRepository.findById(detalle.getCarBuy().getId())
                .orElseThrow(() -> new Exception("CarBuy no encontrado"));
            carBuy.setEstado(EstadoCarrito.COMPRADO);
            carBuyRepository.save(carBuy);
        }
        return pagoRepository.save(entity);
    }
}
