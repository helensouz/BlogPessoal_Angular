import { Tema } from './../menu/model/Tema';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TemaService {
  constructor(private http: HttpClient) {}

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token),
  };

  getAllTema(): Observable<Tema[]> {
    return this.http.get<Tema[]>(
      'https://blogpessoalhelen.herokuapp.com/tema',
      this.token
    );
  }

  getByIdTema(id: number): Observable<Tema> {
    return this.http.get<Tema>(
      `https://blogpessoalhelen.herokuapp.com/tema/${id}`,
      this.token
    );
  }

  deleteTema(id: number) {
    return this.http.delete(
      `https://blogpessoalhelen.herokuapp.com/tema/${id}`,
      this.token
    );
  }

  postTema(tema: Tema): Observable<Tema> {
    return this.http.post<Tema>(
      'https://blogpessoalhelen.herokuapp.com/tema',
      tema,
      this.token
    );
  }

  putTema(tema: Tema): Observable<Tema> {
    return this.http.put<Tema>(
      'https://blogpessoalhelen.herokuapp.com/tema',
      tema,
      this.token
    );
  }

  getByNomeTema(nome: string): Observable<Tema[]> {
    return this.http.get<Tema[]>(
      `https://blogpessoalhelen.herokuapp.com/tema/nome/${nome}`,
      this.token
    );
  }
}
