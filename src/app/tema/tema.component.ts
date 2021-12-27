import { AlertasService } from 'src/app/service/alertas.service';
import { TemaService } from './../service/tema.service';
import { Tema } from './../menu/model/Tema';
import { environment } from './../../environments/environment.prod';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.scss']
})
export class TemaComponent implements OnInit {

  tema: Tema = new Tema()
  listaTemas: Tema[]


  constructor(
    private router: Router,
    private temaService: TemaService,
    private alertas: AlertasService
     ) { }


     cadastrar(){
       this.temaService.postTema(this.tema).subscribe((resp: Tema) =>{
        this.tema = resp
        this.alertas.showAlertSuccess('Tema cadastrado com sucesso! Tudo certo!')
        this.findAllTemas()
        this.tema = new Tema()

       })
     }

  ngOnInit() {
    if(environment.token == ''){
      this.router.navigate(['/entrar'])
    }

    this.findAllTemas() //sempre que iniciar a pagina ira mostrar TODOS OS TEMAS

  }

  findAllTemas(){
    this.temaService.getAllTema().subscribe((resp: Tema[]) =>{
      this.listaTemas = resp
    })
  }

}
