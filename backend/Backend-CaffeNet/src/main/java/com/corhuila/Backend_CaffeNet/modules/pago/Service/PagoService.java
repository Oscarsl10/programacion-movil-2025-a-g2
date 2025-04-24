package com.corhuila.Backend_CaffeNet.modules.pago.Service;

import com.corhuila.Backend_CaffeNet.common.base.ABaseService;
import com.corhuila.Backend_CaffeNet.modules.pago.Entity.Pago;
import com.corhuila.Backend_CaffeNet.modules.pago.IService.IPagoService;
import com.corhuila.Backend_CaffeNet.common.base.IBaseRepository;
import com.corhuila.Backend_CaffeNet.modules.pago.IRepository.IPagoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PagoService extends ABaseService<Pago> implements IPagoService {

    @Override
    protected IBaseRepository<Pago, Long> getRepository() {
        return pagoRepository;
    }

    @Autowired
    private IPagoRepository pagoRepository;
}
