import { Component, OnInit } from '@angular/core';
import { LocalService } from '../../services/local.service';
import { arraydocs } from '../../interfaces/general.interface';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { SolicitudService } from '../../services/solicitud.service';
import { tipofile } from '../../interfaces/productof.interface';

@Component({
  selector: 'app-documentacion',
  templateUrl: './documentacion.component.html',
  styleUrls: ['./documentacion.component.scss'],
  providers: [MessageService]
})

export class DocumentacionComponent implements OnInit {
  doc_general: arraydocs[] = [];
  doc_finaciero: arraydocs[] = [];
  estatus_solicitud:number = 0;
  //@ts-ignore
  myfile: File;
  salir: boolean = false;
  //@ts-ignore
  apply_envio: number = null;

  constructor(private local: LocalService,
    private messageService: MessageService,
    private post: SolicitudService,
    private router: Router,
    private auth: AuthService) {
  }
  ngOnInit(): void {
    if (this.local.doc_general != undefined && this.local.doc_general.length >= 1) {
      this.doc_general = this.local.doc_general.map(item => ({ ...item, file_base64: '' }));
    }
    if (this.local.doc_finaciero != undefined && this.local.doc_finaciero.length >= 1) {
      this.doc_finaciero = this.local.doc_finaciero.map(item => ({ ...item, file_base64: '' }));
    }
    this.estatus_solicitud=this.local.estatus_solicitud;
  }

  async file(event: any, i: number, array: number) {
    if(event.target.files[0].type!='application/pdf'){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'el formato del archivo debe ser un PDF' });
      return;
    }
    this.myfile = event.target.files[0];
    if (this.myfile != null || this.myfile != undefined) {
      this.getBase64(this.myfile, i, array);
    }

  }
  getBase64(file: File, i: number, array: number) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      if (array == 10) {
        this.doc_general[i].file_base64 = reader.result + '';
      } else {
        this.doc_finaciero[i].file_base64 = reader.result + '';
      }
      if (this.local.solicitud_id == null || this.local.solicitud_id == 0){
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Aun no ha iniciado una Solicitud ' });
        return;
      }
    this.cargardocone(i,array);
    };
    reader.onerror = (error) => {
    };
  }
  cargardocone(i: number, array: number) {
    this.local.show();
    let file: tipofile={
      file_id: 0,
      file_base64: ''
    };
    if (array == 10) {
      file.file_base64 = this.doc_general[i].file_base64||'';
      file.file_id= this.doc_general[i].documento_id;
    } else {
      file.file_base64 = this.doc_finaciero[i].file_base64||'';
      file.file_id= this.doc_finaciero[i].documento_id;
    }
    this.post.enviaronedoc(this.local.solicitud_id,file).subscribe({
      next:(resp)=>{
        this.local.hide();
        if(resp.code==202){
          if (array == 10) {
            this.doc_general[i].file_url=resp.file||'';
          } else {
            this.doc_finaciero[i].file_url=resp.file||'';
          }
        }
      },error:()=>{
        this.local.hide();
      }
    });
  }
  guardar() {
    let final: arraydocs[] = [];
    final.push(...this.doc_general);
    final.push(...this.doc_finaciero);
    let bandera: boolean = false;
    for (let uno of final) {
      if (uno.file_url == null || uno.file_url == '') {
        bandera = true;
      }
    }
    if (bandera) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No a Cargado los documentos Necesarios' });
      return;
    }
    if (this.local.solicitud_id == null || this.local.solicitud_id == 0){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Aun no ha iniciado una Solicitud ' });
      return;
    }
    this.local.show();
    if (this.salir == false) {
      this.apply_envio = 10;
    }
    this.post.guardarsolicitud({ token: this.auth.usuario.token, seccion: 50, files: null, solicitud_id: this.local.solicitud_id, apply_envio: this.apply_envio }).subscribe({
      next: (resp) => {
        this.local.hide();
        if (resp.code == 202) {
          this.router.navigateByUrl('/promotor');
          setTimeout(() => {
          location.reload();
          }, 700);
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
  remplazar(i: number, array: number) {
    if (array == 10) {
      this.doc_general[i].remplace = 10;
      this.doc_general[i].create = 1;
      this.doc_general[i].file_url = null;
    } else {
      this.doc_finaciero[i].remplace = 10;
      this.doc_finaciero[i].create = 1;
      this.doc_finaciero[i].file_url = null;
    }
  }
  guardasale() {
    this.salir = true;
    //@ts-ignore
    this.apply_envio = null;
    this.guardar();
  }
}
