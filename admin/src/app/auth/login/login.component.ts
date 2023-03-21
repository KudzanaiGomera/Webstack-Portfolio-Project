import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { JarwisService } from 'src/app/services/jarwis.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public form = {
    email: '',
    password: '',
  };

  public token: any;
  public username = '';
  public error = null;
  public loggedIn!: boolean;

  constructor(
    private Jarwis: JarwisService,
    private Token: TokenService,
    private router: Router,
    private Auth: AuthService
  ) { }

  onSubmit() {
    this.Jarwis.login(this.form).subscribe(
      (data) => this.handleResponse(data),
      (error) => this.handleError(error)
    );
  }

  handleResponse(data: any) {
    this.Token.handle(data.access_token);
    this.Auth.changeAuthStatus(true);

    this.router.navigateByUrl('/home');
  }

  handleError(error: any) {
    this.error = error.error.error;
  }

  ngOnInit() {
    this.Auth.authStatus.subscribe((value) => (this.loggedIn = value));
    if (!this.loggedIn === true) {
      this.router.navigate(['']);
    }
    else {
      this.router.navigate(['/home']);
    }

  }
}
