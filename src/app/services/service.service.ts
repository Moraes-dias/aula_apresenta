import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Marca } from '../models/Marca';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  API = 'http://localhost:8080/marcas';

  http = inject(HttpClient);

  listAll(): Observable<Marca[]> {
    return this.http.get<Marca[]>(`${this.API}`);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.API}/${id}`);
  }

  findById(id: number): Observable<Marca> {
    return this.http.get<Marca>(`${this.API}/${id}`);
  }

  update(id: number, marca: Marca): Observable<Marca> {
    return this.http.put<Marca>(`${this.API}/${id}`, marca);
  }

  create(marca: Marca): Observable<Marca> {
    return this.http.post<Marca>(`${this.API}`, marca);
  }

}
