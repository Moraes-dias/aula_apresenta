package com.aula.exemplo.demo.controller;

import com.aula.exemplo.demo.model.Carro;
import com.aula.exemplo.demo.service.CarroService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/carros")
@CrossOrigin("*")
public class CarroController {

    private final CarroService carroService;

    public CarroController(CarroService carroService) {
        this.carroService = carroService;
    }


    @GetMapping
    public ResponseEntity<List<Carro>> findAll() {
        return ResponseEntity.ok(carroService.findAll());
    }


    @GetMapping("/{id}")
    public ResponseEntity<Carro> findById(@PathVariable Long id) {
        return ResponseEntity.ok(carroService.findById(id));
    }


    @PostMapping
    public ResponseEntity<Carro> save(@RequestBody Carro carro) {
        return ResponseEntity.status(HttpStatus.CREATED).body(carroService.save(carro));
    }


    @PutMapping("/{id}")
    public ResponseEntity<Carro> update(@PathVariable Long id, @RequestBody Carro carro) {
        return ResponseEntity.ok(carroService.update(id, carro));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        carroService.delete(id);
        return ResponseEntity.noContent().build();
    }


    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<String> handleNotFound(EntityNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }

}
