import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/services/user/user.service';
import { SignupUserRequest } from 'src/models/interfaces/user/SignupUserRequest';
import { AuthRequest } from 'src/models/interfaces/user/auth/AuthRequest';
//import { SignupUserResponse } from 'src/models/interfaces/user/SignupUserResponse';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  loginCard = true;

  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  signupForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  })

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private cookieService: CookieService,
    private messageServie: MessageService
    ){}

  onSubmitLoginForm(): void{
    if (this.loginForm.value && this.loginForm.valid) {
      this.userService.authUser(this.loginForm.value as AuthRequest)
      .subscribe({
        next: (response) => {
          if (response) {
            this.cookieService.set('USER_INFO', response?.token);
            this.loginForm.reset();

            this.messageServie.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: `Bem vindo de volta ${response?.name}!`,
              life: 2500,
            });
          }
        },
        error: (err) => {

          this.messageServie.add({
            severity: 'error',
            summary: 'Erro',
            detail: `Erro ao fazer login!`,
            life: 2000,
          });

          console.log(err)
        },
      })
    }
  }

  onSubmitSignupForm(): void{
    if (this.signupForm.value && this.signupForm.valid) {
      this.userService.signupUser(this.signupForm.value as SignupUserRequest)
      .subscribe({
        next: (response) => {
          if (response) {

            this.signupForm.reset();
            this.loginCard = true;

            this.messageServie.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: `Usuário criado com sucesso!`,
              life: 2000,
            });
          }
        },
        error: (err) => {
          this.messageServie.add({
            severity: 'error',
            summary: 'Erro',
            detail: `Erro ao criar usuário!`,
            life: 2000,
          });
          console.log(err)
        },
      })
    }
  }
}
