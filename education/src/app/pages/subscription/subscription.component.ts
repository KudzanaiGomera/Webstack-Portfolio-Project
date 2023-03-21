import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { JarwisService } from 'src/app/services/jarwis.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss'],
})
export class SubscriptionComponent implements OnInit {
  public loggedIn!: boolean;
  public error: any;
  public email: any;
  public token: any;
  public users: any;
  public user: any;
  public username = '';
  public subscription: any;

  constructor(
    private route: ActivatedRoute,
    private Token: TokenService,
    private Auth: AuthService,
    private Jarwis: JarwisService
  ) { }

  cancel(subject: any) {
    this.token = localStorage.getItem('token');
    this.users = this.Token.payload(this.token);
    this.email = this.users.data.email;

    // console.log(subject);

    if (confirm('Are you sure you want to cancel your subscription')) {
      window.location.reload();
      //remove subjects from cart.
      this.Jarwis.cancelSubscription({
        subject: subject,
        email: this.email,
      }).subscribe();
    }
  }

  ngOnInit() {
    this.Auth.authStatus.subscribe((value) => (this.loggedIn = value));

    this.token = localStorage.getItem('token');
    this.users = this.Token.payload(this.token);
    this.email = this.users.data.email;

    // console.log(this.email);

    let myFormData = new FormData();
    myFormData.append('email', this.email);

    this.Jarwis.getSubscription(myFormData).subscribe((response: any) => {
      this.subscription = response['subscription'];
      // console.log(this.subscription);
    });

    setTimeout(
      function () {
        location.reload();
      }, 600000);
  }
}
