import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { JarwisService } from 'src/app/services/jarwis.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  public form = {
    name: '',
    number: '',
    email: '',
    message: ''
  }

  public error: any;
  public success: any;

  constructor(
    private jarwis: JarwisService,
    private Token: TokenService,
    private router: Router,
    private Auth: AuthService,
  ) { }


  onSubmit() {
    this.jarwis.contact(this.form).subscribe(
      success => this.handleSuccess(success),
      error => this.handleError(error),
    );
  }

  handleResponse(data: any) {
    this.Token.handle(data.access_token);
    this.Auth.changeAuthStatus(true);
    this.router.navigateByUrl('/contact');
  }

  handleError(error: any) {
    this.error = error.error.error;
  }

  handleSuccess(success: any) {
    this.success = success.message;
  }

  ngOnInit() {
  }
}
