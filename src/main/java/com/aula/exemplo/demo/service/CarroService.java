package com.aula.exemplo.demo.service;

import com.aula.exemplo.demo.model.Carro;
import com.aula.exemplo.demo.model.Marca;
import com.aula.exemplo.demo.repository.CarroRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CarroService {

    private final CarroRepository carroRepository;
    private final MarcaService marcaService;

    public CarroService(CarroRepository carroRepository, MarcaService marcaService) {
        this.carroRepository = carroRepository;
        this.marcaService = marcaService;
    }


    public List<Carro> findAll() {
        return carroRepository.findAll();
    }


    public Carro findById(Long id) {
        return carroRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Carro não encontrado com o id: " + id));
    }


    public Carro save(Carro carro) {
        carro.setMarca(buscarMarca(carro.getMarca()));
        return carroRepository.save(carro);
    }


    public Carro update(Long id, Carro carro) {
        Carro carroExistente = findById(id);
        carroExistente.setModelo(carro.getModelo());
        carroExistente.setMarca(buscarMarca(carro.getMarca()));
        return carroRepository.save(carroExistente);
    }


    public void delete(Long id) {
        Carro carro = findById(id);
        carroRepository.delete(carro);
    }


    // O carro chega com a marca apenas pelo id ({"marca": {"id": 1}}),
    // então buscamos a marca completa antes de salvar.
    private Marca buscarMarca(Marca marca) {
        if (marca == null || marca.getId() == null) {
            throw new EntityNotFoundException("Informe o id da marca do carro.");
        }
        return marcaService.findById(marca.getId());
    }

}
