import { Component, Input } from '@angular/core';
import { RESTReportenufiData } from 'src/app/interfaces/nufi.interface';

@Component({
  selector: 'app-reportenufi',
  templateUrl: './reportenufi.component.html',
  styleUrls: ['./reportenufi.component.scss']
})
export class ReportenufiComponent {
 @Input() reporte:RESTReportenufiData= {
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

  recargarReporte() {
    }
}
