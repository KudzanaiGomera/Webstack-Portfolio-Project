import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { JarwisService } from 'src/app/services/jarwis.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-more-subjects',
  templateUrl: './more-subjects.component.html',
  styleUrls: ['./more-subjects.component.scss'],
})
export class MoreSubjectsComponent implements OnInit {
  public loggedIn!: boolean;
  public error: any;
  public success: any;
  public message = null;
  public subjects: any;
  public token: any;
  public users: any;
  public email: any;
  public unPaidSubjects: any;

  constructor(
    private router: Router,
    private Jarwis: JarwisService,
    private Auth: AuthService,
    private Token: TokenService
  ) { }

  selectSubject(subject: any) {
    this.router.navigate(['/grade', subject]);
  }

  removeSubjectFromCart(subject) {
    this.token = localStorage.getItem('token');
    this.users = this.Token.payload(this.token);
    this.email = this.users.data.email;

    //remove subjects from cart.
    this.Jarwis.removeSubjectFromCart({
      subject: subject,
      email: this.email,
    }).subscribe();

    window.location.reload();
  }

  ngOnInit() {
    this.Auth.authStatus.subscribe((value) => (this.loggedIn = value));
    // console.log('am l logged in', this.loggedIn);

    this.token = localStorage.getItem('token');
    this.users = this.Token.payload(this.token);
    this.email = this.users.data.email;

    this.Jarwis.getMoreSubjects({ email: this.email }).subscribe(
      (response: any) => {
        this.subjects = response['subjects'];
      }
    );

    this.Jarwis.getUnPaidSubjects({ email: this.email }).subscribe(
      (response: any) => {
        this.unPaidSubjects = response['subjects'];
      }
    );

    setTimeout(
      function () {
        location.reload();
      }, 600000);
  }
}
