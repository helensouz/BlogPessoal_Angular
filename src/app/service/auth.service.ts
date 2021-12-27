import { environment } from './../../environments/environment.prod';
import { UsuarioLogin } from './../menu/model/UsuarioLogin';

import { Usuario } from '../menu/model/Usuario';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  entrar(usuarioLogin: UsuarioLogin): Observable<UsuarioLogin> {
    return this.http.post<UsuarioLogin>(
      'https://blogpessoalhelen.herokuapp.com/usuarios/logar',
      usuarioLogin
    );
  }

  cadastrar(usuario: Usuario): Observable<Usuario> {
    //angular ira observar o usuarioLogin, qual obj enviado
    return this.http.post<Usuario>(
      'https://blogpessoalhelen.herokuapp.com/usuarios/cadastrar',
      usuario
    );
  }

  getByidUsuario(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(
      `https://blogpessoalhelen.herokuapp.com/usuarios/${id}`
    );
  }

  logado() {
    //verifica se há um token preenchido no enviroments

    let ok: boolean = false;

    if (environment.token != '') {
      //se nao estiver vazio, retorna ok
      ok = true;
    }

    return ok;
  }
}
