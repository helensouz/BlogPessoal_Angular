import { TemaService } from './../../service/tema.service';
import { Tema } from 'src/app/menu/model/Tema';
import { environment } from './../../../environments/environment.prod';
import { PostagemService } from './../../service/postagem.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Postagem } from './../../menu/model/Postagem';
import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-postagem-edit',
  templateUrl: './postagem-edit.component.html',
  styleUrls: ['./postagem-edit.component.scss']
})
export class PostagemEditComponent implements OnInit {


  postagem : Postagem = new Postagem()
  tema: Tema = new Tema()
  listaTemas: Tema[]
  idTema: number


  constructor(
    private route : ActivatedRoute,
    private router: Router,
    private postagemService: PostagemService,
    private temaService: TemaService
  ) { }

  ngOnInit() {
    window.scroll(0,0)
    if(environment.token == ''){
      this.router.navigate(['/entrar'])
    }

    let id = this.route.snapshot.params['id']
    this.findByidPostagem(id)
    this.findAllTemas()
  }

  findByidPostagem(id: number){
    this.postagemService.getByidPostagem(id).subscribe((resp : Postagem) => {
      this.postagem = resp
    })
  }

  findByIdTema(){
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema) =>{
      this.tema = resp
    })
  }

  findAllTemas(){
    this.temaService.getAllTema().subscribe((resp: Tema[]) => {
      this.listaTemas = resp
    })
  }


  atualizar(){
    this.tema.id = this.idTema
    this.postagem.tema = this.tema

    this.postagemService.putPostagem(this.postagem).subscribe((resp : Postagem) => {
      this.postagem = resp
      alert('postagem atualizada com sucesso ! ')
      this.router.navigate(['/inicio'])
    })
  }

}
