package com.corhuila.Backend_CaffeNet.modules.producto.IRepository;

import com.corhuila.Backend_CaffeNet.common.base.IBaseRepository;
import com.corhuila.Backend_CaffeNet.modules.producto.Entity.Producto;
import org.springframework.stereotype.Repository;

@Repository
public interface IProductoRepository extends IBaseRepository<Producto, Long> {
}
