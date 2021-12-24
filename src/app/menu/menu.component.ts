import { Router } from '@angular/router';
import { environment } from './../../environments/environment.prod';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  nome = environment.nome
  foto = environment.foto
  id = environment.id

  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  sair(){
    this.router.navigate(['/entrar'])
    environment.token = '' //ira zerar todas as informações
    environment.nome = ''
    environment.foto = ''
    environment.id = 0
  }

}
