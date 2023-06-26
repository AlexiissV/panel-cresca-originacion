import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Solicitud } from 'src/app/interfaces/general.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contrato',
  templateUrl: './contrato.component.html',
  styleUrls: ['./contrato.component.scss']
})
export class ContratoComponent implements OnInit {
  solicitudes: Solicitud[] = [];
  selectedProduct: Solicitud = {
    id: 0,
    empresa_id: 0,
    empresa: '',
    producto_id: 0,
    producto: '',
    producto_financiero: '',
    cantidad: 0,
    cotizacion: 0,
    inversion_total: 0,
    descuento_valor: 0,
    importe_final: 0,
    aportacion_producto_valor: 0,
    importe_financiamiento_valor: 0,
    status: 0,
    status_text: '',
    registro: '',
    modificado: '',
    operador_id: 0,
    operador: ''
  };

  constructor(private post: PostService, private router: Router){

  }
  ngOnInit(): void {
    this.post.getsolicitudescontrato()
    .subscribe({
      next:(resp)=>{
        this.solicitudes = resp.solicitudes;
        
      },
      error:()=>{

      }
    });
  }

  async onRowSelect(event: any) {
    localStorage.setItem('info', JSON.stringify(this.selectedProduct));
    this.router.navigate(['/promotor/detail-contrato']);
  }

}
