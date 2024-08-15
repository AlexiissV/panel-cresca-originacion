import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalService } from '../../services/local.service';
import { MessageService } from 'primeng/api';
import { Group } from '../../interfaces/general.interface';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { InputSwitchOnChangeEvent } from 'primeng/inputswitch';
import { ProductoFinanciero } from 'src/app/interfaces/productof.interface';
import { SolicitudService } from '../../services/solicitud.service';

@Component({
  selector: 'app-terminos',
  templateUrl: './terminos.component.html',
  styleUrls: ['./terminos.component.scss'],
  providers: [MessageService]
})
export class TerminosComponent implements OnInit {
  banderafn: boolean = false;
  salir: boolean = false;
  gracias: boolean = false;
  estatus_solicitud: number = 0;
  apply_periodo: number = 20;
  //@ts-ignore
  value_pago: number =null;
  //@ts-ignore
  mesnum: number =null;
  terminosForm: FormGroup;
  p_financiero: ProductoFinanciero[] = [];
  capacidad_id: number = 0;
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

  constructor(private formBuilder: FormBuilder,
    private local: LocalService,
    private post: SolicitudService,
    private auth: AuthService,
    private router: Router,
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
      tasa_porcentual: null
    });
   this.post.getProductoFinaciero()
      .subscribe({
        next: (resp) => {
          this.p_financiero.push(...resp['producto-financiero']);
          if (this.local.capacidad_info != null) {
            //@ts-ignore
            this.productof.setValue(this.p_financiero.find((item => item.id == this.local.capacidad_id)));
            this.capacidad_id= this.local.capacidad_id;
            this.estatus_solicitud=this.local.estatus_solicitud;
            this.taza_fija_anual.setValue(this.productof.value['tasa_porcentual']);
          }
        },
        error: () => {
        }
      });
  }
  async ngAfterViewInit(): Promise<void> {
    if (this.local.equipos.length==0) {
      await setTimeout(() => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'necesitas completar Presupuesto para continuar' });
      }, 500);
      await setTimeout(() => {
        this.router.navigate(['/promotor/originacion/presupuesto']);
      }, 1000);

    } else {
      await setTimeout(() => {
        this.importe_credito.setValue(this.local.inversiontotal);
      }, 500);
    }
    if (this.local.terminos_credito != null) {
      this.terminosForm.reset(this.local.terminos_credito);
      this.estatus_solicitud = this.local.estatus_solicitud;
      if(this.local.terminos_credito.apply_periodo==20){
        this.gracias= true;
      }
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
    if (this.local.solicitud_id == null || this.local.solicitud_id == 0){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Aun no ha iniciado una Solicitud ' });
      return;
    }
    if (!this.banderafn) {
      this.banderafn = true;
    }
    this.local.show();
    this.taza_fija_anual.enable();
    this.post.guardarsolicitud({ token: this.auth.usuario.token, solicitud_id: this.local.solicitud_id, seccion: 30,capacidad_id:this.capacidad_id, termino_credito: {...this.terminosForm.value,apply_periodo_gracia:this.apply_periodo,meses_gracia: this.mesnum,pago_gracia:this.value_pago} }).subscribe({
      next: (resp) => {
        this.local.hide();
        this.banderafn= false;
        if (resp.code == 202) {
          //@ts-ignore
          this.local.solicitud_id = resp.solicitud_id;
          this.local.terminos_credito = this.terminosForm.value;
          this.local.tabla_amortizacion = resp.tabla_amortizacion;
          if (this.salir) {
            this.router.navigate(['/promotor/promotor/']);
          } else {
            this.router.navigate(['/promotor/originacion/simulador']);
          }
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: resp.message });
        }
      },
      error: (e) => {
        this.local.hide();
        this.banderafn= false;
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
    this.local.capacidad_id=this.capacidad_id;
    this.taza_fija_anual.setValue(Number(event.value['tasa_porcentual']));
    this.local.doc_finaciero= event.value['documentos'];    
    let cuestions: Group[] = event.value.secciones[0]['groups'];
    for (let i = 0; i < cuestions.length; i++) {
      cuestions[i].items = cuestions[i].items.map(item => ({ ...item, value_register: '' }));
    }
    this.local.capacidad_info = cuestions;
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
