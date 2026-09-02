package com.aula.exemplo.demo.config;

import com.aula.exemplo.demo.model.Carro;
import com.aula.exemplo.demo.model.Marca;
import com.aula.exemplo.demo.repository.CarroRepository;
import com.aula.exemplo.demo.repository.MarcaRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class DatabaseSeeder {

    @Bean
    public CommandLineRunner popularCarros(MarcaRepository marcaRepository, CarroRepository carroRepository) {
        return args -> {
            if (carroRepository.count() > 0) {
                return;
            }

            Marca volkswagen = marcaRepository.save(new Marca(null, "Volkswagen"));
            Marca chevrolet = marcaRepository.save(new Marca(null, "Chevrolet"));
            Marca toyota = marcaRepository.save(new Marca(null, "Toyota"));
            Marca honda = marcaRepository.save(new Marca(null, "Honda"));
            Marca fiat = marcaRepository.save(new Marca(null, "Fiat"));

            carroRepository.saveAll(List.of(
                    new Carro(null, "Gol", volkswagen),
                    new Carro(null, "Onix", chevrolet),
                    new Carro(null, "Corolla", toyota),
                    new Carro(null, "Civic", honda),
                    new Carro(null, "Argo", fiat)
            ));

            System.out.println(">>> Banco populado com " + marcaRepository.count() + " marcas e "
                    + carroRepository.count() + " carros.");
        };
    }

}
