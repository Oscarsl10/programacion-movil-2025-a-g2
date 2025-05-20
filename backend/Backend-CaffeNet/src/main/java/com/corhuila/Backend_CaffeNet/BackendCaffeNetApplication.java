package com.corhuila.Backend_CaffeNet;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.servers.Server;

@OpenAPIDefinition(
	info = @Info(title = "BackendPM API", version = "v1"),
	servers = {
		@Server(url = "https://7s68n3g8-9000.use2.devtunnels.ms")
	}
)

@SpringBootApplication
public class BackendCaffeNetApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendCaffeNetApplication.class, args);
	}

}
