import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Carro } from '../models/carro';

@Injectable({
  providedIn: 'root'
})
export class CarroService {

  API = 'http://localhost:8080/carros';

  http = inject(HttpClient);

  listAll(): Observable<Carro[]> {
    return this.http.get<Carro[]>(`${this.API}`);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.API}/${id}`)
  }

  findById(id: number):Observable<Carro>  {
    return this.http.get<Carro>(`${this.API}/${id}`);
  }

  update(id: number, carro: Carro): Observable<Carro> {
     return this.http.put<Carro>(`${this.API}/${id}`, carro);
  }

  create(carro: Carro): Observable<Carro> {
    return this.http.post<Carro>(`${this.API}`, carro);
  }
  
}
