import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';;
import { JarwisService } from 'src/app/services/jarwis.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-mybooking',
  templateUrl: './mybooking.component.html',
  styleUrls: ['./mybooking.component.scss']
})
export class MybookingComponent implements OnInit {

  public loggedIn!: boolean;
  public users: any;
  public token: any;
  public username = '';
  public email: any;
  public error: any;
  public success: any;
  public message = null;
  public booking: any;
  public mybooking: any;

  constructor(
    private Token: TokenService,
    private jarwis: JarwisService,
    private route: ActivatedRoute,
    private router: Router,
    private Auth: AuthService,
  ) { }

  ngOnInit() {

    this.Auth.authStatus.subscribe(value => this.loggedIn = value);

    this.token = localStorage.getItem('token');
    this.users = this.Token.payload(this.token);
    this.username = this.users.data.name;
    this.email = this.users.data.email;

    this.jarwis.getMyBooking({ "email": this.email }).subscribe((response: any) => {
      this.mybooking = response['booking'];
    },
      error => this.handleError(error)
    );

    setTimeout(
      function () {
        location.reload();
      }, 600000);
  }

  handleResponse(data: any) {
    this.ngOnInit();
  }

  handleSuccess(success: any) {
    this.success = success.message;
  }

  handleError(error: any) {
    this.error = error.error.error;
  }
}
