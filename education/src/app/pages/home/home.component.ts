import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';;
import { JarwisService } from 'src/app/services/jarwis.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public loggedIn: boolean;
  public users: any;
  public token: any;
  public username = '';
  public email: any;
  public courses: any;

  constructor(
    private Token: TokenService,
    private jarwis: JarwisService,
    private Auth: AuthService,
  ) { }


  ngOnInit() {

    this.Auth.authStatus.subscribe(value => this.loggedIn = value);

    this.token = localStorage.getItem('token');
    this.users = this.Token.payload(this.token);
    this.username = this.users.data.name;
    this.email = this.users.data.email;


    //query topics by user purchase.
    this.jarwis.getSubjectsByUser({ 'user': this.email }).subscribe((response: any) => {
      this.courses = response['courses'];
    })

    setTimeout(
      function () {
        location.reload();
      }, 600000);
  }

}

