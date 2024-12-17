import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { MtxButtonModule } from '@ng-matero/extensions/button';
import { TranslateModule } from '@ngx-translate/core';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { OAuthService, OAuthEvent } from 'angular-oauth2-oidc';
import { AuthService, TokenService } from '@core/authentication';
import { GoogleAuthService } from './google-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MtxButtonModule,
    TranslateModule,
    CommonModule
  ],
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly auth = inject(AuthService);
  private readonly googleAuth=inject(GoogleAuthService);
  private readonly tokenService = inject(TokenService);
  private providedUsername: string='ng-matero';
  private providedPassword: string='ng-matero';
  isSubmitting = false;

  loginForm = this.fb.nonNullable.group({
    username: ['ng-matero', []],
    password: ['ng-matero', []],
    rememberMe: [false],
  });

  get username() {
    return this.loginForm.get('username')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }

  get rememberMe() {
    return this.loginForm.get('rememberMe')!;
  }

  loginAsGuest() {
    this.isSubmitting = true;

    const username = 'guest'
    const password = 'guest'

    this.auth
      .login(username, password, this.rememberMe.value)
      .pipe(filter(authenticated => authenticated))
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/');
        },
        error: (errorRes: HttpErrorResponse) => {
          if (errorRes.status === 422) {
            const form = this.loginForm;
            const errors = errorRes.error.errors;
            Object.keys(errors).forEach(key => {
              form.get(key === 'email' ? 'username' : key)?.setErrors({
                remote: errors[key][0],
              });
            });
          }
          this.isSubmitting = false;
        },
      });

      
  }

  loginWithGoogle() {
    
    this.googleAuth.login();
    this.router.navigate(['/auth/login']);
    this.auth
    .login(this.providedUsername, this.providedPassword, this.rememberMe.value)
    .pipe(filter(authenticated =>  authenticated))
    .subscribe({
      next: () => {
       
      },
      error: (errorRes: HttpErrorResponse) => {
        if (errorRes.status === 422) {
          const form = this.loginForm;
          const errors = errorRes.error.errors;
          Object.keys(errors).forEach(key => {
            form.get(key === 'email' ? 'username' : key)?.setErrors({
              remote: errors[key][0],
            });
          });
        }
        this.isSubmitting = false;
      },
    });
  }

  check() {
    // Implement your logic here. For example, check if the user is authenticated.
   
  }
  isLoggedIn(){

    if(this.googleAuth.getProfile!=null)
      return true;
    else
      return false;
  }
  
}
