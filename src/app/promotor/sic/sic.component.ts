import { Component, OnInit } from '@angular/core';
import { LocalService } from '../../services/local.service';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { formNufi } from 'src/app/interfaces/general.interface';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { SolicitudService } from '../../services/solicitud.service';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-sic',
  templateUrl: './sic.component.html',
  styleUrls: ['./sic.component.scss'],
  providers: [MessageService]

})
export class SicComponent implements OnInit {
  estatus_solicitud: number = 0;
  midata: any;
  Mipipe = new DatePipe('en-US');
  pdfObject: any;
  banderafn: boolean = false;
  salir: boolean=false;
  misestilos: any = {
    titulo: {
      fontSize: 15,
      bold: true,
      alignment: 'center',
      margin: [0, 0, 0, 5]
    },
    gene:{
      bold:true,
      fontSize:10
      
    },
    subtitulo: {
      fontSize: 12,
      alignment: 'center',
      margin: [0, 0, 0, 10]
    },
    texto:{
        fontSize:9,
        alignment: 'justify',
    }
  };
  fecha = new Date();
  //@ts-ignore
  myfile: File;
  sic: string='';
  file_sic:string = '';
 solicitante: formNufi = {
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
 legal: formNufi = {
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
 aval: formNufi[] =[];


  constructor(private local: LocalService,
			  private messageService: MessageService,
        private auth: AuthService,
			  private router: Router,
			  private post: SolicitudService) { }

  ngOnInit(): void {
    if(this.local.formsolicitante.tipo_persona=='Fisica'){
      this.solicitante= this.local.formsolicitante;
    }else{
      this.solicitante= this.local.formsolicitante;
      this.solicitante.curp='';
      this.solicitante.apellido_paterno='';
      this.solicitante.apellido_materno='';
      this.solicitante.fecha_nacimiento=this.solicitante.solicitante_fecha_constitucion;
      
    }
		this.legal= this.local.formrepresentante;
		this.aval= this.local.formsaval;
    this.estatus_solicitud= this.local.estatus_solicitud;
    if(this.local.file_sic!=''){
      this.file_sic= this.local.file_sic;
    }
  }
  descargarsic() {
    let conet:any[]=[
      { text: `Carta Autorización para solicitar Reportes de Crédito`, style: 'titulo' },
        { text: `Personas Físicas / Personas Morales.`, style: 'subtitulo' },
        { text: `Por este conducto autorizo expresamente a  Crédito Especializado al Campo, S.A. de C.V.  SOFOM, E.N.R., PARA QUE POR CONDUCTO DE SUS FUNCIONARIOS FACULTADOS LLEVE A CABO Investigaciones, sobre mi comportamiento crediticio ó el de la Empresa que represento en Trans Union de México, S.A. SIC y/o Dun & bradstreet, S.A. SIC.`,style:'texto' },
        { text: `Asimismo, declaro que conozco la naturaleza  y alcance de las sociedades de información crediticia y de la información contenida en los reportes de crédito y soporte de crédito especial; declaro que conozco la naturaleza y alcance de la información que se solicitará, del uso que  Crédito Especializado al Campo, S.A. de C.V.  SOFOM, E.N.R., hará de tal información y de que ésta podrá realizar consultas periódicas sobre mi historial ó el de la empresa que represento, consintiendo que esta autorización se encuentra vigente por un periodo de 3 años contados a partir de su expedición y en todo caso durante el tiempo que se mantenga la relación jurídica.`,style:'texto'},
        { text: `En caso que la solicitante sea una Persona Moral, declaro bajo protesta de decir verdad Ser Representante Legal de la empresa mencionada en esta autorización; manifestando que a la fecha de firma de la presente autorización los poderes no me han sido revocados, limitados, ni modificados en forma alguna.`,style:'texto'},
        { text: `Autorización para:`,fontSize:9, margin: [0, 5, 0, 4] },
        {
          margin: [0, 4, 0, 4],
        table: {
          widths: [130, 130, 60],
          headerRows: 2,
          body: [
              [{text:`Persona Fisica (PF):  `,fontSize:9,colSpan: 2, border:[false,false,false,false],alignment:'right'},{},{text:(this.solicitante.tipo_persona=='Fisica')?'X':'', alignment:'center',fontSize:10}],
              [{text:`Persona Fisica con Actividad Empresarial (PFAE):  `,fontSize:9,colSpan: 2, border:[false,false,false,false],alignment:'right'},{},{text:'  '}],
              [{text:`Persona Moral (PM):  `,fontSize:9,colSpan: 2, border:[false,false,false,false],alignment:'right'},{},{text:(this.solicitante.tipo_persona=='Moral')?'X':'', alignment:'center',fontSize:10}]
          ]
        }
      },
      {
          margin: [0, 4, 0, 10],
        table: {
          widths: [210, 210, 60],
          headerRows: 2,
          body: [
              [{text:`Acreditado;  `,fontSize:9,colSpan: 2, border:[false,false,false,false],alignment:'right'},{},{text:'X'}],
              [{text:`Aval, Fiador u Obligado Solidario;  `,fontSize:9,colSpan: 2, border:[false,false,false,false],alignment:'right'},{},{text:'  '}],
              [{text:`Garante;  `,fontSize:9,colSpan: 2, border:[false,false,false,false],alignment:'right'},{},{text:'  '}]
          ]
        }
      },
      {
          margin: [0, 0, 0, 0],
        table: {
          widths: [60,60,55,55,55,55,50,60],
          body: [
              [{text:`Nombre del Solicitante:`,style:'gene',colSpan:2,border:[false,false,false,false]},{},{text:`${this.solicitante.nombre} ${this.solicitante.apellido_paterno} ${this.solicitante.apellido_materno}`,colSpan:6,border:[false,false,false,true],fontSize:10},{},{},{},{},{}],
              [{text:`Fecha de constitución o nacimiento`,style:'gene',colSpan:3,border:[false,false,false,false]},{},{},{text:`(dd/mmm/aaaa);`, colSpan:2, fontSize:9,margin:[0,2,0,0],border:[false,false,false,false]},{},{text:this.solicitante.fecha_nacimiento,colSpan:3,border:[false,false,false,true],fontSize:10},{},{}],
              [{text:`R.F.C.:`,style:'gene',border:[false,false,false,false]},{text:this.solicitante.rfc.toUpperCase(),colSpan:3,border:[false,false,false,true],fontSize:10},{},{},{text:'CURP:',style:'gene',border:[false,false,false,false]},{text:this.solicitante.curp.toUpperCase(),colSpan:3,border:[false,false,false,true],fontSize:10},{},{}],
              [{text:`Domicilio`,style:'gene',border:[false,false,false,false]},{text:this.solicitante.domicilio_direccion,colSpan:7,border:[false,false,false,true],fontSize:10},{},{},{},{},{},{}],
              [{text:`Colonia`,style:'gene',border:[false,false,false,false]},{text:this.solicitante.domicilio_colonia,colSpan:7,border:[false,false,false,true],fontSize:10},{},{},{},{},{},{}],
              [{text:`Estado`,style:'gene',border:[false,false,false,false]},{text:this.solicitante.entidad, colSpan:2,border:[false,false,false,true],fontSize:10},{},{text:'Municipio',style:'gene',border:[false,false,false,false]},{text:this.solicitante.domicilio_municipio,colSpan:2,border:[false,false,false,true],fontSize:10},{},{text:'C.P.:',alignment: 'center',style:'gene',border:[false,false,false,false]},{text:this.solicitante.domicilio_cp,border:[false,false,false,true],fontSize:10}],
              [{text:`Teléfono:`,style:'gene',border:[false,false,false,false]},{text:this.solicitante.telefono,colSpan:3,border:[false,false,false,true],fontSize:10},{},{},{text:'',colSpan:4,border:[false,false,false,false]},{},{},{}],
              [{text:`Lugar y Fecha donde se firma la autorización:`,colSpan:4,style:'gene',border:[false,false,false,false]},{},{},{},{text:'',colSpan:4,border:[false,false,false,false]},{},{},{}],
              [{text:``,border:[false,false,false,false]},{text:`Avenida Isidro Fabela Norte 931, Colonia Los Ángeles; Toluca, México C.P. 50020,  ${this.Mipipe.transform(new Date(), 'dd/MM/yyyy')}`,alignment:'center',colSpan:7,border:[false,false,false,true],fontSize:10},{},{},{},{},{},{}],
              [{text:`Nombre del Funcionario que recaba la autorización:`,colSpan:5,style:'gene',border:[false,false,false,false]},{},{},{},{},{text:'',colSpan:3,border:[false,false,false,false]},{},{}],
              [{text:``,border:[false,false,false,false]},{text:`${this.auth.usuario.nombre.toUpperCase()} ${this.auth.usuario.apellidos.toUpperCase()}`,alignment:'center',colSpan:7,border:[false,false,false,true],fontSize:10},{},{},{},{},{},{}]
          ]
        }
      },
      {
          text:'Estoy consciente y acepto que este documento quede bajo custodia de Crédito Especializado al Campo, S.A. de C.V. SOFOM, E.N.R., y/o Sociedad de Información Crediticia consultada para efectos de control y cumplimiento del artículo 28 de la Ley para regular las Sociedades de Información Crediticia; mismo que señala que las Sociedades sólo podrán proporcionar información a un Usuario, cuando éste cuente con la autorización expresa del Cliente mediante su firma autógrafa.',alignment: 'justify', fontSize:9,margin:[0,20,0,20]
      },
      {
          margin: [0, 20, 0, 0],
        table: {
          widths: [60,60,55,55,55,55,50,60],
          body: [
              [{text:'',colSpan:2,border:[false,false,false,false]},{},{text:`${this.solicitante.nombre} ${this.solicitante.apellido_paterno} ${this.solicitante.apellido_materno}`,fontSize:10,colSpan:4,border:[false,false,false,true],alignment:'center'},{},{},{},{text:'',colSpan:2,border:[false,false,false,false]},{}],
              [{text:'',colSpan:3,border:[false,false,false,false]},{},{},{text:'Nombre y Firma',style:'gene', alignment:'center', colSpan:2,border:[false,false,false,false]},{},{text:'',colSpan:3,border:[false,false,false,false]},{},{}]
          ]
        }
      },
      {
          margin: [0, 30, 0, 15],
        table: {
          widths: [60,60,55,55,55,55,50,60],
          body: [
              [{text:'',border:[false,false,false,false]},{text:'Fecha de Consulta BC:',fillColor: '#a9d08e',fontSize:9,alignment: 'center',colSpan:2},{},{text:'',colSpan:4},{},{},{},{text:'',border:[false,false,false,false]}],
              [{text:'',border:[false,false,false,false]},{text:'Folio de Consulta BC:',fillColor: '#a9d08e',fontSize:9,alignment: 'center',colSpan:2},{},{text:'',colSpan:4},{},{},{},{text:'',border:[false,false,false,false]}]
          ]
        }
      },
      {
          text:'IMPORTANTE: Este formato  debe ser  llenado individualmente, para una sola persona física ó para una sola empresa. En caso de requerir el Historial crediticio del representante legal, favor de llenar un formato adicional.',alignment: 'center', headlineLevel: 1, fontSize:9,margin:[0,0,0,0]
      },
      { text: `Carta Autorización para solicitar Reportes de Crédito`,pageBreak: 'before', style: 'titulo' },
      { text: `Personas Físicas / Personas Morales.`, style: 'subtitulo' },
      { text: `Por este conducto autorizo expresamente a  Crédito Especializado al Campo, S.A. de C.V.  SOFOM, E.N.R., PARA QUE POR CONDUCTO DE SUS FUNCIONARIOS FACULTADOS LLEVE A CABO Investigaciones, sobre mi comportamiento crediticio ó el de la Empresa que represento en Trans Union de México, S.A. SIC y/o Dun & bradstreet, S.A. SIC.`,style:'texto' },
      { text: `Asimismo, declaro que conozco la naturaleza  y alcance de las sociedades de información crediticia y de la información contenida en los reportes de crédito y soporte de crédito especial; declaro que conozco la naturaleza y alcance de la información que se solicitará, del uso que  Crédito Especializado al Campo, S.A. de C.V.  SOFOM, E.N.R., hará de tal información y de que ésta podrá realizar consultas periódicas sobre mi historial ó el de la empresa que represento, consintiendo que esta autorización se encuentra vigente por un periodo de 3 años contados a partir de su expedición y en todo caso durante el tiempo que se mantenga la relación jurídica.`,style:'texto'},
      { text: `En caso que la solicitante sea una Persona Moral, declaro bajo protesta de decir verdad Ser Representante Legal de la empresa mencionada en esta autorización; manifestando que a la fecha de firma de la presente autorización los poderes no me han sido revocados, limitados, ni modificados en forma alguna.`,style:'texto'},
      { text: `Autorización para:`,fontSize:9, margin: [0, 5, 0, 4] },
      {
      margin: [0, 4, 0, 4],
    table: {
      widths: [130, 130, 60],
      headerRows: 2,
      body: [
          [{text:`Persona Fisica (PF):  `,fontSize:9,colSpan: 2, border:[false,false,false,false],alignment:'right'},{},{text:(this.legal.tipo_persona=='Fisica')?'X':'', alignment:'center',fontSize:10}],
          [{text:`Persona Fisica con Actividad Empresarial (PFAE):  `,fontSize:9,colSpan: 2, border:[false,false,false,false],alignment:'right'},{},{text:'  '}],
          [{text:`Persona Moral (PM):  `,fontSize:9,colSpan: 2, border:[false,false,false,false],alignment:'right'},{},{text:(this.legal.tipo_persona=='Moral')?'X':'', alignment:'center',fontSize:10}]
      ]
    }
  },
  {
      margin: [0, 4, 0, 10],
    table: {
      widths: [210, 210, 60],
      headerRows: 2,
      body: [
          [{text:`Acreditado;  `,fontSize:9,colSpan: 2, border:[false,false,false,false],alignment:'right'},{},{text:'  '}],
          [{text:`Aval, Fiador u Obligado Solidario;  `,fontSize:9,colSpan: 2, border:[false,false,false,false],alignment:'right'},{},{text:(this.legal.is_aval)?'X':''}],
          [{text:`Garante;  `,fontSize:9,colSpan: 2, border:[false,false,false,false],alignment:'right'},{},{text:(this.legal.is_aval)?'':'X'}]
      ]
    }
  },
  {
      margin: [0, 0, 0, 0],
    table: {
      widths: [60,60,55,55,55,55,50,60],
      body: [
          [{text:`Nombre del Solicitante:`,style:'gene',colSpan:2,border:[false,false,false,false]},{},{text:`${this.legal.nombre} ${this.legal.apellido_paterno} ${this.legal.apellido_materno}`,colSpan:6,border:[false,false,false,true],fontSize:10},{},{},{},{},{}],
          [{text:`Fecha de constitución o nacimiento`,style:'gene',colSpan:3,border:[false,false,false,false]},{},{},{text:`(dd/mmm/aaaa);`, colSpan:2, fontSize:9,margin:[0,2,0,0],border:[false,false,false,false]},{},{text:this.legal.fecha_nacimiento,colSpan:3,border:[false,false,false,true],fontSize:10},{},{}],
          [{text:`R.F.C.:`,style:'gene',border:[false,false,false,false]},{text:this.legal.rfc.toUpperCase(),colSpan:3,border:[false,false,false,true],fontSize:10},{},{},{text:'CURP:',style:'gene',border:[false,false,false,false]},{text:this.legal.curp.toUpperCase(),colSpan:3,border:[false,false,false,true],fontSize:10},{},{}],
          [{text:`Domicilio`,style:'gene',border:[false,false,false,false]},{text:this.legal.domicilio_direccion,colSpan:7,border:[false,false,false,true],fontSize:10},{},{},{},{},{},{}],
          [{text:`Colonia`,style:'gene',border:[false,false,false,false]},{text:this.legal.domicilio_colonia,colSpan:7,border:[false,false,false,true],fontSize:10},{},{},{},{},{},{}],
          [{text:`Estado`,style:'gene',border:[false,false,false,false]},{text:this.legal.entidad, colSpan:2,border:[false,false,false,true],fontSize:10},{},{text:'Municipio',style:'gene',border:[false,false,false,false]},{text:this.legal.domicilio_municipio,colSpan:2,border:[false,false,false,true],fontSize:10},{},{text:'C.P.:',alignment: 'center',style:'gene',border:[false,false,false,false]},{text:this.legal.domicilio_cp,border:[false,false,false,true],fontSize:10}],
          [{text:`Teléfono:`,style:'gene',border:[false,false,false,false]},{text:this.legal.telefono,colSpan:3,border:[false,false,false,true],fontSize:10},{},{},{text:'',colSpan:4,border:[false,false,false,false]},{},{},{}],
          [{text:`Lugar y Fecha donde se firma la autorización:`,colSpan:4,style:'gene',border:[false,false,false,false]},{},{},{},{text:'',colSpan:4,border:[false,false,false,false]},{},{},{}],
          [{text:``,border:[false,false,false,false]},{text:`Avenida Isidro Fabela Norte 931, Colonia Los Ángeles; Toluca, México C.P. 50020,  ${this.Mipipe.transform(new Date(), 'dd/MM/yyyy')}`,alignment:'center',colSpan:7,border:[false,false,false,true],fontSize:10},{},{},{},{},{},{}],
          [{text:`Nombre del Funcionario que recaba la autorización:`,colSpan:5,style:'gene',border:[false,false,false,false]},{},{},{},{},{text:'',colSpan:3,border:[false,false,false,false]},{},{}],
          [{text:``,border:[false,false,false,false]},{text:`${this.auth.usuario.nombre.toUpperCase()} ${this.auth.usuario.apellidos.toUpperCase()}`,alignment:'center',colSpan:7,border:[false,false,false,true],fontSize:10},{},{},{},{},{},{}]
      ]
    }
  },
  {
      text:'Estoy consciente y acepto que este documento quede bajo custodia de Crédito Especializado al Campo, S.A. de C.V. SOFOM, E.N.R., y/o Sociedad de Información Crediticia consultada para efectos de control y cumplimiento del artículo 28 de la Ley para regular las Sociedades de Información Crediticia; mismo que señala que las Sociedades sólo podrán proporcionar información a un Usuario, cuando éste cuente con la autorización expresa del Cliente mediante su firma autógrafa.',alignment: 'justify', fontSize:9,margin:[0,20,0,20]
  },
  {
      margin: [0, 20, 0, 0],
    table: {
      widths: [60,60,55,55,55,55,50,60],
      body: [
          [{text:'',colSpan:2,border:[false,false,false,false]},{},{text:`${this.legal.nombre} ${this.legal.apellido_paterno} ${this.legal.apellido_materno}`,fontSize:10,colSpan:4,border:[false,false,false,true],alignment:'center'},{},{},{},{text:'',colSpan:2,border:[false,false,false,false]},{}],
          [{text:'',colSpan:3,border:[false,false,false,false]},{},{},{text:'Nombre y Firma',style:'gene', alignment:'center', colSpan:2,border:[false,false,false,false]},{},{text:'',colSpan:3,border:[false,false,false,false]},{},{}]
      ]
    }
  },
  {
      margin: [0, 30, 0, 15],
    table: {
      widths: [60,60,55,55,55,55,50,60],
      body: [
          [{text:'',border:[false,false,false,false]},{text:'Fecha de Consulta BC:',fillColor: '#a9d08e',fontSize:9,alignment: 'center',colSpan:2},{},{text:'',colSpan:4},{},{},{},{text:'',border:[false,false,false,false]}],
          [{text:'',border:[false,false,false,false]},{text:'Folio de Consulta BC:',fillColor: '#a9d08e',fontSize:9,alignment: 'center',colSpan:2},{},{text:'',colSpan:4},{},{},{},{text:'',border:[false,false,false,false]}]
      ]
    }
  },
  {
      text:'IMPORTANTE: Este formato  debe ser  llenado individualmente, para una sola persona física ó para una sola empresa. En caso de requerir el Historial crediticio del representante legal, favor de llenar un formato adicional.',alignment: 'center', headlineLevel: 1, fontSize:9,margin:[0,0,0,0]
  },
];
  for(let uno of this.aval){
    if(uno.tipo_persona=='Moral'){
      uno.curp='';
      uno.apellido_paterno='';
      uno.apellido_materno='';
      uno.fecha_nacimiento=uno.solicitante_fecha_constitucion;
    }
    conet.push({ text: `Carta Autorización para solicitar Reportes de Crédito`,pageBreak: 'before', style: 'titulo' });
    conet.push({ text: `Personas Físicas / Personas Morales.`, style: 'subtitulo' });
    conet.push({ text: `Por este conducto autorizo expresamente a  Crédito Especializado al Campo, S.A. de C.V.  SOFOM, E.N.R., PARA QUE POR CONDUCTO DE SUS FUNCIONARIOS FACULTADOS LLEVE A CABO Investigaciones, sobre mi comportamiento crediticio ó el de la Empresa que represento en Trans Union de México, S.A. SIC y/o Dun & bradstreet, S.A. SIC.`,style:'texto' });
    conet.push({ text: `Asimismo, declaro que conozco la naturaleza  y alcance de las sociedades de información crediticia y de la información contenida en los reportes de crédito y soporte de crédito especial; declaro que conozco la naturaleza y alcance de la información que se solicitará, del uso que  Crédito Especializado al Campo, S.A. de C.V.  SOFOM, E.N.R., hará de tal información y de que ésta podrá realizar consultas periódicas sobre mi historial ó el de la empresa que represento, consintiendo que esta autorización se encuentra vigente por un periodo de 3 años contados a partir de su expedición y en todo caso durante el tiempo que se mantenga la relación jurídica.`,style:'texto'});
    conet.push({ text: `En caso que la solicitante sea una Persona Moral, declaro bajo protesta de decir verdad Ser Representante Legal de la empresa mencionada en esta autorización; manifestando que a la fecha de firma de la presente autorización los poderes no me han sido revocados, limitados, ni modificados en forma alguna.`,style:'texto'});
    conet.push({ text: `Autorización para:`,fontSize:9, margin: [0, 5, 0, 4] });
    conet.push({
      margin: [0, 4, 0, 4],
      table: {
      widths: [130, 130, 60],
      headerRows: 2,
      body: [
          [{text:`Persona Fisica (PF):  `,fontSize:9,colSpan: 2, border:[false,false,false,false],alignment:'right'},{},{text:(uno.tipo_persona=='Fisica')?'X':'', alignment:'center',fontSize:10}],
          [{text:`Persona Fisica con Actividad Empresarial (PFAE):  `,fontSize:9,colSpan: 2, border:[false,false,false,false],alignment:'right'},{},{text:'  '}],
          [{text:`Persona Moral (PM):  `,fontSize:9,colSpan: 2, border:[false,false,false,false],alignment:'right'},{},{text:(uno.tipo_persona=='Moral')?'X':'', alignment:'center',fontSize:10}]
      ]
      }
      });
    conet.push({
      margin: [0, 4, 0, 10],
      table: {
      widths: [210, 210, 60],
      headerRows: 2,
      body: [
          [{text:`Acreditado;  `,fontSize:9,colSpan: 2, border:[false,false,false,false],alignment:'right'},{},{text:'  '}],
          [{text:`Aval, Fiador u Obligado Solidario;  `,fontSize:9,colSpan: 2, border:[false,false,false,false],alignment:'right'},{},{text:'X'}],
          [{text:`Garante;  `,fontSize:9,colSpan: 2, border:[false,false,false,false],alignment:'right'},{},{text:''}]
      ]
      }
      });
    conet.push({
      margin: [0, 0, 0, 0],
      table: {
      widths: [60,60,55,55,55,55,50,60],
      body: [
          [{text:`Nombre del Solicitante:`,style:'gene',colSpan:2,border:[false,false,false,false]},{},{text:`${uno.nombre.toUpperCase()} ${uno.apellido_paterno.toUpperCase()} ${uno.apellido_materno.toUpperCase()}`,colSpan:6,border:[false,false,false,true],fontSize:10},{},{},{},{},{}],
          [{text:`Fecha de constitución o nacimiento`,style:'gene',colSpan:3,border:[false,false,false,false]},{},{},{text:`(dd/mmm/aaaa);`, colSpan:2, fontSize:9,margin:[0,2,0,0],border:[false,false,false,false]},{},{text:uno.fecha_nacimiento,colSpan:3,border:[false,false,false,true],fontSize:10},{},{}],
          [{text:`R.F.C.:`,style:'gene',border:[false,false,false,false]},{text:uno.rfc.toUpperCase(),colSpan:3,border:[false,false,false,true],fontSize:10},{},{},{text:'CURP:',style:'gene',border:[false,false,false,false]},{text:uno.curp.toUpperCase(),colSpan:3,border:[false,false,false,true],fontSize:10},{},{}],
          [{text:`Domicilio`,style:'gene',border:[false,false,false,false]},{text:uno.domicilio_direccion.toUpperCase(),colSpan:7,border:[false,false,false,true],fontSize:10},{},{},{},{},{},{}],
          [{text:`Colonia`,style:'gene',border:[false,false,false,false]},{text:uno.domicilio_colonia.toUpperCase(),colSpan:7,border:[false,false,false,true],fontSize:10},{},{},{},{},{},{}],
          [{text:`Estado`,style:'gene',border:[false,false,false,false]},{text:uno.entidad.toUpperCase(), colSpan:2,border:[false,false,false,true],fontSize:10},{},{text:'Municipio',style:'gene',border:[false,false,false,false]},{text:uno.domicilio_municipio.toUpperCase(),colSpan:2,border:[false,false,false,true],fontSize:10},{},{text:'C.P.:',alignment: 'center',style:'gene',border:[false,false,false,false]},{text:uno.domicilio_cp,border:[false,false,false,true],fontSize:10}],
          [{text:`Teléfono:`,style:'gene',border:[false,false,false,false]},{text:uno.telefono,colSpan:3,border:[false,false,false,true],fontSize:10},{},{},{text:'',colSpan:4,border:[false,false,false,false]},{},{},{}],
          [{text:`Lugar y Fecha donde se firma la autorización:`,colSpan:4,style:'gene',border:[false,false,false,false]},{},{},{},{text:'',colSpan:4,border:[false,false,false,false]},{},{},{}],
          [{text:``,border:[false,false,false,false]},{text:`Avenida Isidro Fabela Norte 931, Colonia Los Ángeles; Toluca, México C.P. 50020,  ${this.Mipipe.transform(new Date(), 'dd/MM/yyyy')}`,alignment:'center',colSpan:7,border:[false,false,false,true],fontSize:10},{},{},{},{},{},{}],
          [{text:`Nombre del Funcionario que recaba la autorización:`,colSpan:5,style:'gene',border:[false,false,false,false]},{},{},{},{},{text:'',colSpan:3,border:[false,false,false,false]},{},{}],
          [{text:``,border:[false,false,false,false]},{text:`${this.auth.usuario.nombre.toUpperCase()} ${this.auth.usuario.apellidos.toUpperCase()}`,alignment:'center',colSpan:7,border:[false,false,false,true],fontSize:10},{},{},{},{},{},{}]
      ]
      }
      });
    conet.push({
      text:'Estoy consciente y acepto que este documento quede bajo custodia de Crédito Especializado al Campo, S.A. de C.V. SOFOM, E.N.R., y/o Sociedad de Información Crediticia consultada para efectos de control y cumplimiento del artículo 28 de la Ley para regular las Sociedades de Información Crediticia; mismo que señala que las Sociedades sólo podrán proporcionar información a un Usuario, cuando éste cuente con la autorización expresa del Cliente mediante su firma autógrafa.',alignment: 'justify', fontSize:9,margin:[0,20,0,20]
      });
    conet.push({
      margin: [0, 20, 0, 0],
      table: {
      widths: [60,60,55,55,55,55,50,60],
      body: [
          [{text:'',colSpan:2,border:[false,false,false,false]},{},{text:`${uno.nombre.toUpperCase()} ${uno.apellido_paterno.toUpperCase()} ${uno.apellido_materno.toUpperCase()}`,fontSize:10,colSpan:4,border:[false,false,false,true],alignment:'center'},{},{},{},{text:'',colSpan:2,border:[false,false,false,false]},{}],
          [{text:'',colSpan:3,border:[false,false,false,false]},{},{},{text:'Nombre y Firma',style:'gene', alignment:'center', colSpan:2,border:[false,false,false,false]},{},{text:'',colSpan:3,border:[false,false,false,false]},{},{}]
      ]
      }
      });
    conet.push({
      margin: [0, 30, 0, 15],
      table: {
      widths: [60,60,55,55,55,55,50,60],
      body: [
          [{text:'',border:[false,false,false,false]},{text:'Fecha de Consulta BC:',fillColor: '#a9d08e',fontSize:9,alignment: 'center',colSpan:2},{},{text:'',colSpan:4},{},{},{},{text:'',border:[false,false,false,false]}],
          [{text:'',border:[false,false,false,false]},{text:'Folio de Consulta BC:',fillColor: '#a9d08e',fontSize:9,alignment: 'center',colSpan:2},{},{text:'',colSpan:4},{},{},{},{text:'',border:[false,false,false,false]}]
      ]
      }
      });
    conet.push({
      text:'IMPORTANTE: Este formato  debe ser  llenado individualmente, para una sola persona física ó para una sola empresa. En caso de requerir el Historial crediticio del representante legal, favor de llenar un formato adicional.',alignment: 'center', headlineLevel: 1, fontSize:9,margin:[0,0,0,0]
      });
  }
    var dd:any = {
      content: conet,
      styles: this.misestilos
    };
    pdfMake.createPdf(dd).download('Formato SIC');
    // pdfMake.createPdf(dd).print();
  }
  async file(event: any) {
    this.myfile = event.target.files[0];
    if (this.myfile != null || this.myfile != undefined) {
      this.getBase64(this.myfile);
    }

  }
  getBase64(file: File) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
          this.sic = reader.result + '';
    };
    reader.onerror = (error) => {
    };
  }
  enviarsic() {
    if (this.sic == '') {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'debes cargar el archivo antes de enviarlo' });
      return;
    }
    if (this.local.solicitud_id == null || this.local.solicitud_id == 0){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Aun no ha iniciado una Solicitud ' });
      return;
    }
    this.local.show();
    this.post.cargarsic(this.local.solicitud_id,this.sic)
      .subscribe({
        next: (resp) => {
          this.local.hide();
          this.banderafn= false;
          if (resp.code == 202) {
			//@ts-ignore
			this.local.solicitud_id = resp.solicitud_id;
			if (this.salir) {
			  this.router.navigate(['/promotor/promotor/']);
			} else {
			  this.router.navigate(['/promotor/originacion/capacidad']);
			}
		  } else {
			this.messageService.add({ severity: 'error', summary: 'Error', detail: resp.message });
		  }
		},
		error: (e) => {
      this.banderafn= false;
		  this.local.hide();
		  this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Contacta al soporte de Cresca' });
		}
      });
  }
  guardasale() {
    this.salir= true;
    if(!this.banderafn){
      this.banderafn= true;
    }
    this.enviarsic();
    
    }
}
