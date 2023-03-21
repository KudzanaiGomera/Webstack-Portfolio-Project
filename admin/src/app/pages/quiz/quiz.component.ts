import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { JarwisService } from 'src/app/services/jarwis.service';
import { TokenService } from 'src/app/services/token.service';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit {
  public form = {
    // quiz_name: '',
    question_number: null,
    question_text: '',
    choice1: null,
    choice2: null,
    choice3: null,
    choice4: null,
    correct_choice: null,
    selectedOption: null,
  };

  public loggedIn: boolean = false;
  public token: any;
  public user: any;
  public pic: any;

  public error: any;
  public success: any;
  public message = null;
  public lessons: any;
  public questions: any;
  progress = 0;

  constructor(
    private Jarwis: JarwisService,
    private Token: TokenService,
    private router: Router,
    private route: ActivatedRoute,
    private Auth: AuthService
  ) { }

  openLesson(lesson: string) {
    this.router.navigate(['/create-quiz', lesson]);
  }

  viewChoices(lesson: string, qnNumber: string) {
    this.router.navigate(['/choices', lesson, qnNumber]);
  }

  onSubmit() {
    this.Jarwis.addQuiz(this.form).subscribe(
      (success) => this.handleSuccess(success),
      (error) => this.handleError(error)
    );
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

    this.Jarwis.listLessons().subscribe((response: any) => {
      this.lessons = response['lessons'];
    });

    this.Jarwis.getQuestion().subscribe((response: any) => {
      this.questions = response['questions'];
      if (response.status === 0) this.error = 'No Questions';
    });
  }

  //delete each campaign
  deleteQuestion(id: any, lesson: any) {
    // console.log('lesson name: ', lesson);
    this.Jarwis.deleteQuestion({ id: id, lesson: lesson }).subscribe((data) =>
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
