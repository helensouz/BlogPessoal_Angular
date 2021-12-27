import { Postagem } from './../menu/model/Postagem';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PostagemService {
  constructor(private http: HttpClient) {}

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token),
  };

  getAllPostagem(): Observable<Postagem[]> {
    return this.http.get<Postagem[]>(
      'https://blogpessoalhelen.herokuapp.com/postagem',
      this.token
    );
  }

  getByidPostagem(id: number): Observable<Postagem> {
    return this.http.get<Postagem>(
      `https://blogpessoalhelen.herokuapp.com/postagem/${id}`,
      this.token
    );
  }

  postPostagem(postagem: Postagem): Observable<Postagem> {
    return this.http.post<Postagem>(
      'https://blogpessoalhelen.herokuapp.com/postagem',
      postagem,
      this.token
    );
  }

  putPostagem(postagem: Postagem): Observable<Postagem> {
    return this.http.put<Postagem>(
      'https://blogpessoalhelen.herokuapp.com/postagem',
      postagem,
      this.token
    );
  }

  deletePostagem(id: number) {
    return this.http.delete(
      `https://blogpessoalhelen.herokuapp.com/postagem/${id}`,
      this.token
    );
  }

  getByTituloPostagem(titulo: string): Observable<Postagem[]> {
    return this.http.get<Postagem[]>(
      `https://blogpessoalhelen.herokuapp.com/postagem/titulo/${titulo}`,
      this.token
    );
  }
}
