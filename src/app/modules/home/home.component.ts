import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/services/user/user.service';
import { SignupUserRequest } from 'src/app/models/interfaces/user/SignupUserRequest';
import { AuthRequest } from 'src/app/models/interfaces/user/auth/AuthRequest';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy {
  private destroy$ = new Subject<void>();
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
    private messageServie: MessageService,
    private router: Router
    ){}

  onSubmitLoginForm(): void{
    if (this.loginForm.value && this.loginForm.valid) {
      this.userService.authUser(this.loginForm.value as AuthRequest)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response) {
            this.cookieService.set('USER_INFO', response?.token);
            this.loginForm.reset();
            this.router.navigate(['/dashboard']);

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
            summary: '',
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
      this.userService.
      signupUser(this.signupForm.value as SignupUserRequest)
      .pipe(takeUntil(this.destroy$))
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

  ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
  }
}
