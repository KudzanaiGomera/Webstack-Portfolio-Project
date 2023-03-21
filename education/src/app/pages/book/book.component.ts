import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { JarwisService } from 'src/app/services/jarwis.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
})
export class BookComponent implements OnInit {
  public form = {
    date: '',
    time: '',
  };

  public loggedIn!: boolean;
  public users: any;
  public token: any;
  public username = '';
  public email: any;
  public error: any;
  public success: any;
  public message = null;
  public topic: any;
  public topics: any;
  public booking: any;
  public check4Booking: any;
  public notBooked: any | undefined;
  public length: any | undefined;

  constructor(
    private Token: TokenService,
    private jarwis: JarwisService,
    private route: ActivatedRoute,
    private router: Router,
    private Auth: AuthService
  ) { }

  //get subject
  getTopic() {
    const sub = this.route.snapshot.paramMap.get('topic');
    return sub;
  }

  onSubmit() {
    this.token = localStorage.getItem('token');
    this.users = this.Token.payload(this.token);
    this.username = this.users.data.name;
    this.email = this.users.data.email;

    this.topic = this.getTopic();

    let myFormData = new FormData();
    myFormData.append('name', this.username);
    myFormData.append('email', this.email);
    myFormData.append('topic', this.topic);
    myFormData.append('date', this.form.date);
    myFormData.append('time', this.form.time);

    this.jarwis.book(myFormData).subscribe(
      (success) => this.handleSuccess(success),
      (error) => this.handleError(error)
    );
  }

  onBook() {
    this.topic = this.getTopic();

    this.router.navigate([
      '/purchase-booking',
      this.topic,
      this.form.date,
      this.form.time,
    ]);
  }

  ngOnInit() {
    this.Auth.authStatus.subscribe((value) => (this.loggedIn = value));

    this.token = localStorage.getItem('token');
    this.users = this.Token.payload(this.token);
    this.username = this.users.data.name;
    this.email = this.users.data.email;

    this.topic = this.getTopic();

    this.jarwis.bookStatus({ email: this.email, topic: this.topic }).subscribe(
      (response: any) => {
        this.booking = response['booking'];
      },
      (error) => this.handleError(error)
    );

    this.jarwis
      .check4Bookings({ email: this.email, topic: this.topic })
      .subscribe(
        (response: any) => {
          this.check4Booking = response['booking'];
          this.length = this.check4Booking.length;
        },
        (error) => this.handleError(error)
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

  // load js file in components
  loadScript(url: string) {
    const body = <HTMLDivElement>document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }
}
