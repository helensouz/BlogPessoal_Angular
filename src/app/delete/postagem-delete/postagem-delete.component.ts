import { environment } from './../../../environments/environment.prod';
import { TemaService } from './../../service/tema.service';
import { PostagemService } from './../../service/postagem.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Postagem } from './../../menu/model/Postagem';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-postagem-delete',
  templateUrl: './postagem-delete.component.html',
  styleUrls: ['./postagem-delete.component.scss']
})
export class PostagemDeleteComponent implements OnInit {

  postagem : Postagem = new Postagem()

  idPost: number

  constructor(
     private route : ActivatedRoute,
    private router: Router,
    private postagemService: PostagemService,
    ) { }

  ngOnInit() {

    window.scroll(0,0)
    if(environment.token == ''){
      this.router.navigate(['/entrar'])
    }

    this.idPost = this.route.snapshot.params['id']
    this.findByidPostagem( this.idPost)
  }

  findByidPostagem(id: number){
    this.postagemService.getByidPostagem(id).subscribe((resp : Postagem) => {
      this.postagem = resp
    })
  }

  apagar(){

    this.postagemService.deletePostagem(this.idPost).subscribe(() => {
      alert('Postagem apagada com sucesso')
      this.router.navigate(['/inicio'])
    })
  }
}
