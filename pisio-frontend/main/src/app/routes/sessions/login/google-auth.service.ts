// AuthService
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { Route, Router } from '@angular/router';
import { sortAndDeduplicateDiagnostics } from 'typescript';

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {


  
  constructor(private http: HttpClient, public oAuthService: OAuthService, private router: Router) {

    this.initConfiguration();
  }

  initConfiguration(){

      const authConfig: AuthConfig={
        issuer:'https://accounts.google.com',
        strictDiscoveryDocumentValidation:false, 
        clientId:'442477657792-ofmmk39q3rrj425ossfmj3a7v4upr5i3.apps.googleusercontent.com', 
        redirectUri: window.location.origin+'/dashboard',
        scope: 'openid profile email',
      };

      this.oAuthService.configure(authConfig);
      this.oAuthService.setupAutomaticSilentRefresh();
      this.oAuthService.loadDiscoveryDocumentAndTryLogin();

  }
 

  login(): Observable<boolean> {
    return new Observable((observer) => {
      this.oAuthService.initImplicitFlow();

      this.oAuthService.events.subscribe((event) => {
        // Use a type guard or check if the event type is a known type
        if (event.type === 'token_received') {
          observer.next(true);
          observer.complete();
        } else if (this.isErrorEvent(event)) {
          observer.error(event); // Emit the error event
        }
      });
    });
  }

  // Type guard to check if the event is an error event
  private isErrorEvent(event: any): event is { type: 'error' } {
    return event && event.type && event.type === 'error';
  }

  logout(){

    console.log("novi log out");
    this.oAuthService.revokeTokenAndLogout();
    this.oAuthService.logOut();
  }

  getProfile(){
    return this.oAuthService.getIdentityClaims();
  }

  getToken(){
    return this.oAuthService.getAccessToken();
  }
}
