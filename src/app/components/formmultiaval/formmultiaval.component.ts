import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formNufi } from '../../interfaces/general.interface';
import { LocalService } from '../../services/local.service';

@Component({
  selector: 'app-formmultiaval',
  templateUrl: './formmultiaval.component.html',
  styleUrls: ['./formmultiaval.component.scss']
})
export class FormmultiavalComponent implements OnInit {
  @Output() formevent: EventEmitter<any> = new EventEmitter();//formulario
  @Input() formulario: formNufi[] =[];
  form: FormGroup = this.fb.group(
    {
      avales: this.fb.array([])
    }
  );
  list_genero: string[] = [
    'SELECCIONAR',
    'HOMBRE',
    'MUJER',
  ];
  list_estados: string[] = [
    '',
    'AGUASCALIENTES',
    'BAJA CALIFORNIA',
    'BAJA CALIFORNIA SUR',
    'CAMPECHE',
    'COAHUILA',
    'COLIMA',
    'CHIAPAS',
    'CHIHUAHUA',
    'CIUDAD DE MÉXICO',
    'DURANGO',
    'GUANAJUATO',
    'GUERRERO',
    'HIDALGO',
    'JALISCO',
    'ESTADO DE MÉXICO',
    'MICHOACÁN',
    'MORELOS',
    'NAYARIT',
    'NUEVO LEÓN',
    'OAXACA',
    'PUEBLA',
    'QUERÉTARO',
    'QUINTANA ROO',
    'SAN LUIS POTOSÍ',
    'SINALOA',
    'SONORA',
    'TABASCO',
    'TAMAULIPAS',
    'TLAXCALA',
    'VERACRUZ',
    'YUCATÁN',
    'ZACATECAS',
    'NACIDO EN EL EXTRANJERO',
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
tipo_persona: any;
@Input() view: boolean = true;
  //@ts-ignore
  myfile: File;

  constructor(private fb: FormBuilder){}

  ngOnInit(): void {
    const control = <FormArray>this.form.get('avales');
    if(this.formulario.length>=1){
      let i=0;
      for(let uno of this.formulario){
        control.push(this.unolleno(uno));
        this.tipodepersona({value:uno.tipo_persona},i,10);
        i++;
      }
    }else{
      control.push(this.initaval());
    }
  }
  unolleno(uno: formNufi): any {
    return this.fb.group({
      curp: [
        uno.curp,
        [
          Validators.required,
          Validators.minLength(18),
          Validators.maxLength(18)
        ],
      ],
      fecha_nacimiento: [
        uno.fecha_nacimiento, [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10)
        ]
      ],
      solicitante_fecha_constitucion: [
        uno.solicitante_fecha_constitucion, [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10)
        ]
      ],
      entidad: [
        uno.entidad, [
          Validators.required
        ]
      ],
      is_aval: [
        false
      ],
      tipo_persona: [
        uno.tipo_persona, [
          Validators.required
        ]
      ],
      sexo: [
       uno.sexo , [
          Validators.required
        ]
      ],
      nombre: [
        uno.nombre, [
          Validators.required
        ]
      ],
      apellido_paterno: [
        uno.apellido_paterno, [
          Validators.required
        ]
      ],
      apellido_materno: [
        uno.apellido_materno, [
          Validators.required
        ]
      ],
      correo: [
        uno.correo, [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')
        ]
      ],
      telefono: [
        uno.telefono, [
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
      uno.rfc , [
          Validators.required,
          Validators.minLength(12),
          Validators.maxLength(13)
        ]
      ],
      ine_numero: [
        uno.ine_numero, [
          Validators.required
        ]
      ],
      ine_vigencia: [
        uno.ine_vigencia, [
          Validators.required
        ]
      ],
      domicilio_cp: [
        uno.domicilio_cp, [
          Validators.required
        ]
      ],
      domicilio_estado: [
        uno.entidad
      ],
      domicilio_municipio: [
        uno.domicilio_municipio, [
          Validators.required
        ]
      ],
      domicilio_colonia: [
        uno.domicilio_colonia, [
          Validators.required
        ]
      ],
      domicilio_direccion: [
        uno.domicilio_direccion, [
          Validators.required
        ]
      ],
      estado_civil: [
        uno.estado_civil, [
          Validators.required
        ]
      ],
      solicitante_nombre_contacto:[
        uno.solicitante_nombre_contacto, [
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
        uno.reporte_id
      ],
      click: [
        20
      ]
    });
  }
  initaval(): any {
    return this.fb.group({
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
      ],
      click: [
        20
      ]
    });
  }

  get avales() {
    return this.form.get("avales") as FormArray;
  }

  getvaluertipopersona(i: number){
    //@ts-ignore this.equipos.controls[i]['controls'].precio_venta.value
    return this.avales.controls[i]['controls'].tipo_persona.value;
  }
  addaval() {
    const control = <FormArray>this.form.get('avales');
    control.push(this.initaval());
    }
    removeAval(i: number) {
      const control = <FormArray>this.form.get('avales');
      control.removeAt(i);
  }
    async file(event: any, tipo: number,i: number) {
      this.myfile = event.target.files[0];
      if (this.myfile != null || this.myfile != undefined) {
        this.getBase64(this.myfile, tipo,i);
      }
    }
    getBase64(file: File, tipo: number,i: number) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        switch(tipo){
          case 10:
            //@ts-ignore
            this.form.controls['avales']['controls'][i]['controls'].img_frente.setValue(reader.result + '');
            break;
          case 20:
            //@ts-ignore
            this.form.controls['avales']['controls'][i]['controls'].img_reverso.setValue(reader.result + '');
            break;
          case 30:
            //@ts-ignore
            this.form.controls['avales']['controls'][i]['controls'].solicitante_acta_constitutiva.setValue(reader.result + '');
            break;
          case 40:
            //@ts-ignore
            this.form.controls['avales']['controls'][i]['controls'].solicitante_poderes_representante.setValue(reader.result + '');
            break;
        }
      };
      reader.onerror = (error) => {
      };
    }
    tipodepersona(event: any,i: number,bandera:number=20) {
      if(event.value=='Fisica'){
        if(bandera==20){
          //@ts-ignore
          this.form.controls['avales']['controls'][i].reset({tipo_persona:'Fisica'});
        }
        //@ts-ignore
        this.form.controls['avales']['controls'][i]['controls'].curp.enable();
        //@ts-ignore
        this.form.controls['avales']['controls'][i]['controls'].curp.updateValueAndValidity();
        //@ts-ignore
        this.form.controls['avales']['controls'][i]['controls'].fecha_nacimiento.enable();
        //@ts-ignore
        this.form.controls['avales']['controls'][i]['controls'].fecha_nacimiento.updateValueAndValidity();
        //@ts-ignore
        this.form.controls['avales']['controls'][i]['controls'].sexo.enable();
        //@ts-ignore
        this.form.controls['avales']['controls'][i]['controls'].sexo.updateValueAndValidity();
        //@ts-ignore
        this.form.controls['avales']['controls'][i]['controls'].apellido_paterno.enable();
        //@ts-ignore
        this.form.controls['avales']['controls'][i]['controls'].apellido_paterno.updateValueAndValidity();
        //@ts-ignore
        this.form.controls['avales']['controls'][i]['controls'].apellido_materno.enable();
        //@ts-ignore
        this.form.controls['avales']['controls'][i]['controls'].apellido_materno.updateValueAndValidity();
        //@ts-ignore
        this.form.controls['avales']['controls'][i]['controls'].img_frente.enable();
        //@ts-ignore
        this.form.controls['avales']['controls'][i]['controls'].img_frente.updateValueAndValidity();
        //@ts-ignore
        this.form.controls['avales']['controls'][i]['controls'].img_reverso.enable();
        //@ts-ignore
        this.form.controls['avales']['controls'][i]['controls'].img_reverso.updateValueAndValidity();
        //@ts-ignore
        this.form.controls['avales']['controls'][i]['controls'].ine_numero.enable();
        //@ts-ignore
        this.form.controls['avales']['controls'][i]['controls'].ine_numero.updateValueAndValidity();
        //@ts-ignore
        this.form.controls['avales']['controls'][i]['controls'].ine_vigencia.enable();
        //@ts-ignore
        this.form.controls['avales']['controls'][i]['controls'].ine_vigencia.updateValueAndValidity();
        //@ts-ignore
        this.form.controls['avales']['controls'][i]['controls'].estado_civil.enable();
        //@ts-ignore
        this.form.controls['avales']['controls'][i]['controls'].estado_civil.updateValueAndValidity();
        //@ts-ignore
        this.form.controls['avales']['controls'][i]['controls'].solicitante_fecha_constitucion.disable();
        //@ts-ignore
        this.form.controls['avales']['controls'][i]['controls'].solicitante_fecha_constitucion.updateValueAndValidity();
        //@ts-ignore
        this.form.controls['avales']['controls'][i]['controls'].solicitante_nombre_contacto.disable();
        //@ts-ignore
        this.form.controls['avales']['controls'][i]['controls'].solicitante_nombre_contacto.updateValueAndValidity();
        //@ts-ignore
        this.form.controls['avales']['controls'][i]['controls'].solicitante_acta_constitutiva.disable();
        //@ts-ignore
        this.form.controls['avales']['controls'][i]['controls'].solicitante_acta_constitutiva.updateValueAndValidity();
        //@ts-ignore
        this.form.controls['avales']['controls'][i]['controls'].solicitante_poderes_representante.disable();
        //@ts-ignore
        this.form.controls['avales']['controls'][i]['controls'].solicitante_poderes_representante.updateValueAndValidity();
      }else if(event.value=='Moral'){
        if(bandera==20){
          //@ts-ignore
          this.form.controls['avales']['controls'][i].reset({tipo_persona:'Moral'});
        }
        //@ts-ignore
        this.form.controls['avales']['controls'][i]['controls'].solicitante_fecha_constitucion.enable();
        //@ts-ignore
        this.form.controls['avales']['controls'][i]['controls'].solicitante_fecha_constitucion.updateValueAndValidity();
        //@ts-ignore
        this.form.controls['avales']['controls'][i]['controls'].solicitante_nombre_contacto.enable();
        //@ts-ignore
        this.form.controls['avales']['controls'][i]['controls'].solicitante_nombre_contacto.updateValueAndValidity();
        //@ts-ignore
        this.form.controls['avales']['controls'][i]['controls'].solicitante_acta_constitutiva.enable();
        //@ts-ignore
        this.form.controls['avales']['controls'][i]['controls'].solicitante_acta_constitutiva.updateValueAndValidity();
        //@ts-ignore
        this.form.controls['avales']['controls'][i]['controls'].solicitante_poderes_representante.enable();
        //@ts-ignore
        this.form.controls['avales']['controls'][i]['controls'].solicitante_poderes_representante.updateValueAndValidity();
        //@ts-ignore
        this.form.controls['avales']['controls'][i]['controls'].curp.disable();
        //@ts-ignore
        this.form.controls['avales']['controls'][i]['controls'].curp.updateValueAndValidity();
        //@ts-ignore
        this.form.controls['avales']['controls'][i]['controls'].fecha_nacimiento.disable();
        //@ts-ignore
        this.form.controls['avales']['controls'][i]['controls'].fecha_nacimiento.updateValueAndValidity();
        //@ts-ignore
        this.form.controls['avales']['controls'][i]['controls'].sexo.disable();
        //@ts-ignore
        this.form.controls['avales']['controls'][i]['controls'].sexo.updateValueAndValidity();
        //@ts-ignore
        this.form.controls['avales']['controls'][i]['controls'].apellido_paterno.disable();
        //@ts-ignore
        this.form.controls['avales']['controls'][i]['controls'].apellido_paterno.updateValueAndValidity();
        //@ts-ignore
        this.form.controls['avales']['controls'][i]['controls'].apellido_materno.disable();
        //@ts-ignore
        this.form.controls['avales']['controls'][i]['controls'].apellido_materno.updateValueAndValidity();
        //@ts-ignore
        this.form.controls['avales']['controls'][i]['controls'].img_frente.disable();
        //@ts-ignore
        this.form.controls['avales']['controls'][i]['controls'].img_frente.updateValueAndValidity();
        //@ts-ignore
        this.form.controls['avales']['controls'][i]['controls'].img_reverso.disable();
        //@ts-ignore
        this.form.controls['avales']['controls'][i]['controls'].img_reverso.updateValueAndValidity();
        //@ts-ignore
        this.form.controls['avales']['controls'][i]['controls'].ine_numero.disable();
        //@ts-ignore
        this.form.controls['avales']['controls'][i]['controls'].ine_numero.updateValueAndValidity();
        //@ts-ignore
        this.form.controls['avales']['controls'][i]['controls'].ine_vigencia.disable();
        //@ts-ignore
        this.form.controls['avales']['controls'][i]['controls'].ine_vigencia.updateValueAndValidity();
        //@ts-ignore
        this.form.controls['avales']['controls'][i]['controls'].estado_civil.disable();
        //@ts-ignore
        this.form.controls['avales']['controls'][i]['controls'].estado_civil.updateValueAndValidity();
      }
      // this.tipopersona.emit(event.value);
    }
    generareporte() {
      if (this.form.controls['avales'].invalid) {      
        this.formevent.emit({ message: 'Campos incompletos, revisa tu informacion' });
        return;
      }
      this.formevent.emit(this.form.controls['avales'].value);
    }

}
