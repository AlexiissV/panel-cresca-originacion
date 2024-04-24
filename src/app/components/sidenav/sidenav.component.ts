import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component, Output, EventEmitter, OnInit, HostListener } from '@angular/core';
import { PromotorMenu, AdmindMenu } from '../../services/nav-data';
import { LocalService } from '../../services/local.service';
import { AuthService } from '../../services/auth.service';
import { PostService } from '../../services/post.service';
import { Message } from 'primeng/api';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({opacity: 0}),
        animate('350ms',
          style({opacity: 1})
        )
      ]),
      transition(':leave', [
        style({opacity: 1}),
        animate('350ms',
          style({opacity: 0})
        )
      ])
    ]),
    trigger('rotate', [
      transition(':enter', [
        animate('1000ms', 
          keyframes([
            style({transform: 'rotate(0deg)', offset: '0'}),
            style({transform: 'rotate(2turn)', offset: '1'})
          ])
        )
      ])
    ])
  ]
})
export class SidenavComponent implements OnInit {
  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = false;
  screenWidth = 0;
  desc: string='';
  navData: any;
  bandera: boolean=false;
  messages: Message[] =[];
  myfile: File | undefined;
  filebase64: string='';


  constructor(public local: LocalService, public auth: AuthService,private post: PostService){
    if(auth.usuario.perfil == 10){
      this.navData= AdmindMenu;
    }else{
      this.navData= PromotorMenu;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if(this.screenWidth <= 768 ) {
      this.collapsed = false;
      this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
    }
  }

  ngOnInit(): void {
      this.screenWidth = window.innerWidth;
      if(this.local.barra==true){
        setTimeout(() => {
          this.toggleCollapse();
        }, 100);
      }
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }

  closeSidenav(): void {
    this.collapsed = false;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }
  newticket() {
    this.bandera=true;
    this.messages=[{ severity: 'warn', summary: 'Sugerencia', detail: 'Por favor escribe de forma detallada el tipo de problema que se te está presentando y adjunta una screenshot del mismo.' }];
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
          this.filebase64 = reader.result + '';
    };
    reader.onerror = (error) => {
    };
  }

  enviarreporte() {
    this.local.show();
    this.post.enviarticket(this.filebase64,this.desc).subscribe(
      {
        next:(resp)=>{
          this.local.hide();
          if(resp.code==202){
            this.messages=[{ severity: 'warn', summary: 'Sugerencia', detail: 'Por favor escribe de forma detallada el tipo de problema que se te está presentando y adjunta una screenshot del mismo.' },
            { severity: 'success', summary: 'correcto', detail: resp.message}];
            this.bandera=false;
          }else{
            this.messages=[{ severity: 'warn', summary: 'Sugerencia', detail: 'Por favor escribe de forma detallada el tipo de problema que se te está presentando y adjunta una screenshot del mismo.' },
            { severity: 'error', summary: 'error', detail: resp.message}];
          }
        },
        error:()=>{
          this.local.hide();
        }
      }
    );
    }
}
