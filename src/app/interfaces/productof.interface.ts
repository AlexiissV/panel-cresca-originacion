   // Generated by https://quicktype.io

import { arraydocs } from "./general.interface";

export interface restProductofinanciero {
    code:                  number;
    name:                  string;
    "producto-financiero": ProductoFinanciero[];
    type:                  string;
}

export interface ProductoFinanciero {
    id:             number;
    nombre:         string;
    tasa_porcentual: number | null;
    documentos:     arraydocs[]
    secciones:      Seccione[];
}

export interface Seccione {
    seccion_key:  number;
    seccion_text: string;
    groups:       Group[];
}

export interface Group {
    id:    number;
    label: string;
    items: Item[];
}

export interface Item {
    id:             number;
    label:          string;
    formato:        number;
    formato_text:   string;
    tipo_dato:      number;
    tipo_dato_text: string;
    formula:        string;
    nota:           string;
    value_register?:        string;
    select?:        ItemsList;
    items_list?:    ItemsList[];
    apply_required: number;
    apply_calculo:  number;
    apply_captura:  number;
    default_value:  null | string;
}
export interface ItemsList {
    id:   number;
    text: string;
}

export interface RestSimulador {
    code:               number;
    name:               string;
    message:            string;
    solicitud_id:       string;
    tabla_amortizacion: TablaAmortizacion[];
    type:               string;
}

export interface TablaAmortizacion {
    num_pago:      number;
    saldo_inicial: number;
    pago_capital:  number;
    pago_interes:  number;
    iva_interes:   number;
    monto_pago:    number;
    plazo_dias:    number;
    seguro:        number;
    saldo_final:   number;
    fecha_inicial: string;
    fecha_fin:     string;
}


// Generated by https://quicktype.io

export interface Restdocuments {
    code:     number;
    name:     string;
    message?: string;
    contrato: string;
    pagare:   string;
    type:     string;
}

// Generated by https://quicktype.io

export interface Restvisitaverificacion {
    code:   number;
    name:   string;
    visita: Visita[];
    type:   string;
}

export interface Visita {
    id:              number;
    solicitud:       string;
    solicitante:       string;
    producto:        string;
    marca:           string;
    modelo:          string;
    serie:           string;
    visita_status:   string;
    visita_asignado: string;
}


// Generated by https://quicktype.io

export interface Restproveedor {
    code:        number;
    name:        string;
    proveedores: Proveedore[];
    type:        string;
}

export interface Proveedore {
    id:           number;
    nombre:       string;
    rfc:          string;
    razon_social: string;
}
