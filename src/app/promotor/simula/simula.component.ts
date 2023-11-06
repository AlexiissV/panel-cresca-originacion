import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuItem, MessageService } from 'primeng/api';
import { SolicitudService } from '../../services/solicitud.service';
import { Producto } from '../../interfaces/general.interface';

@Component({
  selector: 'app-simula',
  templateUrl: './simula.component.html',
  styleUrls: ['./simula.component.scss'],
  providers: [MessageService]
})
export class SimulaComponent implements OnInit {
  itemsmenu: MenuItem[] = [];

  constructor(){
  }
  ngOnInit(): void {
      this.itemsmenu = [
      {
        label: 'Presupuesto',
        routerLink: 'presupuesto'
      },
      {
        label: 'Terminos del Credito',
        routerLink: 'terminos'
      },
      {
        label: 'Simulador',
        routerLink: 'simulador'
      },
      ];
  }
}