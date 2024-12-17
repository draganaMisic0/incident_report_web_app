import { inject, Injectable } from '@angular/core';
import { of } from 'rxjs';
import { admin, guest, LoginService, Menu } from '@core';
import { map } from 'rxjs/operators';
import { AuthGoogleService } from 'app/auth-google.service';

/**
 * You should delete this file in the real APP.
 */
@Injectable()
export class FakeLoginService extends LoginService {
  private token = { access_token: 'MW56YjMyOUAxNjMuY29tWm9uZ2Jpbg==', token_type: 'bearer' };
  private authGoogleService = inject(AuthGoogleService);

  login() {
    return of(this.token);
  }

  refresh() {
    return of(this.token);
  }

  logout() {
    return of({});
  }

  me() {
    let profile = admin;
    if(this.authGoogleService.isLoggedIn())
    {
      let googleProfile = this.authGoogleService.getProfile();
      profile.avatar = googleProfile.picture;
      profile.email = googleProfile.email;
      profile.name = googleProfile.name;
    }
    else{
      profile.name = "ANONIMNA DRAGANA"
      profile.email = 'anonymous@gmail'
    }

    return of(profile);
  }

  menu() {
    return this.http
      .get<{ menu: Menu[] }>('data/menu.json?_t=' + Date.now())
      .pipe(map(res => res.menu));
  }
}
