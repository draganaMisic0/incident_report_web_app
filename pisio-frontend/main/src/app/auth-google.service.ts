import { P } from '@angular/cdk/keycodes';
import { Component, inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class AuthGoogleService {

  constructor(private oAuthService: OAuthService,
    private router: Router
  ) { 

    this.initConfiguration();
  }

  initConfiguration(){

    const authConfig: AuthConfig ={

      issuer: 'https://accounts.google.com', 
      strictDiscoveryDocumentValidation: false, 
      clientId: '442477657792-ofmmk39q3rrj425ossfmj3a7v4upr5i3.apps.googleusercontent.com',
      redirectUri: window.location.origin+ '/dashboard', 
      scope: 'openid profile email'

    };

    this.oAuthService.configure(authConfig);
    this.oAuthService.setupAutomaticSilentRefresh();
    this.oAuthService.loadDiscoveryDocument();
  }

  login(){

    try{
      this.oAuthService.initImplicitFlow();
    }
    catch(error){

      console.log(error);
    }
   
  }

  logout(){

    this.oAuthService.revokeTokenAndLogout();
    this.oAuthService.logOut();
  }

  getProfile(){

    return this.oAuthService.getIdentityClaims();
  }

  getToken(){

    return this.oAuthService.getAccessToken();
  }

  isLoggedIn(){
    if(this.getProfile() == null){
      return false;
    }
    else{
      return true;
    }
  }
}
