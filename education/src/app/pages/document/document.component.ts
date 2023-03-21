import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit {

  public loggedIn!: boolean;
  public users: any;
  public token: any;
  public username = '';
  public email: any;
  public videoid: any;
  public url2: any

  constructor(
    private route: ActivatedRoute,
    private Token: TokenService,
    private sanitizer: DomSanitizer,
    private Auth: AuthService,
  ) { }

  transform(url: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  //get subject
  getDoc() {
    const url = this.route.snapshot.paramMap.get('url');
    return (url);
  };

  ngOnInit() {

    this.Auth.authStatus.subscribe(value => this.loggedIn = value);

    this.token = localStorage.getItem('token');
    this.users = this.Token.payload(this.token);
    this.username = this.users.data.name;
    this.email = this.users.data.email;

    this.videoid = this.getDoc();
    // console.log(this.videoid);

    setTimeout(
      function () {
        location.reload();
      }, 600000);

  }

}
