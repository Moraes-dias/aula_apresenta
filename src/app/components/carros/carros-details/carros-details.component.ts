import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import Swal from 'sweetalert2';
import { Carro } from '../../../models/carro';
import { Marca } from '../../../models/Marca';
import { MarcaService } from '../../../services/service.service';

@Component({
  selector: 'app-carros-details',
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './carros-details.component.html',
  styleUrl: './carros-details.component.scss'
})
export class CarrosDetailsComponent {

  @Input() carro: Carro = new Carro();

  @Output() retorno = new EventEmitter<Carro>();

  marcas: Marca[] = [];
  marcaService = inject(MarcaService);

  ngOnInit() {
    this.loadMarcas();
  }

  loadMarcas() {
    this.marcaService.listAll().subscribe({
      next: (lista) => {
        this.marcas = lista;

        if (!this.carro.marca || !this.carro.marca.id) {
          const marcaSelecionada = this.marcas.find((m) => m.id === this.carro.marca?.id);
          this.carro.marca = marcaSelecionada ?? new Marca();
        }
      },
      error: (erro) => {
        console.log(erro);
      }
    });
  }

  compareMarca = (m1: Marca, m2: Marca) => m1 && m2 ? m1.id === m2.id : m1 === m2;

  salvar() {
    const modelo = this.carro?.modelo?.trim();
    const marcaValida = this.carro?.marca && this.carro.marca.id && this.carro.marca.nome?.trim();

    if (!marcaValida || !modelo) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos obrigatórios',
        text: 'Selecione uma marca e informe o modelo do carro antes de salvar.'
      });
      return;
    }

    this.carro.modelo = modelo;
    this.retorno.emit(this.carro);
  }

}
