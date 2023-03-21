import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { JarwisService } from 'src/app/services/jarwis.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss'],
})
export class TopicComponent implements OnInit {
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
  public topics: any;
  public subject: any;
  public grade: any;

  constructor(
    private Jarwis: JarwisService,
    private Token: TokenService,
    private router: Router,
    private route: ActivatedRoute,
    private Auth: AuthService
  ) { }

  //get course name from url
  getName() {
    let subject = this.route.snapshot.paramMap.get('subject');
    return subject;
  }

  //get course name from url
  getGrade() {
    let grade = this.route.snapshot.paramMap.get('grade');
    return grade;
  }

  openTopic(topic: string) {
    let subject = this.route.snapshot.paramMap.get('subject');
    let grade = this.route.snapshot.paramMap.get('grade');
    console.log(subject);
    console.log(grade);
    this.router.navigate(['/subtopic', subject, grade, topic]);
  }

  ngOnInit() {
    this.Auth.authStatus.subscribe((value: boolean) => (this.loggedIn = value));
    this.token = localStorage.getItem('token');
    this.user = this.Token.payload(this.token);
    this.user = this.user.data.name;

    this.subject = this.getName();
    this.grade = this.getGrade();

    //get admin profile image
    let myFormData = new FormData();
    myFormData.append('name', this.user);

    this.Jarwis.getImage(myFormData).subscribe(
      (response: any) => {
        this.pic = response['Image'];
      },
      (error) => this.handleError(error)
    );

    this.Jarwis.getTopics({
      subject: this.subject,
      grade: this.grade,
    }).subscribe((response: any) => {
      this.topics = response['topics'];
    });
  }

  editTopic() {
    this.grade = this.getGrade();

    let myFormData = new FormData();
    myFormData.append('name', this.form.name);
    myFormData.append('newName', this.form.newName);
    myFormData.append('description', this.form.description);
    myFormData.append('grade', this.grade);

    this.Jarwis.editTopic(myFormData).subscribe(
      (success) => this.handleSuccess(success),
      (error) => this.handleError(error)
    );
  }

  deleteTopic(id: any) {
    this.Jarwis.deleteTopic({ id: id }).subscribe((data) =>
      this.handleResponse(data)
    );
  }

  onSubmit() {
    this.subject = this.getName();
    this.grade = this.getGrade();

    let myFormData = new FormData();
    myFormData.append('name', this.form.name);
    myFormData.append('description', this.form.description);
    myFormData.append('subject', this.subject);
    myFormData.append('grade', this.grade);

    this.Jarwis.addTopic(myFormData).subscribe(
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
