package com.aula.exemplo.demo.service;

import com.aula.exemplo.demo.model.Carro;
import com.aula.exemplo.demo.repository.CarroRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CarroService {

    private final CarroRepository carroRepository;

    public CarroService(CarroRepository carroRepository) {
        this.carroRepository = carroRepository;
    }


    public List<Carro> findAll() {
        return carroRepository.findAll();
    }


    public Carro findById(Long id) {
        return carroRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Carro não encontrado com o id: " + id));
    }


    public Carro save(Carro carro) {
        return carroRepository.save(carro);
    }


    public Carro update(Long id, Carro carro) {
        Carro carroExistente = findById(id);
        carroExistente.setModelo(carro.getModelo());
        carroExistente.setMarca(carro.getMarca());
        return carroRepository.save(carroExistente);
    }


    public void delete(Long id) {
        Carro carro = findById(id);
        carroRepository.delete(carro);
    }

}
