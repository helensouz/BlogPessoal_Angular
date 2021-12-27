import { AlertasService } from 'src/app/service/alertas.service';
import { AlertasComponent } from './../../alertas/alertas.component';
import { environment } from './../../../environments/environment.prod';
import { ActivatedRoute, Router } from '@angular/router';
import { TemaService } from './../../service/tema.service';
import { Component, OnInit } from '@angular/core';
import { Tema } from 'src/app/menu/model/Tema';

@Component({
  selector: 'app-tema-edit',
  templateUrl: './tema-edit.component.html',
  styleUrls: ['./tema-edit.component.scss']
})
export class TemaEditComponent implements OnInit {

  tema: Tema = new Tema()

  constructor(
    private temaService : TemaService,
    private router : Router,
    private route : ActivatedRoute,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
    if(environment.token == ''){
      this.router.navigate(['/entrar'])
    }

    let id = this.route.snapshot.params['id']
    this.findByIdTema(id)
  }


  findByIdTema(id: number){ //iremos pegar o id que esta na rota(uri) ativa
    this.temaService.getByIdTema(id).subscribe((resp: Tema) => {
      this.tema = resp
    })
  }

  atualizar(){
    this.temaService.putTema(this.tema).subscribe((resp: Tema)=>{
      this.tema=resp
      this.alertas.showAlertSuccess('Tema atualizado com sucesso!')
      this.router.navigate(['/tema'])
    })
  }
}
