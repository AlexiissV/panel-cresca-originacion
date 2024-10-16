import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalService } from '../../services/local.service';
import { MessageService } from 'primeng/api';
import { Group } from '../../interfaces/general.interface';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { InputSwitchOnChangeEvent } from 'primeng/inputswitch';
import { ProductoFinanciero } from 'src/app/interfaces/productof.interface';
import { SolicitudService } from '../../services/solicitud.service';
import { SimularService } from '../../services/simular.service';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-termi',
  templateUrl: './termi.component.html',
  styleUrls: ['./termi.component.scss'],
  providers: [MessageService]
})
export class TermiComponent {

  salir: boolean = false;
  estatus_solicitud: number = 0;
  apply_periodo: number = 20;
  //@ts-ignore
  value_pago: number =null;
  //@ts-ignore
  mesnum: number =null;
  terminosForm: FormGroup;
  p_financiero: ProductoFinanciero[] = [];
  capacidad_id: number = 0;
  list_plazos: number[] = [];
  list_Meses: string[] = [
    '',
    'Mensual',
    'Semestral',
    'Anual',
  ];
  meses_gracia: string[] = [
    '', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'
  ];
  tipo_pagolts: string[] = [
    '',
    'Mensual',
    'Al vencimiento'
  ]

  importe_credito: AbstractControl;
  plazo_credito: AbstractControl;
  taza_fija_anual: AbstractControl;
  productof: AbstractControl;
  fecha_estimada_otorgamiento: AbstractControl;
  forma_pago_capital: AbstractControl;
  forma_pago_interes: AbstractControl;
  T_precioventa: number = 0;

  constructor(private formBuilder: FormBuilder,
    private soli: SolicitudService,
    private post: PostService,
    private auth: AuthService,
    private simula: SimularService,
    private router: Router,
    private local: LocalService,
    private messageService: MessageService) {
    this.terminosForm = this.formBuilder.group({
      importe_credito: [
        null, [
          Validators.required
        ]
      ],
      plazo_credito: [
        null, [
          Validators.required
        ]
      ],
      taza_fija_anual: [
        {value:null, disabled: true}, [
          Validators.required
        ]
      ],
      fecha_estimada_otorgamiento: [
        null, [
          Validators.required
        ]
      ],
      forma_pago_capital: [
        null, [
          Validators.required
        ]
      ],
      forma_pago_interes: [
        null, [
          Validators.required
        ]
      ],
      productof: [
        null, [
          Validators.required
        ]
      ],
    });
    this.importe_credito = this.terminosForm.controls['importe_credito'];
    this.plazo_credito = this.terminosForm.controls['plazo_credito'];
    this.productof = this.terminosForm.controls['productof'];
    this.taza_fija_anual = this.terminosForm.controls['taza_fija_anual'];
    this.fecha_estimada_otorgamiento = this.terminosForm.controls['fecha_estimada_otorgamiento'];
    this.forma_pago_capital = this.terminosForm.controls['forma_pago_capital'];
    this.forma_pago_interes = this.terminosForm.controls['forma_pago_interes'];
  }
  ngOnInit(): void {
    this.p_financiero.push({
      id: 0,
      nombre: '',
      secciones: [],
      documentos: [],
      tasa_porcentual: null,
      plazos: []
    });
    this.simula.equipos.forEach((item)=>{
      this.T_precioventa+=item['precio_venta'];
    });
   this.soli.getProductoFinaciero()
      .subscribe({
        next: (resp) => {
          this.p_financiero.push(...resp['producto-financiero']);
          if (this.simula.capacidad_id != null) {
            this.productof.setValue(this.p_financiero.find((item => item.id == this.simula.capacidad_id)));
            this.capacidad_id= this.simula.capacidad_id;
            this.taza_fija_anual.setValue(this.productof.value['tasa_porcentual']);
            this.list_plazos= this.productof.value['plazos'];
          }
        },
        error: () => {
        }
      });
  }
  async ngAfterViewInit(): Promise<void> {
    if (this.simula.inversiontotal == 0) {
      await setTimeout(() => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'necesitas completar Presupuesto para continuar' });
      }, 500);
      await setTimeout(() => {
        this.router.navigate(['/promotor/simulador/presupuesto']);
      }, 1000);

    } else {
      await setTimeout(() => {
        this.importe_credito.setValue(this.simula.inversiontotal);
      }, 500);
    }
    if (this.simula.terminos_credito != null) {
      this.terminosForm.reset(this.simula.terminos_credito);
    }
  }

  resultados() {
    if(this.apply_periodo==10){
      if(this.value_pago ==null || this.mesnum == null){
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Campos incompletos' });
      return;
      }
    }
    if (this.terminosForm.invalid) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Campos incompletos' });
      return;
    }
    this.simula.terminos_credito = this.terminosForm.value;
    this.local.show();
    this.taza_fija_anual.enable();
    this.productof.disable();
    this.post.unicosimulador({...this.terminosForm.value,apply_periodo_gracia:this.apply_periodo,meses_gracia: this.mesnum,pago_gracia:this.value_pago,  token: this.auth.usuario.token, apply_iva: this.simula.bindings[0].apply_iva, capacidad_id:this.simula.capacidad_id,comisionxapertura: this.simula.comisionxapertura, gastos_contratacion: this.simula.gastos_contratacion, precio_venta:this.T_precioventa}).subscribe({
      next: (resp) => {
        this.local.hide();
        if (resp.code == 202) {
          this.simula.terminos_credito = this.terminosForm.value;
          this.simula.tabla_amortizacion = resp.tabla_amortizacion;
            this.router.navigate(['/promotor/simulador/simulador']);
                this.productof.enable();

        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: resp.message });
        }
        this.productof.enable();
      },
      error: (e) => {
        this.local.hide();
        this.productof.enable();
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Contacta al soporte de Cresca' });
      }
    });
  }

  guardasale() {
    this.salir = true;
    this.resultados();
  }
  seleccion(event: any) {
    this.capacidad_id = event.value['id'];
    this.simula.capacidad_id=this.capacidad_id;
    this.taza_fija_anual.setValue(Number(event.value['tasa_porcentual']));
    this.list_plazos= event.value['plazos'];
  }
  elswich(event: InputSwitchOnChangeEvent) {
    if (event.checked) {
      this.apply_periodo = 10;
    } else {
      this.apply_periodo = 20;
    }

  }
  selectperiodo(event: any) {
    if (event.value == '') {
      return;
    }
    this.mesnum = Number(event.value);
  }
  selectpago(event: any) {
    if (event.value == 'Mensual') {
      this.value_pago = 10;
    } else {
      this.value_pago = 20;
    }
  }
}
