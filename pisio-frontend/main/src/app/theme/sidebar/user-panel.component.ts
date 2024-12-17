import { Component, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { AuthService, User } from '@core/authentication';
import { TranslateModule } from '@ngx-translate/core';
import { GoogleAuthService } from 'app/routes/sessions/login/google-auth.service';

@Component({
  selector: 'app-user-panel',
  template: `
    <div class="matero-user-panel" routerLink="/profile/overview">
      <img class="matero-user-panel-avatar" [src]="user.avatar" alt="avatar" width="64" />
      <div class="matero-user-panel-info">
        <h4>{{ user.name }}</h4>
        <h5>{{ user.email }}</h5>
      </div>
    </div>
  `,
  styleUrl: './user-panel.component.scss',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatIconModule, MatTooltipModule, TranslateModule],
})
export class UserPanelComponent implements OnInit {
  private readonly auth = inject(AuthService);
  private readonly googleAuth=inject(GoogleAuthService);

  user!: User;

  ngOnInit(): void {
    this.auth.user().subscribe(user =>{ 
      this.user = user;
      if(this.googleAuth.loggedIn()){

        let profile=this.googleAuth.getProfile();
        this.user.avatar="/images/moderator-avatar.png"
        this.user.email=profile.email;
        this.user.name=profile.name;
      }
     return this.user;
  });
}
}
