import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { JarwisService } from 'src/app/services/jarwis.service';
import { TokenService } from 'src/app/services/token.service';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-choices',
  templateUrl: './choices.component.html',
  styleUrls: ['./choices.component.scss']
})
export class ChoicesComponent implements OnInit {

  public form = {
    coption: '',
    // correct_choice: '',
    selectedOption: '',
  };

  public loggedIn: boolean = false;
  public token: any;
  public user: any;
  public pic: any;

  public error: any;
  public success: any;
  public message = null;
  public choices: any;
  public lesson: any;
  public qnNumber: any;
  progress = 0;

  constructor(
    private Jarwis: JarwisService,
    private Token: TokenService,
    private router: Router,
    private route: ActivatedRoute,
    private Auth: AuthService
  ) { }

  //get lesson name from url
  getLesson() {
    let lesson = this.route.snapshot.paramMap.get('lesson');
    return lesson;
  }

  //get question number from url
  getNumber() {
    let qnNumber = this.route.snapshot.paramMap.get('qnNumber');
    return qnNumber;
  }

  onSubmit() {

    this.progress = 0;

    this.Jarwis.editChoice(this.form).subscribe(
      (event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        }
      },
      error => this.handleError(error),
    );
  }

  ngOnInit() {
    this.Auth.authStatus.subscribe((value: boolean) => (this.loggedIn = value));
    this.token = localStorage.getItem('token');
    this.user = this.Token.payload(this.token);
    this.user = this.user.data.name;

    this.lesson = this.getLesson();
    this.qnNumber = this.getNumber();

    //get admin profile image
    let myFormData = new FormData();
    myFormData.append('name', this.user);
    myFormData.append('lesson', this.lesson);
    myFormData.append('qnNumber', this.qnNumber);

    this.Jarwis.getImage(myFormData).subscribe(
      (response: any) => {
        this.pic = response['Image'];
      },
      (error) => this.handleError(error)
    );

    this.Jarwis.getChoices(myFormData).subscribe((response: any) => {
      this.choices = response['choices'];
      if (response.status === 0) this.error = 'No Choices';
    });
  }

  //delete choice
  deleteChoice(question_number: any, lesson: any) {
    // console.log('lesson name: ', lesson);
    this.Jarwis.deleteChoice({ question_number: question_number, lesson: lesson }).subscribe((data) =>
      this.handleResponse(data)
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

