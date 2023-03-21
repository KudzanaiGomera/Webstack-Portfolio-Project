import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { JarwisService } from 'src/app/services/jarwis.service';
import { TokenService } from 'src/app/services/token.service';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.scss']
})
export class CreateQuizComponent implements OnInit {

  public form = {

    name: '',
    description: ''
  }

  public loggedIn: boolean = false;
  public token: any;
  public user: any;
  public pic: any;

  public error: any;
  public success: any;
  public message = null;
  public lessons: any;
  public lesson: any
  public subject: any;
  public grade: any;
  public topic: any;
  public subtopic: any;
  progress = 0;

  public selectedFile: any = null;
  public selectedVideo: any = null;

  constructor(
    private Jarwis: JarwisService,
    private Token: TokenService,
    private router: Router,
    private route: ActivatedRoute,
    private Auth: AuthService,
  ) { }

  //get lesson name from url
  getLesson() {
    let lesson = this.route.snapshot.paramMap.get('lesson');
    return (lesson);
  };

  openLesson(lesson: string) {
    this.router.navigate(['/create-quiz', lesson]);
  }

  ngOnInit() {

    this.Auth.authStatus.subscribe((value: boolean) => this.loggedIn = value);
    this.token = localStorage.getItem('token');
    this.user = this.Token.payload(this.token);
    this.user = this.user.data.name;

    //get admin profile image
    let myFormData = new FormData();
    myFormData.append('name', this.user);

    this.Jarwis.getImage(myFormData).subscribe((response: any) => {
      this.pic = response['Image'];
    },
      error => this.handleError(error),
    );

    this.lesson = this.getLesson();

    this.Jarwis.listLessons().subscribe((response: any) => {
      this.lessons = response['lessons'];
    })
  }

  // deleteQuiz(id: any) {
  //   this.Jarwis.deleteQuiz({ "id": id }).subscribe(
  //     data => this.handleResponse(data),
  //   );
  // }

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
