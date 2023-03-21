import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { JarwisService } from 'src/app/services/jarwis.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public loggedIn: boolean;
  public users: any;
  public token: any;
  public username = '';
  public error: any;
  public pic: any | undefined;
  public success: any;
  public email: any;
  public profile2: any;

  constructor(
    private router: Router,
    private Token: TokenService,
    private Auth: AuthService,
    private Jarwis: JarwisService
  ) {}

  ngOnInit() {
    this.Auth.authStatus.subscribe((value) => (this.loggedIn = value));

    this.token = localStorage.getItem('token');
    this.users = this.Token.payload(this.token);
    this.username = this.users.data.name;
    this.email = this.users.data.email;

    let myFormData = new FormData();
    myFormData.append('email', this.email);

    this.Jarwis.getUserImage(myFormData).subscribe(
      (response: any) => {
        this.pic = response['Image'];
        console.log(this.pic);
      },
      (error) => this.handleError(error)
    );

    this.Jarwis.getUserAccount(myFormData).subscribe((response: any) => {
      this.profile2 = response['user'];
    });
  }

  handleError(error: any) {
    this.error = error.error.error;
  }

  handleSuccess(success: any) {
    this.success = success.message;
  }

  logout(event: MouseEvent) {
    event.preventDefault();
    this.Token.remove();
    localStorage.clear();
    this.Auth.changeAuthStatus(false);
    this.router.navigate(['']);
  }
}