import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Usuario, postInfo } from '../../interfaces/general.interface';
import { LocalService } from '../../services/local.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit{
  info: Usuario={
    token: '',
    email: '',
    nombre: '',
    apellidos: '',
    empresa: '',
    perfil: 0,
    perfil_text: ''
  };
  constructor(private config: DynamicDialogConfig,public local: LocalService){}

  ngOnInit(): void {
    this.info= this.config.data; 
  }

}
