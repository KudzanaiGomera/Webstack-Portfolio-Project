import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'education';

  constructor(
    private bnIdle: BnNgIdleService,
    private Token: TokenService,
    private Auth: AuthService,
    private router: Router,
  ) {

  }

  logout() {
    this.Token.remove();
    localStorage.clear();
    this.Auth.changeAuthStatus(false);
    this.router.navigate(['']);
  }

  // initiate it in your component OnInit
  ngOnInit() {
    this.bnIdle.startWatching(172800).subscribe((isTimedOut: boolean) => {
      if (true) {
        // console.log('session expired');
        // console.log('user logged out automatically after 2 days for security reasons');
        this.logout();
      }
    });
  }

}
