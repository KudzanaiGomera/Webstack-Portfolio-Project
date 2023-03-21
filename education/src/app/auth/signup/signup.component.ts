import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { JarwisService } from 'src/app/services/jarwis.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  public form = {
    name: null,
    email: null,
    cellnumber: null,
    grade: null,
    password: null,
  };

  public error = null;
  public loggedIn!: boolean;

  constructor(
    private Jarwis: JarwisService,
    private Token: TokenService,
    private router: Router,
    private Auth: AuthService
  ) {}

  onSubmit() {
    this.Jarwis.signup(this.form).subscribe(
      (data) => this.handleResponse(data),
      (error) => this.handleError(error)
    );
  }

  handleResponse(data: any) {
    this.Token.handle(data.access_token);
    this.router.navigateByUrl('verify');
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
