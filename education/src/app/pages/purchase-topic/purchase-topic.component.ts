import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { JarwisService } from 'src/app/services/jarwis.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-purchase-topic',
  templateUrl: './purchase-topic.component.html',
  styleUrls: ['./purchase-topic.component.scss'],
})
export class PurchaseTopicComponent implements OnInit {
  public loggedIn!: boolean;
  public subject: any;
  public error: any;
  public topic: any;
  public grade: any;
  public amount: any;
  public token: any;
  public users: any;
  public user: any;
  public username = '';
  public email: any;
  public content_id: any | undefined;

  constructor(
    private route: ActivatedRoute,
    private Token: TokenService,
    private Auth: AuthService,
    private router: Router,
    private Jarwis: JarwisService
  ) { }

  //get topic
  getTopic() {
    const topic = this.route.snapshot.paramMap.get('topic');
    return topic;
  }

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

  success(id: any) {
    this.amount = 450;

    this.token = localStorage.getItem('token');
    this.users = this.Token.payload(this.token);
    this.username = this.users.data.name;
    this.email = this.users.data.email;

    this.subject = this.getSubject();
    this.topic = this.getTopic();
    this.grade = this.getGrade();

    let myFormData = new FormData();
    myFormData.append('id', id);
    myFormData.append('amount', this.amount);
    myFormData.append('email', this.email);
    myFormData.append('subject', this.subject);
    myFormData.append('topic', this.topic);
    myFormData.append('grade', this.grade);

    this.Jarwis.payTopicEft(myFormData).subscribe(
      (data) => this.handleResponse(data),
      (error) => this.handleError(error)
    );
  }

  ngOnInit() {
    this.Auth.authStatus.subscribe((value) => (this.loggedIn = value));

    this.token = localStorage.getItem('token');
    this.users = this.Token.payload(this.token);
    this.email = this.users.data.email;

    this.subject = this.getSubject();
    this.topic = this.getTopic();
    this.grade = this.getGrade();

    let myFormData = new FormData();
    myFormData.append('subject', this.subject);
    myFormData.append('topic', this.topic);
    myFormData.append('grade', this.grade);
    myFormData.append('email', this.email);

    this.Jarwis.getId(myFormData).subscribe((response: any) => {
      this.content_id = response['content_Id'];
    });

    setTimeout(
      function () {
        location.reload();
      }, 600000);
  }

  handleError(error: any) {
    this.error = error.error.error;
  }

  handleResponse(data: any) {
    this.token = localStorage.getItem('token');
    // this.Token.handle(data.access_token);
    this.router.navigate(['/verify-eft', this.token]);
  }
}
