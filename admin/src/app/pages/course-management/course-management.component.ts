import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { JarwisService } from 'src/app/services/jarwis.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-course-management',
  templateUrl: './course-management.component.html',
  styleUrls: ['./course-management.component.scss'],
})
export class CourseManagementComponent implements OnInit {
  public form = {
    name: '',
    newName: '',
    description: '',
  };

  public loggedIn: boolean = false;
  public token: any;
  public user: any;
  public pic: any;

  public error: any;
  public success: any;
  public message = null;
  public subjects: any;

  constructor(
    private Jarwis: JarwisService,
    private Token: TokenService,
    private router: Router,
    private Auth: AuthService
  ) { }

  openSubject(name: string) {
    this.router.navigate(['/subject', name]);
  }

  ngOnInit() {
    this.Auth.authStatus.subscribe((value: boolean) => (this.loggedIn = value));
    this.token = localStorage.getItem('token');
    this.user = this.Token.payload(this.token);
    this.user = this.user.data.name;

    //get admin profile image
    let myFormData = new FormData();
    myFormData.append('name', this.user);

    this.Jarwis.getImage(myFormData).subscribe(
      (response: any) => {
        this.pic = response['Image'];
      },
      (error) => this.handleError(error)
    );

    this.Jarwis.getSubjects().subscribe((response: any) => {
      this.subjects = response['subjects'];
    });
  }

  editDescription() {
    this.Jarwis.editSubject(this.form).subscribe(
      (success) => this.handleSuccess(success),
      (error) => this.handleError(error)
    );
  }

  deleteSubject(id: any) {
    this.Jarwis.deleteSubject({ id: id }).subscribe((data) =>
      this.handleResponse(data)
    );
  }

  onSubmit() {
    this.Jarwis.addSubject(this.form).subscribe(
      (success) => this.handleSuccess(success),
      (error) => this.handleError(error)
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
