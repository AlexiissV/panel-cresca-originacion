import { Component, OnInit } from '@angular/core';
import { LocalService } from '../../services/local.service';
import { TablaAmortizacion } from 'src/app/interfaces/productof.interface';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-simulador',
  templateUrl: './simulador.component.html',
  styleUrls: ['./simulador.component.scss']
})
export class SimuladorComponent implements OnInit {
  tabla: TablaAmortizacion[] = [];
  estatus_solicitud: number = 0;
  pdfObject: any;
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



  constructor(private local: LocalService) {
  }
  ngOnInit(): void {
    this.tabla = this.local.tabla_amortizacion;
      this.tabla.forEach(uno => {
      uno.saldo_inicial = Math.round(uno.saldo_inicial);
      uno.pago_interes = Math.round(uno.pago_interes);
      uno.iva_interes = Math.round(uno.iva_interes);
      uno.pago_capital = Math.round(uno.pago_capital);
      uno.monto_pago = Math.round(uno.monto_pago);
      uno.seguro = Math.round(uno.seguro);
    });
    this.estatus_solicitud = this.local.estatus_solicitud;
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
      pageMargins: [15, 30, 15, 20],
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
              [{ image: this.local.logo_files, width: 100, alignment: 'center', rowSpan: 8, margin: [0, 40, 0, 0] }, { text: 'Resumen del Préstamo', colSpan: 3, style: 'encabezado' }, {}, {}, { image: this.local.empresa.empresa_logo_base64, width: 100, alignment: 'center', rowSpan: 8, margin: [0, 20, 0, 0] }],
              [{}, { text: 'Importe del Préstamo', colSpan: 2, style: 'items' }, {}, { text: this.formatdinero.format(Math.round(this.local.terminos_credito['importe_credito'])), style: 'resp' }, {}],
              [{}, { text: 'Periodo del Préstamo en Meses', colSpan: 2, style: 'items' }, {}, { text: this.local.terminos_credito['plazo_credito'], style: 'resp' }, {}],
              // [{}, { text: 'Pago Inicial', colSpan: 2, style: 'items' }, {}, { text: this.formatdinero.format(this.tabla[0].monto_pago), style: 'resp' }, {}],
              [{}, { text: 'Tasa de Interés Anual', colSpan: 2, style: 'items' }, {}, { text: this.local.terminos_credito['taza_fija_anual'] + '%', style: 'resp' }, {}],
              [{}, { text: 'Fecha de Inicio del Préstamo', colSpan: 2, style: 'items' }, {}, { text: this.tabla[0].fecha_inicial, style: 'resp' }, {}],
              [{}, { text: 'Fecha Estimada Otorgamiento del Crédito', colSpan: 2, style: 'items' }, {}, { text: this.local.terminos_credito['fecha_estimada_otorgamiento'], style: 'resp' }, {}],
              [{}, { text: 'Numero de Pagos', colSpan: 2, style: 'items' }, {}, { text: this.tabla.length, style: 'resp' }, {}],
              [{}, { text: 'Forma de Pago', colSpan: 2, style: 'items' }, {}, { text: this.local.terminos_credito['forma_pago_capital'], style: 'resp' }, {}]
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