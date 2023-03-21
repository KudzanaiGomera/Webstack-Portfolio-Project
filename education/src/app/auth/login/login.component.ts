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
    email: null,
    password: null,
  };

  public users: any;
  public token: any;
  public username = '';
  public email: any;
  public courses: any | undefined;
  public error = null;
  public check: any;
  public loggedIn!: boolean;

  constructor(
    private Jarwis: JarwisService,
    private Token: TokenService,
    private router: Router,
    private Auth: AuthService
  ) {}

  onSubmit() {
    this.Jarwis.login(this.form).subscribe(
      (data) => this.handleResponse(data),
      (error) => this.handleError(error)
    );
  }

  handleResponse(data: any) {
    this.Token.handle(data.access_token);
    this.Auth.changeAuthStatus(true);

    this.token = localStorage.getItem('token');
    this.users = this.Token.payload(this.token);
    this.username = this.users.data.name;
    this.email = this.users.data.email;

    this.Jarwis.getTopicsByUser({ user: this.email }).subscribe(
      (response: any) => {
        this.courses = response['courses'];
        if (this.courses) {
          this.router.navigateByUrl('/home');
        }
      },
      (err) => {
        this.check = err.status;
        if (this.check === 404) {
          this.router.navigateByUrl('/subject');
        }
      }
    );
  }

  handleError(error: any) {
    this.error = error.error.error;
  }

  ngOnInit() {
    this.Auth.authStatus.subscribe((value) => (this.loggedIn = value));
    if (!this.loggedIn === true) {
      this.router.navigate(['/login']);
    }
    this.router.navigate(['/home']);
  }
}
