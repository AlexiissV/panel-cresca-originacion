import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { LocalService } from 'src/app/services/local.service';

@Component({
  selector: 'app-resset-pass',
  templateUrl: './resset-pass.component.html',
  styleUrls: ['./resset-pass.component.scss'],
  providers:[MessageService]
})
export class RessetPassComponent implements AfterViewInit {
  //@ts-ignore
  @ViewChild('bg_overlay8', {static: false}) fondo: ElementRef;
  loginreset: FormGroup;
  email: AbstractControl;

  constructor(private formBuilder: FormBuilder,
    private post: AuthService,
    private messageservice: MessageService,
    private router: Router,
    public local: LocalService) {
    this.loginreset = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')
        ],
      ]
    });
    this.email = this.loginreset.controls['email'];
  }
  ngAfterViewInit(): void {
    if(this.local.empresa.empresa_banner){
      this.fondo.nativeElement.style.setProperty('background-image', `url(${this.local.empresa.empresa_banner})`);
    }else{
      this.fondo.nativeElement.style.setProperty('background-image', `url(/assets/img/bg-home.jpeg)`);
    }
  }
  regreso() {
    this.router.navigate(['/auth/sign-in',this.local.empresa.token]);
  }
  onLogin() {
    if (this.loginreset.invalid) {
      this.loginreset.controls['email'].markAllAsTouched();
      return;
    }
    this.local.show();
    this.post.resetpass(this.loginreset.value).subscribe(
      {
        next: (resp) => {
          console.log(resp); 
          this.local.hide();
          if (resp.code == 202) {
            this.messageservice.add({ severity: 'success', summary: 'Correcto', detail: resp.message });
          } else {
            this.messageservice.add({ severity: 'error', summary: 'Aviso', detail: resp.message });
          }
        },
        error: (e) => {
          this.local.hide();
          this.messageservice.add({ severity: 'error', summary: 'Aviso', detail: 'No pudimos validar tu información, contacta a soporte' });
        }
      }
    );
  }
}
