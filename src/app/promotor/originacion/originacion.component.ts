import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-originacion',
  templateUrl: './originacion.component.html',
  styleUrls: ['./originacion.component.scss']
})
export class OriginacionComponent implements OnInit {
  items: MenuItem[] = [];
  activeIndex: number = 0;
  
  ngOnInit(): void {
    this.items = [{
      label: 'Generales',
      routerLink: 'informacion'
    },
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
    {
      label: 'Capacidad',
      routerLink: 'capacidad'
    },
    {
      label: 'Documentación',
      routerLink: 'documentacion'
    }
    ];
  }
}
