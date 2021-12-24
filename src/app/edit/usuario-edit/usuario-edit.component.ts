import { environment } from './../../../environments/environment.prod';
import { Route } from '@angular/compiler/src/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './../../service/auth.service';
import { Usuario } from './../../menu/model/Usuario';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['./usuario-edit.component.scss']
})
export class UsuarioEditComponent implements OnInit {


  usuario: Usuario = new Usuario()
  idUsuario: number
  confirmarSenha: string
  tipoUser: string


  constructor(
    private authService: AuthService,
    private router: Router,
    private route : ActivatedRoute,
  ) { }

  ngOnInit( ) {

    window.scroll(0,0)

    if (environment.token == '') {
      this.router.navigate(['/entrar']);
    }

    this.idUsuario = this.route.snapshot.params['id']
    this.findByidUsuario(this.idUsuario)


  }


  confirmSenha(event: any){
    this.confirmarSenha = event.target.value

  }

  tipoUsuario(event: any){
    this.tipoUser = event.target.value

  }

  atualizar(){
    this.usuario.tipo = this.tipoUser

    //comparando as senhas, podem devem ser iguais
    if(this.usuario.senha != this.confirmarSenha){
      alert('As senhas estão incorretas!')
    } else{ // oque o usuario digitar sera enviado para o servidor
      this.authService.cadastrar(this.usuario).subscribe((resp: Usuario) => { // ira transcrever ts para o json
          this.usuario = resp
          this.router.navigate(['/inicio'])
          alert('Usuario atualizado com sucesso!, por favor faça o login novamente ')
          environment.token=''
          environment.nome=''
          environment.foto =''
          environment.id = 0
          this.router.navigate(['/entrar'])

    })
  }

  }

  findByidUsuario(id: number){
    this.authService.getByidUsuario(id).subscribe((resp: Usuario) => {
      this.usuario = resp
    })
  }
}
