import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { JarwisService } from 'src/app/services/jarwis.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  public loggedIn!: boolean;
  public users: any;
  public videoid: any;
  public upNextVideo: any;
  public done: any;
  public success: any;
  public message: any
  public quiz: any | undefined;
  public question: any | undefined;
  public questionNo: any;
  public total: any;
  public username: any;
  public error = '';
  public token: any;
  public next: any;
  public lesson: any;
  public done2: any;
  public score: any;
  public pass: any;
  public fail: any;
  public percentage: any;
  public quizTotal: any;
  public details: any;

  public form = {
    choice: '',
    number: '',
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private Token: TokenService,
    private jarwis: JarwisService,
    private Auth: AuthService,
  ) { this.router.routeReuseStrategy.shouldReuseRoute = () => false; }


  //get next value
  getn() {
    let n = this.route.snapshot.paramMap.get('n');
    return (n);
  };

  //get current video from url
  getLesson() {
    let name = this.route.snapshot.paramMap.get('lesson');
    return (name);
  };

  resetScore() {

    this.token = localStorage.getItem('token');
    this.users = this.Token.payload(this.token);
    this.users = this.users.data;

    this.username = this.users.name;

    //get current video per total
    this.lesson = this.getLesson();

    // console.log(this.lesson)

    this.jarwis.resetScore({ "lesson": this.lesson, "username": this.username }).subscribe((response: any) => {
      this.score = response['scores'];
    });
  }

  onSubmit(number: any) {

    this.token = localStorage.getItem('token');
    this.users = this.Token.payload(this.token);
    this.users = this.users.data;

    this.username = this.users.name;
    this.form.number = number;

    let myFormData = new FormData();
    myFormData.append('number', this.form.number);
    myFormData.append('choice', this.form.choice);
    myFormData.append('user', this.username);
    myFormData.append('lesson', this.lesson);

    this.jarwis.process(myFormData).subscribe((response: any) => {
      this.next = response.next;
      this.message = response.message;
      if (response.message) {
        this.success = 'next question'
      }
    }
    );
  }


  ngOnInit() {

    this.Auth.authStatus.subscribe(value => this.loggedIn = value);

    this.token = localStorage.getItem('token');
    this.users = this.Token.payload(this.token);
    this.users = this.users.data;

    this.username = this.users.name;

    this.next = this.getn();

    //get current video per total
    this.lesson = this.getLesson();
    console.log(this.lesson);


    //get the quiz and answers
    this.jarwis.get_quiz({ "next": this.next, "lesson": this.lesson }).subscribe((response: any) => {
      this.question = response.question_text;
      this.lesson = response.lesson;
      this.questionNo = response.question_number;
      this.total = response.total_questions;

      // this.next = response.next_question;
      // console.log(this.question);

      this.quiz = response['choices'];
      if (response.status === 0) {
        this.error = "Congratulations! Module complete.";
      }
    });

    //post video_id to get next video in the course
    // this.jarwis.getUpNext({ 'id': this.videoid }).subscribe((response: any) => {
    //   this.upNextVideo = response.video;
    //   if (this.upNextVideo === undefined || this.upNextVideo.length === 0) {
    //     this.done = 'Congratulations! Module complete.';
    //   }
    // });

    //get scores
    this.jarwis.getScore({ "lesson": this.lesson, "username": this.username }).subscribe((response: any) => {
      this.score = response.score;
      this.total = response.total;
      this.quizTotal = response.total;

      console.log('total before if states: ', this.total);

      if (this.score === this.total) {
        // console.log("Passed");
        this.pass = "Passed";
        this.total = response.total;
        this.percentage = Math.round((this.score / this.total) * 100);
      } else if (this.score > this.total) {
        //reinitialize both to make sure score will never be above total incase the student pass and try to retake quiz
        this.score = this.total;
        this.total = response.total;
        this.pass = "Passed";
        this.percentage = Math.round((this.score / this.total) * 100);
      } else if (this.score < this.total) {
        // console.log("failed");
        this.fail = "Failed";
        this.total = response.total;
        this.percentage = Math.round((this.score / this.total) * 100);
      } else {
        this.pass = "Passed";
        this.percentage = Math.round((this.score / this.total) * 100);
      }

    });

    // get lesson contents
    this.jarwis.getLessonDetails({ "lesson": this.lesson }).subscribe((response: any) => {
      this.details = response['details'];
    })

  }

}
