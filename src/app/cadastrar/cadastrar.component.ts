import { AuthService } from './../service/auth.service';
import { Usuario } from '../menu/model/Usuario';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.scss']
})
export class CadastrarComponent implements OnInit {

  //variaveis sao declaradas em cima dos construtores

  usuario: Usuario = new Usuario
  confirmarSenha: string
  tipoUsuario: string

  constructor(
    private authService: AuthService,
    private router: Router

    ) { }

  ngOnInit() {
    window.scroll(0,0) //y=0 , x= 0 | ao iniciar a pag, ficara no topo da pag
  }

  confirmSenha(event: any){
    this.confirmarSenha = event.target.value
  }

  tipoUser(event: any){
    this.tipoUsuario = event.target.value
  }

  cadastrar(){
    this.usuario.tipo = this.tipoUsuario

    //comparando as senhas, podem devem ser iguais
    if(this.usuario.senha != this.confirmarSenha){
      alert('As senhas estão incorretas')
    }
    else{ // oque o usuario digitar sera enviado para o servidor
      this.authService.cadastrar(this.usuario).subscribe((resp: Usuario) => { // ira transcrever ts para o json
          this.usuario = resp
          this.router.navigate(['/entrar'])
          alert('Usuario cadastrado com sucesso! ')
    })
  }
}
}
