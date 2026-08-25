import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Carro } from '../../../models/carro';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-carros-details',
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './carros-details.component.html',
  styleUrl: './carros-details.component.scss'
})
export class CarrosDetailsComponent {
  
  carro = new Carro(0, '', '');

  router = inject(ActivatedRoute);
  router2 = inject(Router);

  constructor() {
    let id = this.router.snapshot.params['id'];
    if (id > 0) {
      this.findById(id);
    }
  }

  findById(id: number){
    let carroRetornado: Carro = new Carro(id, 'Honda', 'Civic');
    this.carro = carroRetornado;
  }

  salvar(){
    if(this.carro.id > 0){
      Swal.fire({
        title: 'Editado com sucesso!',
        icon: 'success',
        confirmButtonText: 'Ok'
      });
      this.router2.navigate(['/admin/carros'],{ state: {carroEditado: this.carro}})
    } else {
      Swal.fire({
        title: 'Salvo com sucesso!',
        icon: 'success',
        confirmButtonText: 'Ok'
      });
      this.router2.navigate(['/admin/carros'],{ state: {carroNovo: this.carro}})
    }

  }
}
