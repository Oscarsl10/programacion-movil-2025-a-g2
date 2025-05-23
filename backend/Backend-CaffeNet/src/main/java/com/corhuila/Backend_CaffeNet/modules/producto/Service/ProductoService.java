package com.corhuila.Backend_CaffeNet.modules.producto.Service;

import com.corhuila.Backend_CaffeNet.common.base.ABaseService;
import com.corhuila.Backend_CaffeNet.modules.producto.Entity.Producto;
import com.corhuila.Backend_CaffeNet.modules.producto.IService.IProductoService;
import com.corhuila.Backend_CaffeNet.common.base.IBaseRepository;
import com.corhuila.Backend_CaffeNet.modules.producto.IRepository.IProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductoService extends ABaseService<Producto> implements IProductoService {

    @Autowired
    private IProductoRepository productoRepository;

    @Override
    protected IBaseRepository<Producto, Long> getRepository() {
        return productoRepository;
    }
}
