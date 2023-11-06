import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../services/post.service';
import { LocalService } from '../../services/local.service';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../services/auth.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  email: AbstractControl;
  password: AbstractControl;
  bandera: boolean=false;

  constructor(private formBuilder: FormBuilder,
    private titulo: Title,
    private active: ActivatedRoute,
    public local: LocalService,
    private auth: AuthService,
    private messageService: MessageService,
    private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')
        ],
      ],
      password: [
        '',
        [
          Validators.required,
        ],
      ],
      token_empresa: [
        '',
      ]
    });
    this.email = this.loginForm.controls['email'];
    this.password = this.loginForm.controls['password'];
  }
  async ngOnInit(): Promise<void> {
    await this.local.show();
    let token = this.active.snapshot.paramMap.get('token_empresa') + ''
    await this.auth.getInfo(token).subscribe(async (resp) => {
      await this.local.hide();
      this.local.empresa = resp;
      this.titulo.setTitle(resp.empresa_nombre);
      this.local.empresa.token = token;
      await localStorage.setItem('empresa', JSON.stringify(resp));
      // --color-principal: #003f5a;
      document.documentElement.style.setProperty('--color-principal', resp.empresa_color);
    }, async (e) => {
      await this.local.hide();
    });
  }

  async onLogin() {
    if (this.loginForm.invalid) {
      this.loginForm.controls['email'].markAllAsTouched();
      this.loginForm.controls['password'].markAllAsTouched();
      return;
    }
    if(this.bandera){
      return;
    }
    this.bandera=true;
    this.loginForm.controls['token_empresa'].setValue(this.local.empresa.token);
    await this.local.show();
    this.auth.login(this.loginForm.value)
      .subscribe({
        next: async (resp) => {
          await this.local.hide();
          this.bandera=false;
          if (resp.code == 202) {
            this.messageService.add({ severity: 'success', summary: 'Correcto', detail: 'Bienvenido ' + resp.data.nombre });
            this.auth.usuario = resp.data;
            await localStorage.setItem('usuario', JSON.stringify(resp.data));
            setTimeout(() => {
              if (resp.data.perfil == 20 || 30) {
                this.router.navigate(['/promotor']);
              } else {
                this.router.navigate(['/admin']);
              }
            }, 900);

          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: resp.message });

          }
        },
        error: async (e) => {
          await this.local.hide();
          this.bandera=false;
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Contacta al soporte de Cresca' });
        }
      });
  }

}
