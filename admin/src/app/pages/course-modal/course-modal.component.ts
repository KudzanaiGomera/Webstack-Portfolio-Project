import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { JarwisService } from 'src/app/services/jarwis.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-course-modal',
  templateUrl: './course-modal.component.html',
  styleUrls: ['./course-modal.component.scss'],
})
export class CourseModalComponent implements OnInit {
  public form = {
    name: '',
    description: '',
  };

  public loggedIn: boolean = false;
  public token: any;
  public user: any;
  public pic: any;

  public error: any;
  public success: any;
  public message = null;
  public grades: any;
  public subject: any;

  constructor(
    private Jarwis: JarwisService,
    private Token: TokenService,
    private router: Router,
    private route: ActivatedRoute,
    private Auth: AuthService
  ) { }

  //get course name from url
  getName() {
    let subject = this.route.snapshot.paramMap.get('name');
    return subject;
  }

  openGrade(grade: string) {
    let subject = this.route.snapshot.paramMap.get('name');
    this.router.navigate(['/topic', subject, grade]);
  }

  ngOnInit() {
    this.Auth.authStatus.subscribe((value: boolean) => (this.loggedIn = value));
    this.token = localStorage.getItem('token');
    this.user = this.Token.payload(this.token);
    this.user = this.user.data.name;

    this.subject = this.getName();

    //get admin profile image
    let myFormData = new FormData();
    myFormData.append('name', this.user);

    this.Jarwis.getImage(myFormData).subscribe(
      (response: any) => {
        this.pic = response['Image'];
      },
      (error) => this.handleError(error)
    );

    this.Jarwis.getGrades({ subject: this.subject }).subscribe(
      (response: any) => {
        this.grades = response['grades'];
      }
    );
  }

  deleteGrade(id: any) {
    this.Jarwis.deleteGrade({ id: id }).subscribe((data) =>
      this.handleResponse(data)
    );
  }

  editDescription() {
    this.Jarwis.editGradeDescription(this.form).subscribe(
      (success) => this.handleSuccess(success),
      (error) => this.handleError(error)
    );
  }

  onSubmit() {
    this.subject = this.getName();

    let myFormData = new FormData();
    myFormData.append('name', this.form.name);
    myFormData.append('description', this.form.description);
    myFormData.append('subject', this.subject);

    this.Jarwis.addGrade(myFormData).subscribe(
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
