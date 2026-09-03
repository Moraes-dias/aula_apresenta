import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { Carro } from '../../../models/carro';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { CarrosDetailsComponent } from '../carros-details/carros-details.component';
import Swal from 'sweetalert2';
import { CarroService } from '../../../services/carro.service';

@Component({
  selector: 'app-carros-list',
  imports: [MdbModalModule, CarrosDetailsComponent],
  templateUrl: './carros-list.component.html',
  styleUrl: './carros-list.component.scss'
})
export class CarrosListComponent {


  @ViewChild('modalCarroDetails') modalCarroDetails!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;
  lista: Carro[] = [];
  carroEdit: Carro = new Carro();

  carroService = inject(CarroService);

  constructor(private modalService: MdbModalService) {
  }

  ngOnInit() {
    this.findAll();
  }

  findAll() {
    this.carroService.listAll().subscribe({
      next: (listaRetornada) => {
        this.lista = listaRetornada;
      },
      error: (erro) => {
        console.log(erro);
        Swal.fire({
        icon: 'error',
        title: "Falha para carregar a lista",
        text: "Ocorreu uma falha não identificada" + erro,
      });
      }
    })
  }

  novoCarro() {
    this.carroEdit = new Carro();
    this.modalRef = this.modalService.open(this.modalCarroDetails);
  }

  editarCarro(carro:Carro){
    this.carroEdit = Object.assign({}, carro);
    this.modalRef = this.modalService.open(this.modalCarroDetails);
  }

  deletar(carro: Carro) {
    Swal.fire({
      title: "Voce tem certeza que deseja deletar?",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Deletar"
    }).then((result) => {
      if(result.isConfirmed) {
        this.carroService.delete(carro.id).subscribe({
          next: (retorno) => {
          Swal.fire({
            title: 'Deletado com sucesso!',
            icon: 'success',
            confirmButtonText: 'Ok'
          });
          this.findAll();
          },
          error: (erro) => {
            Swal.fire({
              icon: 'error',
              title: "Falha para carregar a lista",
              text: "Ocorreu uma falha não identificada" + erro,
            });
          }
        });
      }
    })

  }

  retornoDetalhe(carro: Carro) {
    const modeloValido = !!carro?.modelo && carro.modelo.trim().length > 0;
    const marcaValida = !!carro?.marca && !!carro.marca.id && !!carro.marca.nome && carro.marca.nome.trim().length > 0;

    if (!marcaValida || !modeloValido) {
      this.modalRef?.close();
      Swal.fire({
        icon: 'warning',
        title: 'Campos obrigatórios',
        text: 'Selecione uma marca e informe o modelo do carro antes de salvar.'
      });
      return;
    }

    this.modalRef.close();

    if(carro.id > 0){
      this.carroService.update(carro.id, carro).subscribe({
        next: (retorno) => {
          Swal.fire({
          title: 'Editado com sucesso!',
          icon: 'success',
          confirmButtonText: 'Ok'
      });
      this.findAll();
        },
        error: (erro) => {
          console.log(erro)
            Swal.fire({
              icon: 'error',
              title: "Falha para carregar a lista",
              text: "Ocorreu uma falha não identificada" + erro,
            });
        }
      });
    } else {
      this.carroService.create(carro).subscribe({
        next: (retorno) => {
          Swal.fire({
            title: 'Salvo com sucesso!',
            icon: 'success',
            confirmButtonText: 'Ok'
          });
          this.findAll();
        },
        error: (erro) => {
          console.log(erro)
            Swal.fire({
              icon: 'error',
              title: "Falha para salvar um veiculoe",
              text: "Ocorreu uma falha não identificada" + erro,
            });
        },
      });

    }
  }
}
