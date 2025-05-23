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
                if (carBuy.getEstado() == EstadoCarrito.SOLICITADO) {
                    carBuy.setEstado(EstadoCarrito.SOLICITADO);
                    carBuyRepository.save(carBuy);
                }
            }
        } catch (Exception e) {
            throw new RuntimeException("Error al limpiar el carrito: " + e.getMessage());
        }
    }

    public void deleteById(Long id) {
        CarBuy carBuy = carBuyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto con ID " + id + " no encontrado."));
        carBuy.setEstado(EstadoCarrito.RETIRADO); // Cambia a RETIRADO
        carBuyRepository.save(carBuy);
    }

    @Override
    @Transactional
    public CarBuy save(CarBuy entity) throws Exception {
        Producto producto = productoRepository
                .findById(entity.getProducto().getId())
                .orElseThrow(() -> new Exception("Producto no encontrado"));

        // Busca si ya hay un CarBuy PENDIENTE para este producto y usuario
        CarBuy existente = carBuyRepository
                .findByUserEmailAndProductoIdAndEstado(
                        entity.getUser().getEmail(),
                        entity.getProducto().getId(),
                        EstadoCarrito.PENDIENTE)
                .stream()
                .findFirst()
                .orElse(null);

        // Si existe uno PENDIENTE, suma la cantidad
        if (existente != null) {
            int nuevaCantidad = existente.getCantidad() + entity.getCantidad();
            if (producto.getStock() < nuevaCantidad) {
                throw new Exception("Stock insuficiente. Disponible: " + producto.getStock());
            }
            existente.setCantidad(nuevaCantidad);
            existente.setTotal(producto.getPrecio() * nuevaCantidad);
            existente.setEstado(EstadoCarrito.PENDIENTE); // Refuerza el estado
            return carBuyRepository.save(existente);
        } else {
            // Si no existe PENDIENTE, crea uno nuevo
            if (producto.getStock() < entity.getCantidad()) {
                throw new Exception("Stock insuficiente. Disponible: " + producto.getStock());
            }
            entity.setId(null); // <-- IMPORTANTE: fuerza a crear uno nuevo
            entity.setTotal(producto.getPrecio() * entity.getCantidad());
            entity.setEstado(EstadoCarrito.PENDIENTE); // Siempre PENDIENTE
            return carBuyRepository.save(entity);
        }
    }
}
