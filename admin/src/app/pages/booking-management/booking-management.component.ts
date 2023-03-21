import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { JarwisService } from 'src/app/services/jarwis.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-booking-management',
  templateUrl: './booking-management.component.html',
  styleUrls: ['./booking-management.component.scss']
})
export class BookingManagementComponent implements OnInit {

  public form = {
    email: '',
    link: '',
  }

  public loggedIn: boolean = false;
  public token: any;
  public user: any;
  public pic: any;

  public error: any;
  public success: any;
  public message = null;
  public users: any;
  public userid: any;
  public userEmail: any;
  public bookings: any;

  constructor(
    private Jarwis: JarwisService,
    private Token: TokenService,
    private router: Router,
    private Auth: AuthService,
  ) { }

  ngOnInit() {

    this.Auth.authStatus.subscribe((value: boolean) => this.loggedIn = value);
    this.token = localStorage.getItem('token');
    this.user = this.Token.payload(this.token);
    this.user = this.user.data.name;

    //get admin profile image
    let myFormData = new FormData();
    myFormData.append('name', this.user);

    this.Jarwis.getImage(myFormData).subscribe((response: any) => {
      this.pic = response['Image'];
    },
      error => this.handleError(error),
    );

    this.Jarwis.getUsers().subscribe((response: any) => {
      this.users = response['users'];
    })

    this.Jarwis.getBookings().subscribe((response: any) => {
      this.bookings = response['bookings'];
    })

  }

  deleteBooking(id: any) {
    this.Jarwis.deleteBooking({ "id": id }).subscribe(
      data => this.handleResponse(data),
    );
  }

  onSubmit() {
    this.Jarwis.approveBooking(this.form).subscribe(
      success => this.handleSuccess(success),
      error => this.handleError(error)
    );
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

  logout(event: MouseEvent) {
    event.preventDefault();
    this.Token.remove();
    localStorage.clear();
    this.Auth.changeAuthStatus(false);
    this.router.navigate(['']);
  }

}
