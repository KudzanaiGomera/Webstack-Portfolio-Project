import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { JarwisService } from 'src/app/services/jarwis.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  public loggedIn!: boolean;
  public subject: any;
  public error: any;
  public topic: any;
  public grade: any;
  public email: any;
  public content_id: any | undefined;
  public token: any;
  public users: any;
  public user: any;
  public username = '';
  public amount: any;
  public billing: any;
  public free_trial: any | undefined;
  public noTrial: any;
  public message: any;

  public today: any;
  public dd: any;
  public mm: any;
  public yyyy: any;
  public newday: any;
  public newmonth: any;

  constructor(
    private route: ActivatedRoute,
    private Token: TokenService,
    private Auth: AuthService,
    private Jarwis: JarwisService
  ) { }

  //get topic
  getTopic() {
    const topic = this.route.snapshot.paramMap.get('topic');
    return topic;
  }

  //get subject
  getSubject() {
    const subject = this.route.snapshot.paramMap.get('subject');
    return subject;
  }

  //get grade
  getGrade() {
    const grade = this.route.snapshot.paramMap.get('grade');
    return grade;
  }

  handler: any = null;

  success(id: any) {
    this.amount = 1;

    this.token = localStorage.getItem('token');
    this.users = this.Token.payload(this.token);
    this.username = this.users.data.name;
    this.email = this.users.data.email;

    //get current date free trial was activated + 7 days later for the next recuring amount
    this.today = new Date();
    this.dd = String(this.today.getDate()).padStart(2, '0');
    this.mm = String(this.today.getMonth() + 1).padStart(2, '0'); //January is 0!
    this.yyyy = this.today.getFullYear();

    //get current billing date after free trial + 1 year
    this.newday = Number(this.dd) + 7;
    if (this.newday >= 31) {
      this.newday = this.newday - this.dd;
      this.newmonth = Number(this.mm) + 1;
    } else {
      this.newday = this.dd;
      this.newmonth = this.mm;
    }

    this.today = this.yyyy + '-' + this.newmonth + '-' + this.newday;
    // console.log('end of free trial: ', this.today);

    //get current billing date after free trial + 1 year
    var newyear = this.yyyy + 1;
    this.billing = newyear + '-' + this.newmonth + '-' + this.newday;
    // console.log('date of subscription: ', this.billing);

    let myFormData = new FormData();
    myFormData.append('id', id);
    myFormData.append('amount', this.amount);
    myFormData.append('free_trial', this.today);
    myFormData.append('billing', this.billing);

    this.Jarwis.pay(myFormData).subscribe(
      (response: any) => { },
      (error) => this.handleError(error)
    );
  }

  success2(id: any) {
    this.amount = 1250;

    this.token = localStorage.getItem('token');
    this.users = this.Token.payload(this.token);
    this.username = this.users.data.name;
    this.email = this.users.data.email;

    //get current date free trial was activated + 7 days later for the next recuring amount
    this.today = new Date();
    this.dd = String(this.today.getDate() + 7).padStart(2, '0');
    this.mm = String(this.today.getMonth() + 1).padStart(2, '0'); //January is 0!
    this.yyyy = this.today.getFullYear();

    this.today = this.yyyy + '-' + this.mm + '-' + this.dd;
    // console.log('end of free trial: ', this.today);

    //get current billing date after free trial + 1 year
    var newyear = this.yyyy + 1;
    this.billing = newyear + '-' + this.mm + '-' + this.dd;
    // console.log('date of subscription: ', this.billing);

    let myFormData = new FormData();
    myFormData.append('id', id);
    myFormData.append('amount', this.amount);
    myFormData.append('free_trial', this.today);
    myFormData.append('billing', this.billing);

    this.Jarwis.pay(myFormData).subscribe(
      (response: any) => { },
      (error) => this.handleError(error)
    );
  }

  ngOnInit() {
    this.Auth.authStatus.subscribe((value) => (this.loggedIn = value));

    this.token = localStorage.getItem('token');
    this.users = this.Token.payload(this.token);
    this.email = this.users.data.email;

    this.subject = this.getSubject();
    this.topic = this.getTopic();
    this.grade = this.getGrade();

    //get current date free trial was activated + 7 days later for the next recuring amount
    this.today = new Date();
    this.dd = String(this.today.getDate() + 7).padStart(2, '0');
    this.mm = String(this.today.getMonth() + 1).padStart(2, '0'); //January is 0!
    this.yyyy = this.today.getFullYear();

    this.today = this.yyyy + '-' + this.mm + '-' + this.dd;
    // console.log('next_run: ', this.today);

    let myFormData = new FormData();
    myFormData.append('subject', this.subject);
    myFormData.append('topic', this.topic);
    myFormData.append('grade', this.grade);
    myFormData.append('email', this.email);

    this.Jarwis.getId(myFormData).subscribe((response: any) => {
      this.content_id = response['content_Id'];
    });

    this.Jarwis.checkTrial(myFormData).subscribe(
      (response: any) => {
        this.free_trial = response['content'];
        // console.log(this.free_trial);
      },
      (error) => this.handleError(error)
    );
    setTimeout(
      function () {
        location.reload();
      }, 600000);
  }

  handleError(error: any) {
    this.error = error.error.error;
  }
}
