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
  misestilos: any = {
    tableExample: {
      margin: [0, 0, 0, 0],
      alignment: 'center'
    },
    tableHeader: {
      bold: true,
      fontSize: 14,
      color: 'white',
      fillColor: this.local.empresa.empresa_color,
    },
    header: {
      bold: true,
      fontSize: 18,
      alignment: 'center',
      color: 'black',
      italics: true,
      margin: [0, 10, 0, 10]
    },
    encabezado: {
      fillColor: this.local.empresa.empresa_color,
      color: 'white',
      fontSize: 15,
      alignment: 'center',
      bold: true,
      margin: [0, 5, 0, 5]
    },
    items: {
      color: 'black',
      alignment: 'right',
      fillColor: '#eeeeee',
      bold: true,
      margin: [0, 5, 5, 5]
    },
    resp: {
      color: 'black',
      alignment: 'left',
      fillColor: '#cccccc',
      bold: true,
      margin: [5, 5, 0, 5]
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
      uno.pago_capital=Math.round(uno.pago_capital);
      uno.monto_pago=Math.round(uno.monto_pago);
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
      { text: 'Deuda Inicial', style: 'tableHeader' },
      { text: 'Intereses', style: 'tableHeader' },
      { text: 'Capital', style: 'tableHeader' },
      { text: 'Monto Pago', style: 'tableHeader' }
    ]);

    for (let uno of this.tabla) {
      let solo: string[] = [];
      solo.push(uno.num_pago + '');
      solo.push(uno.fecha_inicial);
      solo.push(uno.fecha_fin);
      solo.push(uno.plazo_dias + '');
      solo.push(this.formatdinero.format(uno.saldo_inicial));
      solo.push(this.formatdinero.format(uno.pago_interes));
      solo.push(this.formatdinero.format(uno.pago_capital));
      solo.push(this.formatdinero.format(uno.monto_pago));
      pdfin.push(solo);
    }
    let docDefinition: any = {
      pageSize: 'LETTER',
      pageMargins: [15, 20, 15, 20],
      content: [
        {
          table: {
              widths: ['*', 200,'*'],
            body: [
              [{
                                image:'data:image/png;base64,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',
              width:100
              },
              {
                  text: 'TABLA DE AMORTIZACIÓN',
                  style: 'header'
              },
              {
                image:this.local.empresa.empresa_logo_base64, width:100, alignment:'right'
              }],
            ]
          },
            layout: 'noBorders'
        },
        {
          margin: [0, 30, 0, 30],
          table: {
            widths: [100, 100, 100],
            headerRows: 2,
            body: [
              [{ text: 'Resumen del Préstamo', colSpan: 3, style: 'encabezado' }, {}, {}],
              [{ text: 'Importe del Préstamo', colSpan: 2, style: 'items' }, {}, { text: this.formatdinero.format(Math.round(this.simular.terminos_credito['importe_credito'])), style: 'resp' }],
              [{ text: 'Periodo del Préstamo en Meses', colSpan: 2, style: 'items' }, {}, { text: this.simular.terminos_credito['plazo_credito'], style: 'resp' }],
              [{ text: 'Tasa de Interés Anual', colSpan: 2, style: 'items' }, {}, { text: this.simular.terminos_credito['taza_fija_anual'] + '%', style: 'resp' }],
              [{ text: 'Fecha de Inicio del Préstamo', colSpan: 2, style: 'items' }, {}, { text: this.tabla[0].fecha_inicial, style: 'resp' }],
              [{ text: 'Numero de Pagos', colSpan: 2, style: 'items' }, {}, { text: this.tabla.length, style: 'resp' }],
            ]
          }
        },
        {
          style: 'tableExample',
          table: {
            headerRows: 1,
            body: pdfin
          },
          layout: {
            //@ts-ignore
            fillColor: function (rowIndex, node, columnIndex) {
              return (rowIndex % 2 === 0) ? '#CCCCCC' : null;
            }
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
  }

}