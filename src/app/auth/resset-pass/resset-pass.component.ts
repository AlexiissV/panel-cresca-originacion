import { AfterViewInit, Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { LocalService } from 'src/app/services/local.service';
import { NufiService } from '../../services/nufi.service';

@Component({
  selector: 'app-resset-pass',
  templateUrl: './resset-pass.component.html',
  styleUrls: ['./resset-pass.component.scss'],
  providers:[MessageService]
})
export class RessetPassComponent {

  loginreset: FormGroup;
  email: AbstractControl;

  constructor(private formBuilder: FormBuilder,
    private post: AuthService,
    private nufi: NufiService,
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
