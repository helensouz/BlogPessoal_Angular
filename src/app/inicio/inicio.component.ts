import { AlertasService } from './../service/alertas.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AuthService } from './../service/auth.service';
import { Usuario } from './../menu/model/Usuario';
import { Tema } from './../menu/model/Tema';
import { TemaService } from './../service/tema.service';
import { PostagemService } from './../service/postagem.service';
import { Postagem } from './../menu/model/Postagem';
import { Router } from '@angular/router';
import { environment } from './../../environments/environment.prod';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent implements OnInit {
  postagem: Postagem = new Postagem();


  

  listaTemas: Tema[];
  listaPostagens: Postagem[];
  idTema: number;
  tema: Tema = new Tema();
  usuario: Usuario = new Usuario();
  idUsuario = environment.id
  nomeTema: string
  tituloPost: string



  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private temaService: TemaService,
    private authService: AuthService,
    private alertas: AlertasService
  ) {}

  ngOnInit() {
    window.scroll(0,0)
    if (environment.token == '') {
      this.router.navigate(['/entrar']);
    }

    this.getAllTemas();
    this.getAllPostagem();

  }

  findByIdTema() {
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema) => {
      this.tema = resp;
    });
  }

  findByidUsuario(){
    this.authService.getByidUsuario(this.idUsuario).subscribe((resp: Usuario)=> {
      this.usuario = resp
    })
  }

  getAllPostagem(){
    this.postagemService.getAllPostagem().subscribe((resp: Postagem[]) => {
      this.listaPostagens = resp
    })
  }

  getAllTemas() {
    this.temaService.getAllTema().subscribe((resp: Tema[]) => {
      this.listaTemas = resp;
    });
  }

  publicar() {
    this.tema.id = this.idTema;
    this.postagem.tema = this.tema

    this.usuario.id = this.idUsuario
    this.postagem.usuario = this.usuario //passa o usuario

    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem)=>{
      this.postagem = resp
      this.alertas.showAlertSuccess('Sua postagem foi realizada com sucesso! ')
      this.postagem = new Postagem()
      this.getAllPostagem()
    })

  }

  findByTituloPostagem(){
    if(this.tituloPost == ''){
      this.getAllPostagem()
    } else {
      this.postagemService.getByTituloPostagem(this.tituloPost).subscribe((resp: Postagem[])=>{
        this.listaPostagens = resp
      })
    }
  }

  findByNomeTema(){
    if(this.nomeTema == ''){
      this.getAllTemas()
    } else {
      this.temaService.getByNomeTema(this.nomeTema).subscribe((resp: Tema[])=>{
        this.listaTemas = resp
      })
    }
  }

}
