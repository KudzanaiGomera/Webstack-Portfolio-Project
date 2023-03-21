import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { JarwisService } from 'src/app/services/jarwis.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss'],
})
export class TopicComponent implements OnInit {
  public loggedIn!: boolean;
  public error: any;
  public success: any;
  public message = null;
  public topics: any;
  public subject: any;
  public grade: any;

  public token: any;
  public users: any;
  public user: any;
  public username = '';
  public email: any;

  public today: any;
  public dd: any;
  public mm: any;
  public yyyy: any;
  public billing: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private Jarwis: JarwisService,
    private Auth: AuthService,
    private Token: TokenService
  ) { }

  //get subject
  getSubject() {
    const sub = this.route.snapshot.paramMap.get('subject');
    return sub;
  }

  //get subject
  getGrade() {
    const sub = this.route.snapshot.paramMap.get('grade');
    return sub;
  }

  ngOnInit() {
    this.Auth.authStatus.subscribe((value) => (this.loggedIn = value));

    //query topics by subject and grade.
    this.subject = this.getSubject();
    this.grade = this.getGrade();
    this.Jarwis.getTopics({
      subject: this.subject,
      grade: this.grade,
    }).subscribe((response: any) => {
      this.topics = response['topics'];
    });
  }

  //adding the Subject, grade and topic to the DB
  checkout(topic: any) {
    const subject = this.getSubject();
    const grade = this.getGrade();

    this.token = localStorage.getItem('token');
    this.users = this.Token.payload(this.token);
    this.username = this.users.data.name;
    this.email = this.users.data.email;

    let myFormData = new FormData();
    myFormData.append('subject', this.subject);
    myFormData.append('topic', topic);
    myFormData.append('grade', this.grade);
    myFormData.append('email', this.email);

    this.Jarwis.checkout(myFormData).subscribe(
      (response: any) => { },
      (error) => this.handleError(error)
    );

    //navigate to payment after adding the content to DB
    this.router.navigate(['/payment', subject, grade, topic]).then(() => {
      window.location.reload();
    });

    setTimeout(
      function () {
        location.reload();
      }, 600000);
  }

  handleError(error: any) {
    this.error = error.error.error;
  }
}
