import { Marca } from './Marca';

export class Carro {

  id!: number;
  marca: Marca = new Marca();
  modelo!: string;

}
