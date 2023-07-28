import { Component, OnInit } from '@angular/core';
import { LocalService } from '../../services/local.service';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { PostService } from '../../services/post.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { RESTReportenufiData } from 'src/app/interfaces/nufi.interface';
import { formNufi } from 'src/app/interfaces/general.interface';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-sic',
  templateUrl: './sic.component.html',
  styleUrls: ['./sic.component.scss'],
  providers: [MessageService]

})
export class SicComponent implements OnInit {
  estatus_solicitud: number = 0;
  pdfObject: any;
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
  personaf: string='';
  personaM: string='';
  reporte_solicitante: RESTReportenufiData = {
    ReportId: '',
    Status: '',
    ScoreReporte: '',
    Company: null,
    Person: {
      Curp_Consulta: {
        status: '',
        message: '',
        data: null,
        code: 0
      },
      RFC_Consulta: {
        code: 0,
        status: '',
        message: '',
        data: null
      },
      RFC_Estatus: {
        status: '',
        code: '',
        message: '',
        data: null
      },
      CertificadoSat_Consulta: {
        status: '',
        code: 0,
        message: '',
        data: null
      },
      Siger_Consulta: {
        status: '',
        code: 0,
        message: '',
        count: 0,
        data: []
      },
      CedulaProfesional_Consulta: {
        status: '',
        code: 0,
        mensaje: '',
        data: []
      },
      ContribuyentesBoletinados69B_Consulta: {
        status: '',
        message: '',
        data: null,
        code: 0
      },
      AntecedentesJudiciales_PersonaFisicaNacional: {
        code: 0,
        status: '',
        message: '',
        data: {
          numero_resultados: 0,
          resultados: []
        }
      },
      Rug_GarantiasMobiliarias: null,
      ListasNegras_Internacionales: null,
      Ocr_Frente: null,
      Ocr_Reverso: null,
      ListaNominal_Consulta: null,
      Geolocalizacion: null,
      MultiBuro_ReportComplete: null,
      SeguridadSocial_ConsultarResponse: null,
      SeguridadSocial_HistorialResponse: null,
      Infonavit_Consulta: null,
      Enriquecimiento_Datos: null,
      AnalisisYPerfilamiento_Datos: null,
      Resultados_Google: null,
      Resultados_Noticias_Google: null
    }
  };
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
   reporte_id: ''
 };


  constructor(private local: LocalService,
			  private messageService: MessageService,
			  private router: Router,
			  private post: PostService) { }

  ngOnInit(): void {
	if (this.local.Cuestionario.length >= 1) {
		this.solicitante= this.local.formsolicitante;
    this.estatus_solicitud= this.local.estatus_solicitud;
		if(this.solicitante.tipo_persona=='Fisica'){
			this.personaf='X'
		}else{
			this.personaM='X'
		}
	}
  }
  descargarsic() {
    var dd:any = {
      content: [
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
				    [{text:`Persona Fisica (PF):  `,fontSize:9,colSpan: 2, border:[false,false,false,false],alignment:'right'},{},{text:this.personaf, alignment:'center',fontSize:10}],
				    [{text:`Persona Fisica con Actividad Empresarial (PFAE):  `,fontSize:9,colSpan: 2, border:[false,false,false,false],alignment:'right'},{},{text:'  '}],
				    [{text:`Persona Moral (PM):  `,fontSize:9,colSpan: 2, border:[false,false,false,false],alignment:'right'},{},{text:this.personaM, alignment:'center',fontSize:10}]
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
				    [{text:`Fecha de constitución o nacimiento`,style:'gene',colSpan:3,border:[false,false,false,false]},{},{},{text:'(dd/mmm/aaaa);', colSpan:2, fontSize:9,margin:[0,2,0,0],border:[false,false,false,false]},{},{text:this.reporte_solicitante.Person.Curp_Consulta.data?.curpdata[0].fechaNacimiento,colSpan:3,border:[false,false,false,true],fontSize:10},{},{}],
				    [{text:`R.F.C.:`,style:'gene',border:[false,false,false,false]},{text:this.reporte_solicitante.Person.RFC_Consulta.data?.rfc,colSpan:3,border:[false,false,false,true],fontSize:10},{},{},{text:'CURP:',style:'gene',border:[false,false,false,false]},{text:this.reporte_solicitante.Person.Curp_Consulta.data?.curpdata[0].curp,colSpan:3,border:[false,false,false,true],fontSize:10},{},{}],
				    [{text:`Domicilio`,style:'gene',border:[false,false,false,false]},{text:'',colSpan:7,border:[false,false,false,true]},{},{},{},{},{},{}],
				    [{text:`Colonia`,style:'gene',border:[false,false,false,false]},{text:'',colSpan:7,border:[false,false,false,true]},{},{},{},{},{},{}],
				    [{text:`Estado`,style:'gene',border:[false,false,false,false]},{text:'', colSpan:2,border:[false,false,false,true]},{},{text:'Municipio',style:'gene',border:[false,false,false,false]},{text:'',colSpan:2,border:[false,false,false,true]},{},{text:'C.P.:',alignment: 'center',style:'gene',border:[false,false,false,false]},{text:'',style:'gene',border:[false,false,false,true]}],
				    [{text:`Teléfono:`,style:'gene',border:[false,false,false,false]},{text:this.solicitante.telefono,colSpan:3,border:[false,false,false,true],fontSize:10},{},{},{text:'',colSpan:4,border:[false,false,false,false]},{},{},{}],
				    [{text:`Lugar y Fecha donde se firma la autorización:`,colSpan:4,style:'gene',border:[false,false,false,false]},{},{},{},{text:'',colSpan:4,border:[false,false,false,false]},{},{},{}],
				    [{text:``,border:[false,false,false,false]},{text:' ',colSpan:7,border:[false,false,false,true]},{},{},{},{},{},{}],
				    [{text:`Nombre del Funcionario que recaba la autorización:`,colSpan:5,style:'gene',border:[false,false,false,false]},{},{},{},{},{text:'',colSpan:3,border:[false,false,false,false]},{},{}],
				    [{text:``,border:[false,false,false,false]},{text:' ',colSpan:7,border:[false,false,false,true]},{},{},{},{},{},{}]
				]
			}
		},
		{
		    text:'Estoy consciente y acepto que este documento quede bajo custodia de Crédito Especializado al Campo, S.A. de C.V.  SOFOM, E.N.R., y/o Sociedad de Información Crediticia consultada para efectos de control y cumplimiento del artículo 28 de la Ley para regular las Sociedades de Información Crediticia; mismo que señala que las Sociedades sólo podrán proporcionar información a un Usuario, cuando éste cuente con la autorización expresa del Cliente mediante su firma autógrafa.',alignment: 'justify', fontSize:9,margin:[0,20,0,20]
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
		    text:'IMPORTANTE: Este formato  debe ser  llenado individualmente, para una sola persona física ó para una sola empresa. En caso de requerir el Historial crediticio del representante legal, favor de llenar un formato adicional.',alignment: 'center', fontSize:9,margin:[0,0,0,0]
		},
		
      ],
      styles: this.misestilos
    };
     pdfMake.createPdf(dd).download('SIC');
// pdfMake.createPdf(dd).open();
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
		  this.local.hide();
		  this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Contacta al soporte de Cresca' });
		}
      });
  }
  guardasale() {
    this.salir= true;
    this.enviarsic();
    }
}
