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



  constructor(private local: LocalService) {
  }
  ngOnInit(): void {
    this.tabla = this.local.tabla_amortizacion;
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
          text: 'TABLA DE AMORTIZACIÓN',
          style: 'header'
        },
        {
          margin: [0, 30, 0, 30],
          table: {
            widths: [100, 100, 100],
            headerRows: 2,
            body: [
              [{ text: 'Resumen del Préstamo', colSpan: 3, style: 'encabezado' }, {}, {}],
              [{ text: 'Importe del Préstamo', colSpan: 2, style: 'items' }, {}, { text: this.formatdinero.format(this.local.terminos_credito['importe_credito']), style: 'resp' }],
              [{ text: 'Periodo del Préstamo en Meses', colSpan: 2, style: 'items' }, {}, { text: this.local.terminos_credito['plazo_credito'], style: 'resp' }],
              [{ text: 'Tasa de Interés Anual', colSpan: 2, style: 'items' }, {}, { text: this.local.terminos_credito['taza_fija_anual'] + '%', style: 'resp' }],
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