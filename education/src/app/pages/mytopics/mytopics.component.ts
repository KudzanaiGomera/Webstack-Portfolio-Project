import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { JarwisService } from 'src/app/services/jarwis.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

import { of, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-mytopics',
  templateUrl: './mytopics.component.html',
  styleUrls: ['./mytopics.component.scss'],
})
export class MytopicsComponent implements OnInit {
  public loggedIn!: boolean;
  public users: any;
  public token: any;
  public username = '';
  public email: any;
  public courses: any;
  public othercourses: any;
  public subject: any;
  public grade: any;
  public unPaidTopics: any;
  public amount: any;
  public error: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private jarwis: JarwisService,
    private Token: TokenService,
    private Auth: AuthService
  ) { }

  //get subject
  getSubject() {
    const subject = this.route.snapshot.paramMap.get('subject');
    return subject;
  }

  //get grade
  getGrade() {
    const grade = this.route.snapshot.paramMap.get('grade');
    return grade;
  }

  removeFromCart(subject, grade, topic) {
    this.token = localStorage.getItem('token');
    this.users = this.Token.payload(this.token);
    this.username = this.users.data.name;
    this.email = this.users.data.email;

    //query topics by user purchase.
    this.jarwis
      .removeFromCart({
        subject: subject,
        grade: grade,
        topic: topic,
        email: this.email,
      })
      .subscribe();

    window.location.reload();
  }

  checkoutTopic(subject: any, grade: any, topic: any) {
    this.amount = 450;

    this.token = localStorage.getItem('token');
    this.users = this.Token.payload(this.token);
    this.username = this.users.data.name;
    this.email = this.users.data.email;

    let myFormData = new FormData();
    myFormData.append('subject', subject);
    myFormData.append('topic', topic);
    myFormData.append('grade', grade);
    myFormData.append('amount', this.amount);
    myFormData.append('email', this.email);

    this.jarwis.payTopic(myFormData).subscribe(
      (response: any) => { },
      (error) => this.handleError(error)
    );

    //navigate to payment after adding the content to DB
    this.router
      .navigate(['/purchase-topic', subject, grade, topic])
      .then(() => {
        window.location.reload();
      });
  }

  ngOnInit() {
    this.Auth.authStatus.subscribe((value) => (this.loggedIn = value));

    this.token = localStorage.getItem('token');
    this.users = this.Token.payload(this.token);
    this.username = this.users.data.name;
    this.email = this.users.data.email;

    this.subject = this.getSubject();
    this.grade = this.getGrade();

    //query topics by user purchase.
    this.jarwis
      .getTopicsBySubject({
        subject: this.subject,
        grade: this.grade,
        email: this.email,
      })
      .subscribe((response: any) => {
        this.courses = response['courses'];
      });

    //query topics clicked but not paid for.
    this.jarwis
      .getUnPaidTopics({
        subject: this.subject,
        email: this.email,
      })
      .subscribe((response: any) => {
        this.unPaidTopics = response['topics'];
      });

    //query topics of same subject not purchased
    this.jarwis
      .getOtherTopicsBySubject({
        email: this.email,
        subject: this.subject,
        grade: this.grade,
      })
      .subscribe((response: any) => {
        this.othercourses = response['courses'];
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
