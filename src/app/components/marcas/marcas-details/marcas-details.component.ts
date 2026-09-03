import { Marca } from './../../../models/Marca';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-marca-details',
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './marcas-details.component.html',
  styleUrl: './marcas-details.component.scss'
})
export class MarcasDetailsComponent {

  @Input() marca: Marca = new Marca();

  @Output() retorno = new EventEmitter<Marca>();

  salvar() {
    const nome = this.marca?.nome?.trim();

    if (!nome) {
      Swal.fire({
        icon: 'warning',
        title: 'Campo obrigatório',
        text: 'Informe o nome da marca antes de salvar.'
      });
      return;
    }

    this.marca.nome = nome;
    this.retorno.emit(this.marca);
  }

}
