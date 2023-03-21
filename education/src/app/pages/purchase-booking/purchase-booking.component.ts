import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { JarwisService } from 'src/app/services/jarwis.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-purchase-booking',
  templateUrl: './purchase-booking.component.html',
  styleUrls: ['./purchase-booking.component.scss'],
})
export class PurchaseBookingComponent implements OnInit {
  public loggedIn!: boolean;
  public subject: any;
  public error: any;
  public topic: any;
  public grade: any;
  public time: any;
  public date: any;
  public amount: any;
  public token: any;
  public users: any;
  public user: any;
  public username = '';
  public email: any;

  constructor(
    private route: ActivatedRoute,
    private Token: TokenService,
    private router: Router,
    private Auth: AuthService,
    private Jarwis: JarwisService
  ) { }

  //get topic
  getTopic() {
    const topic = this.route.snapshot.paramMap.get('topic');
    return topic;
  }

  //get date
  getDate() {
    const date = this.route.snapshot.paramMap.get('date');
    return date;
  }

  //get time
  getTime() {
    const time = this.route.snapshot.paramMap.get('time');
    return time;
  }

  handler: any = null;

  success() {
    this.date = this.getDate();
    this.topic = this.getTopic();
    this.time = this.getTime();

    this.token = localStorage.getItem('token');
    this.users = this.Token.payload(this.token);
    this.username = this.users.data.name;
    this.email = this.users.data.email;

    let myFormData = new FormData();
    myFormData.append('topic', this.topic);
    myFormData.append('date', this.date);
    myFormData.append('time', this.time);
    myFormData.append('email', this.email);
    myFormData.append('name', this.username);

    this.Jarwis.payBooking(myFormData).subscribe(
      (response: any) => { },
      (error) => this.handleError(error)
    );
  }

  success2() {
    this.token = localStorage.getItem('token');
    this.users = this.Token.payload(this.token);
    this.username = this.users.data.name;
    this.email = this.users.data.email;

    this.date = this.getDate();
    this.topic = this.getTopic();
    this.time = this.getTime();

    let myFormData = new FormData();
    myFormData.append('topic', this.topic);
    myFormData.append('date', this.date);
    myFormData.append('time', this.time);
    myFormData.append('email', this.email);
    myFormData.append('name', this.username);

    this.Jarwis.payBookingEft(myFormData).subscribe(
      (data) => this.handleResponse(data),
      (error) => this.handleError(error)
    );
  }

  ngOnInit() {
    this.Auth.authStatus.subscribe((value) => (this.loggedIn = value));
    this.token = localStorage.getItem('token');
    this.topic = this.getTopic();

    setTimeout(
      function () {
        location.reload();
      }, 600000);
  }

  handleError(error: any) {
    this.error = error.error.error;
  }

  handleResponse(data: any) {
    this.token = localStorage.getItem('token');
    // this.Token.handle(data.access_token);
    this.router.navigate(['/verify-eft', this.token]);
  }
}
