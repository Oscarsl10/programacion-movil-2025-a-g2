package com.corhuila.Backend_CaffeNet.modules.car_buys.Service;

import com.corhuila.Backend_CaffeNet.common.base.ABaseService;
import com.corhuila.Backend_CaffeNet.common.base.IBaseRepository;
import com.corhuila.Backend_CaffeNet.modules.car_buys.Entity.CarBuy;
import com.corhuila.Backend_CaffeNet.modules.car_buys.Enum.EstadoCarrito;
import com.corhuila.Backend_CaffeNet.modules.car_buys.IRepository.ICarBuyRepository;
import com.corhuila.Backend_CaffeNet.modules.car_buys.IService.ICarBuyService;
import com.corhuila.Backend_CaffeNet.modules.producto.Entity.Producto;
import com.corhuila.Backend_CaffeNet.modules.producto.IRepository.IProductoRepository;

import jakarta.transaction.Transactional;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CarBuyService extends ABaseService<CarBuy> implements ICarBuyService {

    @Autowired
    private ICarBuyRepository carBuyRepository;
    @Autowired
    private IProductoRepository productoRepository;

    @Override
    protected IBaseRepository<CarBuy, Long> getRepository() {
        return carBuyRepository;
    }

    // Método para eliminar todos los productos
    public void deleteAll() {
        try {
            List<CarBuy> carBuys = carBuyRepository.findAll();
            for (CarBuy carBuy : carBuys) {
                carBuy.setEstado(EstadoCarrito.COMPRADO); // o INACTIVO si tienes ese estado
                carBuyRepository.save(carBuy);
            }
        } catch (Exception e) {
            throw new RuntimeException("Error al limpiar el carrito: " + e.getMessage());
        }
    }

    public void deleteById(Long id) {
        if (carBuyRepository.existsById(id)) {
            carBuyRepository.deleteById(id);
        } else {
            throw new RuntimeException("Producto con ID " + id + " no encontrado.");
        }
    }

    @Override
    @Transactional
    public CarBuy save(CarBuy entity) throws Exception {
        Producto producto = productoRepository
                .findById(entity.getProducto().getId())
                .orElseThrow(() -> new Exception("Producto no encontrado"));

        // Busca si ya hay un CarBuy ACTIVO para este producto
        CarBuy existente = carBuyRepository
                .findByProductoIdAndEstado(entity.getProducto().getId(), EstadoCarrito.ACTIVO)
                .stream()
                .findFirst()
                .orElse(null);

        // Si existe uno ACTIVO, suma la cantidad
        if (existente != null) {
            int nuevaCantidad = existente.getCantidad() + entity.getCantidad();
            if (producto.getStock() < nuevaCantidad) {
                throw new Exception("Stock insuficiente. Disponible: " + producto.getStock());
            }
            existente.setCantidad(nuevaCantidad);
            existente.setTotal(producto.getPrecio() * nuevaCantidad);
            return carBuyRepository.save(existente);
        } else {
            // Si no existe ACTIVO, crea uno nuevo (aunque haya uno COMPRADO)
            if (producto.getStock() < entity.getCantidad()) {
                throw new Exception("Stock insuficiente. Disponible: " + producto.getStock());
            }
            entity.setId(null); // <-- IMPORTANTE: fuerza a crear uno nuevo
            entity.setTotal(producto.getPrecio() * entity.getCantidad());
            entity.setEstado(EstadoCarrito.ACTIVO);
            return carBuyRepository.save(entity);
        }
    }
}
