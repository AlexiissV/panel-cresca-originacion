import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formNufi } from '../../interfaces/general.interface';

@Component({
  selector: 'app-formgenerales',
  templateUrl: './formgenerales.component.html',
  styleUrls: ['./formgenerales.component.scss']
})
export class FormgeneralesComponent implements AfterViewInit{
  @Output() form: EventEmitter<any> = new EventEmitter();
  @Output() tipopersona: EventEmitter<string> = new EventEmitter();
  @Input() formulario: formNufi= {
    curp: '',
    fecha_nacimiento: '',
    entidad: '',
    tipo_persona: '',
    sexo: '',
    nombre: '',
    apellido_paterno: '',
    apellido_materno: '',
    correo: '',
    telefono: '',
    img_frente: '',
    img_reverso: '',
    reporte_id: ''
  };
  @Input() view: boolean= true;
  list_genero: string[] = [
    'Seleccionar',
    'Hombre',
    'Mujer',
  ];
  list_estados: string[] = [
    '',
      'Aguascalientes',
      'Baja California',
      'Baja California Sur',
      'Campeche',
      'Coahuila',
      'Colima',
      'Chiapas',
      'Chihuahua',
      'Ciudad de México',
      'Durango',
      'Guanajuato',
      'Guerrero',
      'Hidalgo',
      'Jalisco',
      'Estado de México',
      'Michoacán',
      'Morelos',
      'Nayarit',
      'Nuevo León',
      'Oaxaca',
      'Puebla',
      'Querétaro',
      'Quintana Roo',
      'San Luis Potosí',
      'Sinaloa',
      'Sonora',
      'Tabasco',
      'Tamaulipas',
      'Tlaxcala',
      'Veracruz',
      'Yucatán',
      'Zacatecas',
      'Nacido en el extranjero',
  ];
  list_persona:string[]=[
    '',
    'Fisica',
    'Moral'
  ];
  infoforms: FormGroup;
  tipo_persona: AbstractControl;
  curp: AbstractControl;
  fecha_nacimiento: AbstractControl;
  reporte_id: AbstractControl;
  entidad: AbstractControl;
  sexo: AbstractControl;
  nombre: AbstractControl;
  apellido_paterno: AbstractControl;
  apellido_materno: AbstractControl;
  correo: AbstractControl;
  telefono: AbstractControl;
  img_frente: AbstractControl;
  img_reverso: AbstractControl;
  //@ts-ignore
  myfile: File;

   
  constructor(private fb: FormBuilder){
    this.infoforms = this.fb.group({
      curp: [
        '',
        [
          Validators.required,
          Validators.minLength(18),
          Validators.maxLength(18)
        ],
      ],
      fecha_nacimiento: [
        '', [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10)
        ]
      ],
      entidad: [
        '', [
          Validators.required
        ]
      ],
      tipo_persona: [
        '', [
          Validators.required
        ]
      ],
      sexo: [
        '', [
          Validators.required
        ]
      ],
      nombre: [
        '', [
          Validators.required
        ]
      ],
      apellido_paterno: [
        '', [
          Validators.required
        ]
      ],
      apellido_materno: [
        '', [
          Validators.required
        ]
      ],
      correo: [
        '', [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')
        ]
      ],
      telefono: [
        '', [
          Validators.required,
        ]
      ],
      img_frente: [
        '', [
          Validators.required
        ]
      ],
      img_reverso: [
        '', [
          Validators.required
        ]
      ],
      reporte_id: [
        ''
      ]
    });
    this.tipo_persona = this.infoforms.controls['tipo_persona'];
    this.curp = this.infoforms.controls['curp'];
    this.fecha_nacimiento = this.infoforms.controls['fecha_nacimiento'];
    this.entidad = this.infoforms.controls['entidad'];
    this.sexo = this.infoforms.controls['sexo'];
    this.nombre = this.infoforms.controls['nombre'];
    this.apellido_paterno = this.infoforms.controls['apellido_paterno'];
    this.apellido_materno = this.infoforms.controls['apellido_materno'];
    this.correo = this.infoforms.controls['correo'];
    this.telefono = this.infoforms.controls['telefono'];
    this.img_frente = this.infoforms.controls['img_frente'];
    this.img_reverso = this.infoforms.controls['img_reverso'];
    this.reporte_id = this.infoforms.controls['reporte_id'];
  }
  ngAfterViewInit(): void {
    if(this.formulario.curp!=''){
      this.infoforms.reset(this.formulario);
    }
  }

  async file(event: any,tipo: number) {
    this.myfile = event.target.files[0];
    if (this.myfile != null || this.myfile != undefined) {
      this.getBase64(this.myfile,tipo);
    }
  }
  getBase64(file: File,tipo: number) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      if(tipo==10){
        this.img_frente.setValue(reader.result + '');
      }else if(tipo==20){
        this.img_reverso.setValue(reader.result + '');
      }
    };
    reader.onerror = (error) => {
    };
  }
  tipodepersona(event: any) {
    this.tipopersona.emit(event.value);
    
    }
  generareporte() {
    if(this.infoforms.invalid){
      this.form.emit({message:'Campos incompletos, revisa tu informacion'});
      return;
    }
    this.form.emit(this.infoforms.value);
  }
}
