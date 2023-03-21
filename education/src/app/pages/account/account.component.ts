import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JarwisService } from 'src/app/services/jarwis.service';
import { TokenService } from 'src/app/services/token.service';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  public form = {
    newName: '',
    email: '',
    password: '',
  };

  public users: any;
  public email: any;
  public token: any;
  public username = '';
  public error: any;
  public success: any;
  public selectedFile: any = null;
  public profile: any;
  public pic: any | undefined;
  progress = 0;

  constructor(
    private Jarwis: JarwisService,
    private router: Router,
    private Token: TokenService
  ) { }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    this.token = localStorage.getItem('token');
    this.users = this.Token.payload(this.token);
    this.username = this.users.data.name;
    this.email = this.users.data.email;

    let myFormData = new FormData();
    myFormData.append('newName', this.form.newName);
    myFormData.append('email', this.email);
    myFormData.append('password', this.form.password);
    myFormData.append('name', this.username);

    this.Jarwis.userAccount(myFormData).subscribe(
      (success) => this.handleSuccess(success),
      (error) => this.handleError(error)
    );
  }

  onUpload() {
    this.token = localStorage.getItem('token');
    this.users = this.Token.payload(this.token);
    // this.username = this.users.data.name;
    this.email = this.users.data.email;

    this.progress = 0;

    if (this.selectedFile === null) {
      this.error = 'Please select an image.';
    } else {
      let myFormData = new FormData();
      myFormData.append('image', this.selectedFile, this.selectedFile.name);
      myFormData.append('email', this.email);

      this.Jarwis.uploadUserData(myFormData).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round((100 * event.loaded) / event.total);
          }
        },
        (error) => this.handleError(error)
      );
    }
  }

  ngOnInit() {
    this.token = localStorage.getItem('token');
    this.users = this.Token.payload(this.token);
    this.username = this.users.data.name;
    this.email = this.users.data.email;

    let myFormData = new FormData();
    myFormData.append('email', this.email);

    this.Jarwis.getUserAccount(myFormData).subscribe((response: any) => {
      this.profile = response['user'];
    });

    this.Jarwis.getUserImage(myFormData).subscribe(
      (response: any) => {
        this.pic = response['Image'];
        // console.log(this.pic);
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

  handleSuccess(success: any) {
    this.success = success.message;
  }

  logout(event: MouseEvent) {
    event.preventDefault();
    this.Token.remove();
    localStorage.clear();
    this.router.navigate(['']);
  }
}
