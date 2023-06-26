import { Component, OnInit } from '@angular/core';
import { LocalService } from '../../services/local.service';
import { TablaAmortizacion } from 'src/app/interfaces/productof.interface';

@Component({
  selector: 'app-simulador',
  templateUrl: './simulador.component.html',
  styleUrls: ['./simulador.component.scss']
})
export class SimuladorComponent implements OnInit {
  tabla:TablaAmortizacion[]=[];
  estatus_solicitud:number = 0;

  constructor(private local: LocalService){
  }
  ngOnInit(): void {
    this.tabla= this.local.tabla_amortizacion;
    this.estatus_solicitud=this.local.estatus_solicitud;
  }

}
