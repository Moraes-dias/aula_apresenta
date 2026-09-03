import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import Swal from 'sweetalert2';
import { Marca } from '../../../models/Marca';
import { MarcaService } from '../../../services/service.service';
import { MarcasDetailsComponent } from '../marcas-details/marcas-details.component';

@Component({
  selector: 'app-marcas-list',
  imports: [MdbModalModule, MarcasDetailsComponent],
  templateUrl: './marcas-list.component.html',
  styleUrl: './marcas-list.component.scss'
})
export class MarcasListComponent {

  @ViewChild('modalMarcaDetails') modalMarcaDetails!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;
  lista: Marca[] = [];
  marcaEdit: Marca = new Marca();

  marcaService = inject(MarcaService);

  constructor(private modalService: MdbModalService) {}

  ngOnInit() {
    this.findAll();
  }

  findAll() {
    this.marcaService.listAll().subscribe({
      next: (listaRetornada: Marca[]) => {
        this.lista = listaRetornada;
      },
      error: (erro: any) => {
        console.log(erro);
        Swal.fire({
          icon: 'error',
          title: 'Falha para carregar a lista',
          text: 'Ocorreu uma falha não identificada ' + erro,
        });
      }
    });
  }

  novaMarca() {
    this.marcaEdit = new Marca();
    this.modalRef = this.modalService.open(this.modalMarcaDetails);
  }

  editarMarca(marca: Marca) {
    this.marcaEdit = Object.assign({}, marca);
    this.modalRef = this.modalService.open(this.modalMarcaDetails);
  }

  deletar(marca: Marca) {
    Swal.fire({
      title: 'Você tem certeza que deseja deletar?',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Deletar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.marcaService.delete(marca.id).subscribe({
          next: () => {
            Swal.fire({
              title: 'Deletado com sucesso!',
              icon: 'success',
              confirmButtonText: 'Ok'
            });
            this.findAll();
          },
          error: (erro: any) => {
            Swal.fire({
              icon: 'error',
              title: 'Falha para carregar a lista',
              text: 'Ocorreu uma falha não identificada ' + erro,
            });
          }
        });
      }
    });
  }

  retornoDetalhe(marca: Marca) {
    this.modalRef.close();

    if (marca.id > 0) {
      this.marcaService.update(marca.id, marca).subscribe({
        next: () => {
          Swal.fire({
            title: 'Editado com sucesso!',
            icon: 'success',
            confirmButtonText: 'Ok'
          });
          this.findAll();
        },
        error: (erro: any) => {
          console.log(erro);
          Swal.fire({
            icon: 'error',
            title: 'Falha para carregar a lista',
            text: 'Ocorreu uma falha não identificada ' + erro,
          });
        }
      });
    } else {
      this.marcaService.create(marca).subscribe({
        next: () => {
          Swal.fire({
            title: 'Salvo com sucesso!',
            icon: 'success',
            confirmButtonText: 'Ok'
          });
          this.findAll();
        },
        error: (erro: any) => {
          console.log(erro);
          Swal.fire({
            icon: 'error',
            title: 'Falha para salvar a marca',
            text: 'Ocorreu uma falha não identificada ' + erro,
          });
        }
      });
    }
  }
}
