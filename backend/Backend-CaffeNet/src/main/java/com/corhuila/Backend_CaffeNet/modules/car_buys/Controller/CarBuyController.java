package com.corhuila.Backend_CaffeNet.modules.car_buys.Controller;

import com.corhuila.Backend_CaffeNet.common.Dto.ApiResponseDto;
import com.corhuila.Backend_CaffeNet.common.base.ABaseController;
import com.corhuila.Backend_CaffeNet.modules.car_buys.Entity.CarBuy;
import com.corhuila.Backend_CaffeNet.modules.car_buys.IRepository.ICarBuyRepository;
import com.corhuila.Backend_CaffeNet.modules.car_buys.IService.ICarBuyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/carbuys")
@CrossOrigin(origins = "*")
public class CarBuyController extends ABaseController<CarBuy, ICarBuyService> {

    public  CarBuyController(ICarBuyService service) {
        super(service, "Continent");
    }

    @Autowired
    private ICarBuyRepository carBuyRepository;


    @DeleteMapping("/deleteAll")
    public ResponseEntity<ApiResponseDto<Void>> deleteAll() {
        try {
            service.deleteAll(); // Llamamos al método del servicio
            return ResponseEntity.ok(new ApiResponseDto<>("Todos los productos han sido eliminados", null, true));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new ApiResponseDto<>(e.getMessage(), null, false));
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ApiResponseDto<Void>> deleteById(@PathVariable Long id) {
        try {
            service.deleteById(id);
            return ResponseEntity.ok(new ApiResponseDto<>("Producto eliminado correctamente", null, true));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new ApiResponseDto<>(e.getMessage(), null, false));
        }
    }

}