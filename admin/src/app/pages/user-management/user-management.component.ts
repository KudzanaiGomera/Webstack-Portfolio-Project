import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { JarwisService } from 'src/app/services/jarwis.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

  public form = {

    name: '',
    email: '',
    cellnumber: '',
    grade: '',
    password: ''
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
  public role: any;
  public subadmin: any;

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

    this.subadmin = this.Token.payload(this.token);
    this.role = this.subadmin.data.role;
    // console.log('second role', this.role);

    //get admin profile image
    let myFormData = new FormData();
    myFormData.append('name', this.user);

    this.Jarwis.getImage(myFormData).subscribe((response: any) => {
      this.pic = response['Image'];
      // console.log(this.pic);
    },
      error => this.handleError(error),
    );

    this.Jarwis.getUsers().subscribe((response: any) => {
      this.users = response['users'];
    })
  }

  deleteUser(email: any) {
    this.Jarwis.deleteUser({ "email": email }).subscribe(
      data => this.handleResponse(data),
    );
  }

  approveUser(email: any) {
    this.Jarwis.approveUser({ "email": email }).subscribe(
      data => this.handleResponse(data),
    );
  }

  disableUser(email: any) {
    this.Jarwis.disableUser({ "email": email }).subscribe(
      data => this.handleResponse(data),
    );
  }

  Reset(email: string) {
    this.userEmail = email;
  }

  onSubmit() {
    this.Jarwis.addUser(this.form).subscribe(
      success => this.handleSuccess(success),
      error => this.handleError(error)
    );
  }

  onReset() {

    let myFormData = new FormData();
    myFormData.append('email', this.userEmail);
    myFormData.append('password', this.form.password);

    this.Jarwis.resetPassword(myFormData).subscribe(
      success => this.handleSuccess(success),
      error => this.handleError(error)
    )
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
