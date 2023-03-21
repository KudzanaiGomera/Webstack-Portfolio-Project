import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { JarwisService } from 'src/app/services/jarwis.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-course-modal',
  templateUrl: './course-modal.component.html',
  styleUrls: ['./course-modal.component.scss']
})
export class CourseModalComponent implements OnInit {

  public loggedIn!: boolean;
  public video: any;
  public topics: any;
  public users: any;
  public token: any;
  public username = '';
  public email: any;
  public videoid: any;
  public lesson: any;
  public contents: any;
  public grade: any;
  public topic: any;
  public subtopic: any;
  public upNextVideo: any | undefined;
  public previousVideo: any | undefined;
  public done: any;
  public done2: any;
  public details: any;
  public numberofContent: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private Token: TokenService,
    private jarwis: JarwisService,
    private Auth: AuthService,
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  //get course name from url
  getGrade() {
    let grade = this.route.snapshot.paramMap.get('grade');
    return (grade);
  };

  //get Sub Topic from url
  getSubTopic() {
    let subtopic = this.route.snapshot.paramMap.get('subtopic');
    return (subtopic);
  };

  getLesson() {
    const lesson = this.route.snapshot.paramMap.get('lesson');
    return (lesson);
  };

  ngOnInit() {

    this.Auth.authStatus.subscribe(value => this.loggedIn = value);

    this.token = localStorage.getItem('token');
    this.users = this.Token.payload(this.token);
    this.username = this.users.data.name;
    this.email = this.users.data.email;

    this.grade = this.getGrade();
    this.subtopic = this.getSubTopic();
    this.lesson = this.getLesson();

    // get lesson contents
    this.jarwis.getContentByLesson({ "grade": this.grade, "topic": this.topic, "subtopic": this.subtopic, "lesson": this.lesson }).subscribe((response: any) => {
      this.contents = response['lessons'];
      this.numberofContent = this.contents.length
    })

    // get lesson contents
    this.jarwis.getLessonDetails({ "lesson": this.lesson }).subscribe((response: any) => {
      this.details = response['details'];
    })

    setTimeout(
      function () {
        location.reload();
      }, 600000);

  }

}

