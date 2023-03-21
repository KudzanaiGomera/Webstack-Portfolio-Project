import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { JarwisService } from 'src/app/services/jarwis.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-subtopic',
  templateUrl: './subtopic.component.html',
  styleUrls: ['./subtopic.component.scss'],
})
export class SubtopicComponent implements OnInit {
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
  public subtopics: any;
  public subject: any;
  public grade: any;
  public topic: any;

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

  //get grade from url
  getGrade() {
    let grade = this.route.snapshot.paramMap.get('grade');
    return grade;
  }

  //get topic from url
  getTopic() {
    let topic = this.route.snapshot.paramMap.get('topic');
    return topic;
  }

  openSubTopic(subtopic: string) {
    let subject = this.route.snapshot.paramMap.get('subject');
    let grade = this.route.snapshot.paramMap.get('grade');
    let topic = this.route.snapshot.paramMap.get('topic');
    this.router.navigate(['/lesson', subject, grade, topic, subtopic]);
  }

  ngOnInit() {
    this.Auth.authStatus.subscribe((value: boolean) => (this.loggedIn = value));
    this.token = localStorage.getItem('token');
    this.user = this.Token.payload(this.token);
    this.user = this.user.data.name;

    this.subject = this.getName();
    this.grade = this.getGrade();
    this.topic = this.getTopic();

    //get admin profile image
    let myFormData = new FormData();
    myFormData.append('name', this.user);

    this.Jarwis.getImage(myFormData).subscribe(
      (response: any) => {
        this.pic = response['Image'];
      },
      (error) => this.handleError(error)
    );

    this.Jarwis.getSubTopics({
      subject: this.subject,
      grade: this.grade,
      topic: this.topic,
    }).subscribe((response: any) => {
      this.subtopics = response['subtopics'];
    });
  }

  deleteSubTopic(id: any) {
    this.Jarwis.deleteSubTopic({ id: id }).subscribe((data) =>
      this.handleResponse(data)
    );
  }

  editSubTopic() {
    this.subject = this.getName();
    this.grade = this.getGrade();
    this.topic = this.getTopic();

    let myFormData = new FormData();
    myFormData.append('name', this.form.name);
    myFormData.append('newName', this.form.newName);
    myFormData.append('description', this.form.description);
    myFormData.append('subject', this.subject);
    myFormData.append('topic', this.topic);
    myFormData.append('grade', this.grade);

    this.Jarwis.editSubTopic(myFormData).subscribe(
      (success) => this.handleSuccess(success),
      (error) => this.handleError(error)
    );
  }

  onSubmit() {
    this.subject = this.getName();
    this.grade = this.getGrade();
    this.topic = this.getTopic();

    let myFormData = new FormData();
    myFormData.append('name', this.form.name);
    myFormData.append('description', this.form.description);
    myFormData.append('subject', this.subject);
    myFormData.append('grade', this.grade);
    myFormData.append('topic', this.topic);

    this.Jarwis.addSubTopic(myFormData).subscribe(
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
