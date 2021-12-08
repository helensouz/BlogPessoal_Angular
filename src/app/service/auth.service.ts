import { UsuarioLogin } from './../menu/model/usuarioLogin';
import { Usuario } from '../menu/model/Usuario';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  entrar(usuarioLogin: UsuarioLogin): Observable<UsuarioLogin>{
    return this.http.post<UsuarioLogin>('http://localhost:8080/usuarios/logar', usuarioLogin)
  }


  cadastrar(usuario: Usuario): Observable<Usuario>{ //angular ira observar o usuarioLogin, qual obj enviado
    return this.http.post<Usuario>('http://localhost:8080/usuarios/cadastrar', usuario)
  }
}
