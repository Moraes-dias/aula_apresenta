package com.aula.exemplo.demo.config;

import com.aula.exemplo.demo.model.Carro;
import com.aula.exemplo.demo.repository.CarroRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class DatabaseSeeder {

    @Bean
    public CommandLineRunner popularCarros(CarroRepository carroRepository) {
        return args -> {
            if (carroRepository.count() > 0) {
                return;
            }

            carroRepository.saveAll(List.of(
                    new Carro(null, "Gol", "Volkswagen"),
                    new Carro(null, "Onix", "Chevrolet"),
                    new Carro(null, "Corolla", "Toyota"),
                    new Carro(null, "Civic", "Honda"),
                    new Carro(null, "Argo", "Fiat")
            ));

            System.out.println(">>> Banco populado com " + carroRepository.count() + " carros.");
        };
    }

}
