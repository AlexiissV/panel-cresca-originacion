import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalService } from '../../services/local.service';
import { MessageService } from 'primeng/api';
import { PostService } from '../../services/post.service';
import { postInfo } from '../../interfaces/general.interface';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-terminos',
  templateUrl: './terminos.component.html',
  styleUrls: ['./terminos.component.scss'],
  providers: [MessageService]
})
export class TerminosComponent {
  salir: boolean = false;
  estatus_solicitud:number = 0;
  terminosForm: FormGroup;
  list_Meses: string[] = [
    '',
    'Mensual',
    'Trimestal',
    'Semestral',
    'Anual',
    'Al Vencimiento',
  ];

  importe_credito: AbstractControl;
  plazo_credito: AbstractControl;
  taza_fija_anual: AbstractControl;
  forma_disposicion: AbstractControl;
  fecha_estimada_otorgamiento: AbstractControl;
  forma_pago_capital: AbstractControl;
  forma_pago_interes: AbstractControl;

  constructor(private formBuilder: FormBuilder,
    private local: LocalService,
    private post: PostService,
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
        null, [
          Validators.required
        ]
      ],
      forma_disposicion: [
        null, [
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
    });
    this.importe_credito = this.terminosForm.controls['importe_credito'];
    this.plazo_credito = this.terminosForm.controls['plazo_credito'];
    this.taza_fija_anual = this.terminosForm.controls['taza_fija_anual'];
    this.forma_disposicion = this.terminosForm.controls['forma_disposicion'];
    this.fecha_estimada_otorgamiento = this.terminosForm.controls['fecha_estimada_otorgamiento'];
    this.forma_pago_capital = this.terminosForm.controls['forma_pago_capital'];
    this.forma_pago_interes = this.terminosForm.controls['forma_pago_interes'];
  }
  async ngAfterViewInit(): Promise<void> {
    if (this.local.presupuesto_info == undefined || this.local.presupuesto_info == null) {
      await setTimeout(() => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'necesitas completar Presupuesto para continuar' });
      }, 500);
      await setTimeout(() => {
        this.router.navigate(['/promotor/originacion/presupuesto']);
      }, 1000);

    } else {
      await setTimeout(() => {
        this.importe_credito.setValue(this.local.presupuesto_info['importe_financiamiento_valor']);
      }, 500);
    }
    if (this.local.terminos_credito != null) {
      this.terminosForm.reset(this.local.terminos_credito);
      this.estatus_solicitud=this.local.estatus_solicitud;
    }
  }

  resultados() {
    if (this.terminosForm.invalid) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Campos incompletos' });
      return;
    }
    this.local.show();
    this.post.guardarsolicitud({ token: this.auth.usuario.token, solicitud_id: this.local.solicitud_id, seccion: 30, termino_credito: this.terminosForm.value }).subscribe({
      next: (resp) => {
        this.local.hide();
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
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Contacta al soporte de Cresca' });
      }
    });
  }

  guardasale() {
    this.salir = true;
    this.resultados();
  }
}
