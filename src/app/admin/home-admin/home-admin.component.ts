import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Solicitud } from 'src/app/interfaces/general.interface';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.scss']
})
export class HomeAdminComponent {
  solicitudes:Solicitud[]=[];
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
    operador: '',
    solicitante: ''
  };
  
  
  constructor(private post: PostService,private router: Router){}

  ngOnInit(): void {
    this.post.getSolicitudes().subscribe({
      next:(resp)=>{        
        this.solicitudes= resp.solicitudes;
      },
      error:(e)=>{

      }
    });
  }

  async onRowSelect(event: any) {
    this.router.navigate(['/admin/solicitud',event.data['id']])
    
  }


}
