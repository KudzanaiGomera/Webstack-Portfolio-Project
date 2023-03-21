import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { JarwisService } from 'src/app/services/jarwis.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public loggedIn: boolean = false;
  public token: any;
  public users: any;
  public content: any;
  public numberOfContent: any;
  public user: any;
  public numberOfUsers: any;
  public pic: any;
  public error: any;
  public success: any;
  public subjects: any;
  public numberOfSubjects: any;

  constructor(
    private Jarwis: JarwisService,
    private Auth: AuthService,
    private Token: TokenService,
    private router: Router
  ) { }

  goToAccount() {
    this.router.navigateByUrl('/account');
  }

  ngOnInit() {
    this.Auth.authStatus.subscribe((value: boolean) => (this.loggedIn = value));
    this.token = localStorage.getItem('token');
    this.user = this.Token.payload(this.token);
    this.user = this.user.data.name;

    this.Jarwis.getUsers().subscribe((response: any) => {
      this.users = response['users'];
      //get the number of objects which is one user per object
      this.numberOfUsers = this.users.length;
    });

    this.Jarwis.getSubjects().subscribe((response: any) => {
      this.subjects = response['subjects'];
      //get the number of objects
      this.numberOfSubjects = this.subjects.length;
    });

    this.Jarwis.purchasedContent().subscribe((response: any) => {
      this.content = response['obj'];
      //get the number of objects
      this.numberOfContent = this.content.length;
    });

    //get admin profile image
    let myFormData = new FormData();
    myFormData.append('name', this.user);

    this.Jarwis.getImage(myFormData).subscribe(
      (response: any) => {
        this.pic = response['Image'];
      },
      (error) => this.handleError(error)
    );
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
