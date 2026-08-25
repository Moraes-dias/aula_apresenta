import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Carro } from '../../../models/carro';

@Component({
  selector: 'app-carros-list',
  imports: [RouterLink],
  templateUrl: './carros-list.component.html',
  styleUrl: './carros-list.component.scss'
})
export class CarrosListComponent {

  lista: Carro[] = []

  constructor() {
    
    this.lista.push(new Carro(1, 'Ford', 'Fiesta'));
    this.lista.push(new Carro(2, 'Fiat', 'Uno'));
    this.lista.push(new Carro(3, 'Honda', 'Civic'));


    let carroNovo = history.state.carroNovo;

    let carroEditado = history.state.carroEditado;

    if(carroNovo) {
      carroNovo.id = 123;
      this.lista.push(carroNovo);
    }

    if(carroEditado) {
      console.log(carroEditado)
      for(let i = 0; i < this.lista.length; i++) {
        console.log(carroEditado.id, this.lista[i].id)
        if(carroEditado.id == this.lista[i].id) {
          console.log("achou")
          this.lista[i] = carroEditado
          break;
        }
      }
    }

  }

  deletar(carro: Carro) {
    
  }
}
