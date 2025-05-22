package com.corhuila.Backend_CaffeNet.modules.detalle_pedido.Service;

import com.corhuila.Backend_CaffeNet.common.base.ABaseService;
import com.corhuila.Backend_CaffeNet.modules.car_buys.Entity.CarBuy;
import com.corhuila.Backend_CaffeNet.modules.car_buys.Enum.EstadoCarrito;
import com.corhuila.Backend_CaffeNet.modules.car_buys.IRepository.ICarBuyRepository;
import com.corhuila.Backend_CaffeNet.modules.car_buys.IService.ICarBuyService;
import com.corhuila.Backend_CaffeNet.modules.detalle_pedido.Entity.Detalle_Pedido;
import com.corhuila.Backend_CaffeNet.modules.detalle_pedido.IService.IDetalle_PedidoService;
import com.corhuila.Backend_CaffeNet.modules.producto.Entity.Producto;
import com.corhuila.Backend_CaffeNet.modules.producto.IRepository.IProductoRepository;

import jakarta.transaction.Transactional;

import com.corhuila.Backend_CaffeNet.common.base.IBaseRepository;
import com.corhuila.Backend_CaffeNet.modules.detalle_pedido.IRepository.IDetalle_PedidoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class Detalle_PedidoService extends ABaseService<Detalle_Pedido> implements IDetalle_PedidoService {

    @Autowired
    private IDetalle_PedidoRepository detalle_pedidoRepository;
    @Autowired
    private ICarBuyRepository carBuyRepository;
    @Autowired
    private IProductoRepository productoRepository;
    @Autowired
    private ICarBuyService carBuyService;

    @Override
    protected IBaseRepository<Detalle_Pedido, Long> getRepository() {
        return detalle_pedidoRepository;
    }

    @Override
    @Transactional
    public Detalle_Pedido save(Detalle_Pedido entity) throws Exception {
        // 1) Cargar entidades
        CarBuy car = carBuyRepository.findById(entity.getCarBuy().getId())
                .orElseThrow(() -> new Exception("CarBuy no encontrado"));
        Producto producto = productoRepository.findById(entity.getProducto().getId())
                .orElseThrow(() -> new Exception("Producto no encontrado"));

        // 2) Validar stock
        int qty = car.getCantidad();
        if (producto.getStock() < qty) {
            throw new Exception("Stock insuficiente para procesar pedido. Disponible: "
                    + producto.getStock());
        }

        // 3) Descontar stock
        producto.setStock(producto.getStock() - qty);
        productoRepository.save(producto);

        // 4) Cambia el estado a SOLICITADO
        car.setEstado(EstadoCarrito.SOLICITADO);
        carBuyRepository.save(car);

        // 5) Fijar fecha de emisión
        entity.setFecha_emision(new java.util.Date());

        // 6) Guardar detalle de pedido
        Detalle_Pedido saved = detalle_pedidoRepository.save(entity);

        // 7) Limpiar carbuys (vaciar carrito)
        carBuyService.deleteAll();

        return saved;
    }

}
