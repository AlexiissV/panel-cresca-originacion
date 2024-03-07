import { Component } from '@angular/core';
import { LocalService } from '../../services/local.service';
import { TablaAmortizacion } from 'src/app/interfaces/productof.interface';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { SimularService } from '../../services/simular.service';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-corrida',
  templateUrl: './corrida.component.html',
  styleUrls: ['./corrida.component.scss']
})
export class CorridaComponent {
  tabla: TablaAmortizacion[] = [];
  estatus_solicitud: number = 0;
  pdfObject: any;
  productos: string='';
  T_precioventa: number = 0;
  T_comisionxap: number = 0;
  T_gastoscontratacion: number = 0;
  T_seguro: number = 0;
  T_enganche: number = 0;
  T_pagoinicial: number = 0;
  misestilos: any = {
    tableExample: {
      margin: [0, 0, 0, 0],
      alignment: 'center',
      border: [true, true, true, true]
    },
    tableHeader: {
      bold: true,
      fontSize: 10,
      color: 'white',
      fillColor: this.local.empresa.empresa_color,
    },
    header: {
      bold: true,
      fontSize: 13,
      alignment: 'center',
      color: 'black',
      italics: true,
      margin: [0, 10, 0, 10]
    },
    encabezado: {
      fillColor: this.local.empresa.empresa_color,
      color: 'white',
      fontSize: 10,
      alignment: 'center',
      bold: true,
    },
    items: {
      color: 'black',
      alignment: 'right',
      fillColor: '#eeeeee',
      fontSize: 10,
      bold: true,
    },
    itemsfull: {
      color: 'black',
      fillColor: '#eeeeee',
      fontSize: 10,
      bold: true,
    },
    resp: {
      color: 'black',
      alignment: 'right',
      fillColor: '#cccccc',
      fontSize: 10,
      bold: true,
    }
  }
  formatdinero = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN'
  });



  constructor(private simular: SimularService, private local: LocalService) {
  }
  ngOnInit(): void {
    this.tabla = this.simular.tabla_amortizacion;
    this.tabla.forEach(uno =>{
      uno.saldo_inicial=Math.round(uno.saldo_inicial);
      uno.pago_interes=Math.round(uno.pago_interes);
      uno.iva_interes=Math.round(uno.iva_interes);
      uno.pago_capital=Math.round(uno.pago_capital);
      uno.seguro= Math.round(uno.seguro);
      uno.monto_pago=Math.round(uno.monto_pago);
    });
    this.simular.bindings.forEach((item)=>{
      this.productos+=item.nombre+', ';
    });
    this.simular.equipos.forEach((item)=>{
      this.T_pagoinicial+=item['pago_inicial'];
      this.T_precioventa+=item['precio_venta'];
      this.T_comisionxap+=item['comision_apertura'];
      this.T_gastoscontratacion+=item['seguro_equipo'];
      this.T_enganche+=item['aportacion_producto_valor'];
    });
  }
  async imprimir() {
    if (this.tabla.length == 0) {
      return;
    }
    let pdfin: any[] = [];
    pdfin.push([
      { text: 'No. pago', style: 'tableHeader' },
      { text: 'Fecha Inicial', style: 'tableHeader' },
      { text: 'Fecha Final', style: 'tableHeader' },
      { text: 'Días', style: 'tableHeader' },
      { text: 'Saldo Insoluto', style: 'tableHeader' },
      { text: 'Interés', style: 'tableHeader' },
      { text: 'Iva Interés', style: 'tableHeader' },
      { text: 'Seguro', style: 'tableHeader' },
      { text: 'Capital', style: 'tableHeader' },
      { text: 'Monto Pago', style: 'tableHeader' }
    ]);
    let conta = 0;
    for (let uno of this.tabla) {
      let solo: any[] = [];
      conta++;
      if (conta == this.tabla.length) {
        solo.push({ text: uno.num_pago + '', border: [true, false, true, true], fontSize: 8, });
        solo.push({ text: uno.fecha_inicial, border: [true, false, true, true], fontSize: 8, });
        solo.push({ text: uno.fecha_fin, border: [true, false, true, true], fontSize: 8, });
        solo.push({ text: uno.plazo_dias + '', border: [true, false, true, true], fontSize: 8, });
        solo.push({ text: this.formatdinero.format(uno.saldo_inicial), border: [true, false, true, true], fontSize: 8, });
        solo.push({ text: this.formatdinero.format(uno.pago_interes), border: [true, false, true, true], fontSize: 8, });
        solo.push({ text: this.formatdinero.format(uno.iva_interes), border: [true, false, true, true], fontSize: 8, });
        solo.push({ text: this.formatdinero.format(uno.seguro), border: [true, false, true, true], fontSize: 8, });
        solo.push({ text: this.formatdinero.format(uno.pago_capital), border: [true, false, true, true], fontSize: 8, });
        solo.push({ text: this.formatdinero.format(uno.monto_pago), border: [true, false, true, true], fontSize: 8, });
        pdfin.push(solo);
      } else {
        solo.push({ text: uno.num_pago + '', border: [true, false, true, false], fontSize: 8, });
        solo.push({ text: uno.fecha_inicial, border: [true, false, true, false], fontSize: 8, });
        solo.push({ text: uno.fecha_fin, border: [true, false, true, false], fontSize: 8, });
        solo.push({ text: uno.plazo_dias + '', border: [true, false, true, false], fontSize: 8, });
        solo.push({ text: this.formatdinero.format(uno.saldo_inicial), border: [true, false, true, false], fontSize: 8, });
        solo.push({ text: this.formatdinero.format(uno.pago_interes), border: [true, false, true, false], fontSize: 8, });
        solo.push({ text: this.formatdinero.format(uno.iva_interes), border: [true, false, true, false], fontSize: 8, });
        solo.push({ text: this.formatdinero.format(uno.seguro), border: [true, false, true, false], fontSize: 8, });
        solo.push({ text: this.formatdinero.format(uno.pago_capital), border: [true, false, true, false], fontSize: 8, });
        solo.push({ text: this.formatdinero.format(uno.monto_pago), border: [true, false, true, false], fontSize: 8, });
        pdfin.push(solo);
      }
    }
    let docDefinition: any = {
      pageSize: 'LETTER',
      pageMargins: [15, 20, 15, 20],
      content: [
        {
          text: 'TABLA DE AMORTIZACIÓN',
          style: 'header'
        },
        {
          margin: [0, 0, 0, 30],
          table: {
            widths: ['*', '*', '*', '*', '*'],
            headerRows: 1,
            body: [
              [{ image: this.local.logo_files, width: 100, alignment: 'center', rowSpan: 15, margin: [0, 90, 0, 0] }, { text: 'Resumen del Préstamo', colSpan: 3, style: 'encabezado' }, {}, {}, { image: this.local.empresa.empresa_logo_base64, width: 100, alignment: 'center', rowSpan: 15, margin: [0, 70, 0, 0] }],
              [{}, { text: 'Descripción: '+this.productos, colSpan: 3, style: 'itemsfull' }, {}, {}, {}],
              [{}, { text: 'Precio de Venta', colSpan: 2, style: 'items' }, {}, { text: this.formatdinero.format(this.T_precioventa), style: 'resp' }, {}],
              [{}, { text: 'Comisión x Apertura', colSpan: 2, style: 'items' }, {}, { text: this.formatdinero.format(this.T_comisionxap), style: 'resp' }, {}],
              [{}, { text: 'Gastos de Originación', colSpan: 2, style: 'items' }, {}, { text: this.formatdinero.format(this.T_gastoscontratacion), style: 'resp' }, {}],
              [{}, { text: 'Seguro', colSpan: 2, style: 'items' }, {}, { text: this.formatdinero.format(this.tabla[0].seguro), style: 'resp' }, {}],
              [{}, { text: 'Enganche', colSpan: 2, style: 'items' }, {}, { text: this.formatdinero.format(this.T_enganche), style: 'resp' }, {}],
              [{}, { text: 'Pago Inicial', colSpan: 2, style: 'items' }, {}, { text: this.formatdinero.format(this.T_pagoinicial), style: 'resp' }, {}],
              [{}, { text: 'Importe del Préstamo', colSpan: 2, style: 'items' }, {}, { text: this.formatdinero.format(Math.round(this.simular.terminos_credito['importe_credito'])), style: 'resp' }, {}],
              [{}, { text: 'Periodo del Préstamo en Meses', colSpan: 2, style: 'items' }, {}, { text: this.simular.terminos_credito['plazo_credito'], style: 'resp' }, {}],
              [{}, { text: 'Tasa de Interés Anual', colSpan: 2, style: 'items' }, {}, { text: this.simular.terminos_credito['taza_fija_anual'] + '%', style: 'resp' }, {}],
              [{}, { text: 'Fecha de Inicio del Préstamo', colSpan: 2, style: 'items' }, {}, { text: this.tabla[0].fecha_inicial, style: 'resp' }, {}],
              [{}, { text: 'Fecha Estimada Otorgamiento del Crédito', colSpan: 2, style: 'items' }, {}, { text: this.simular.terminos_credito['fecha_estimada_otorgamiento'], style: 'resp' }, {}],
              [{}, { text: 'Numero de Pagos', colSpan: 2, style: 'items' }, {}, { text: this.tabla.length, style: 'resp' }, {}],
              [{}, { text: 'Forma de Pago', colSpan: 2, style: 'items' }, {}, { text: this.simular.terminos_credito['forma_pago_capital'], style: 'resp' }, {}]
            ]
          }
        },
        {
          style: 'tableExample',
          table: {
            widths: [25, 55, 55, 25, 55, 55 , 55 , 55 , 55 ,55],
            headerRows: 1,
            body: pdfin
          }
        },
      ],
      //@ts-ignore
      pageBreakBefore: function (currentNode, followingNodesOnPage, nodesOnNextPage, previousNodesOnPage) {
        return currentNode.headlineLevel === 1 && followingNodesOnPage.length === 0;
      },
      styles: this.misestilos,
    };
      pdfMake.createPdf(docDefinition).download('Tabla de Amortización');
      // pdfMake.createPdf(docDefinition).open();
  }

}