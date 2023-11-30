import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formNufi } from '../../interfaces/general.interface';

@Component({
  selector: 'app-formgenerales',
  templateUrl: './formgenerales.component.html',
  styleUrls: ['./formgenerales.component.scss']
})
export class FormgeneralesComponent implements AfterViewInit {

  @Output() form: EventEmitter<any> = new EventEmitter();
  @Output() tipopersona: EventEmitter<string> = new EventEmitter();
  @Output() vaaseraval: EventEmitter<boolean> = new EventEmitter();
  @Input() formulario: formNufi = {
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
    reporte_id: '',
    rfc: '',
    ine_numero: '',
    ine_vigencia: '',
    domicilio_cp: '',
    domicilio_estado: '',
    domicilio_municipio: '',
    domicilio_colonia: '',
    domicilio_direccion: '',
    estado_civil: '',
    solicitante_fecha_constitucion: '',
    solicitante_nombre_contacto: '',
    solicitante_acta_constitutiva: '',
    solicitante_poderes_representante: ''
  };
  @Input() view: boolean = true;
  @Input() check: boolean = false;
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
  list_persona: string[] = [
    '',
    'Fisica',
    'Moral'
  ];
  list_estadocivil: string[]=[
    '',
    'SOLTERO',
    'CASADO',
    'DIVORCIADO',
    'UNION LIBRE',
    'VIUDO'
  ];
  infoforms: FormGroup;
  tipo_persona: AbstractControl;
  is_aval: AbstractControl;
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
  rfc: AbstractControl;
  estado_civil: AbstractControl;
  ine_numero: AbstractControl;
  ine_vigencia: AbstractControl;
  domicilio_cp: AbstractControl;
  domicilio_estado: AbstractControl;
  domicilio_municipio: AbstractControl;
  domicilio_colonia: AbstractControl;
  domicilio_direccion: AbstractControl;
  solicitante_fecha_constitucion: AbstractControl;
  solicitante_nombre_contacto: AbstractControl;
  solicitante_acta_constitutiva: AbstractControl;
  solicitante_poderes_representante: AbstractControl;
  //@ts-ignore
  myfile: File;


  constructor(private fb: FormBuilder) {
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
      solicitante_fecha_constitucion: [
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
      is_aval: [
        false
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
      rfc: [
        '', [
          Validators.required,
          Validators.minLength(12),
          Validators.maxLength(13)
        ]
      ],
      ine_numero: [
        '', [
          Validators.required
        ]
      ],
      ine_vigencia: [
        '', [
          Validators.required
        ]
      ],
      domicilio_cp: [
        '', [
          Validators.required
        ]
      ],
      domicilio_estado: [
        ''
      ],
      domicilio_municipio: [
        '', [
          Validators.required
        ]
      ],
      domicilio_colonia: [
        '', [
          Validators.required
        ]
      ],
      domicilio_direccion: [
        '', [
          Validators.required
        ]
      ],
      estado_civil: [
        '', [
          Validators.required
        ]
      ],
      solicitante_nombre_contacto:[
        '', [
          Validators.required
        ]
      ],
      solicitante_acta_constitutiva:[
        '', [
          Validators.required
        ]
      ],
      solicitante_poderes_representante:[
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
    this.rfc = this.infoforms.controls['rfc'];
    this.estado_civil = this.infoforms.controls['estado_civil'];
    this.ine_numero = this.infoforms.controls['ine_numero'];
    this.ine_vigencia = this.infoforms.controls['ine_vigencia'];
    this.domicilio_cp = this.infoforms.controls['domicilio_cp'];
    this.domicilio_estado = this.infoforms.controls['domicilio_estado'];
    this.domicilio_municipio = this.infoforms.controls['domicilio_municipio'];
    this.domicilio_colonia = this.infoforms.controls['domicilio_colonia'];
    this.domicilio_direccion = this.infoforms.controls['domicilio_direccion'];
    this.is_aval = this.infoforms.controls['is_aval'];
    this.solicitante_fecha_constitucion = this.infoforms.controls['solicitante_fecha_constitucion'];
    this.solicitante_nombre_contacto = this.infoforms.controls['solicitante_nombre_contacto'];
    this.solicitante_acta_constitutiva = this.infoforms.controls['solicitante_acta_constitutiva'];
    this.solicitante_poderes_representante = this.infoforms.controls['solicitante_poderes_representante'];
  }
  ngAfterViewInit(): void {
    if (this.formulario.rfc != '') {
      this.infoforms.reset(this.formulario);
      if(this.formulario.tipo_persona=='Fisica'){
        this.infoforms.reset(this.formulario);
      this.solicitante_fecha_constitucion.disable();
      this.solicitante_nombre_contacto.disable();
      this.solicitante_acta_constitutiva.disable();
      this.solicitante_poderes_representante.disable();
      }else if(this.formulario.tipo_persona=='Moral'){
      this.solicitante_fecha_constitucion.enable();
      this.solicitante_nombre_contacto.enable();
      this.solicitante_acta_constitutiva.enable();
      this.solicitante_poderes_representante.enable();
      this.curp.disable();
      this.fecha_nacimiento.disable();
      this.sexo.disable();
      this.apellido_paterno.disable();
      this.apellido_materno.disable();
      this.img_frente.disable();
      this.img_reverso.disable();
      this.ine_numero.disable();
      this.ine_vigencia.disable();
      this.estado_civil.disable();
      }
    }
  }

  async file(event: any, tipo: number) {
    this.myfile = event.target.files[0];
    if (this.myfile != null || this.myfile != undefined) {
      this.getBase64(this.myfile, tipo);
    }
  }
  getBase64(file: File, tipo: number) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      switch(tipo){
        case 10:
          this.img_frente.setValue(reader.result + '');
          break;
        case 20:
          this.img_reverso.setValue(reader.result + '');
          break;
        case 30:
          this.solicitante_acta_constitutiva.setValue(reader.result + '');
          break;
        case 40:
          this.solicitante_poderes_representante.setValue(reader.result + '');
          break;
      }
    };
    reader.onerror = (error) => {
    };
  }
  tipodepersona(event: any) {
    if(event.value=='Fisica'){
      this.infoforms.reset({tipo_persona:'Fisica'});
      this.solicitante_fecha_constitucion.disable();
      this.solicitante_nombre_contacto.disable();
      this.solicitante_acta_constitutiva.disable();
      this.solicitante_poderes_representante.disable();
    }else if(event.value=='Moral'){
      this.infoforms.reset({tipo_persona:'Moral'});
      this.solicitante_fecha_constitucion.enable();
      this.solicitante_nombre_contacto.enable();
      this.solicitante_acta_constitutiva.enable();
      this.solicitante_poderes_representante.enable();
      this.curp.disable();
      this.fecha_nacimiento.disable();
      this.sexo.disable();
      this.apellido_paterno.disable();
      this.apellido_materno.disable();
      this.img_frente.disable();
      this.img_reverso.disable();
      this.ine_numero.disable();
      this.ine_vigencia.disable();
      this.estado_civil.disable();
    }
    this.tipopersona.emit(event.value);
    

  }
  generareporte() {    
    console.log(this.infoforms.value);
    
    if (this.infoforms.invalid) {      
        this.form.emit({ message: 'Campos incompletos, revisa tu informacion' });
      return;
    }
    this.domicilio_estado.setValue(this.entidad.value);
    /*this.curp.enable();
      this.fecha_nacimiento.enable();
      this.sexo.enable();
      this.apellido_paterno.enable();
      this.apellido_materno.enable();
      this.img_frente.enable();
      this.img_reverso.enable();
      this.ine_numero.enable();
      this.ine_vigencia.enable();
      this.estado_civil.enable();*/
      this.form.emit(this.infoforms.value);
  }
  tambienaval(event: any) {
    this.vaaseraval.emit(event['checked']);
    }
}
