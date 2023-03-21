import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { JarwisService } from 'src/app/services/jarwis.service';
import { TokenService } from 'src/app/services/token.service';
import { HttpEventType } from '@angular/common/http';


@Component({
  selector: 'app-lesson-content',
  templateUrl: './lesson-content.component.html',
  styleUrls: ['./lesson-content.component.scss']
})
export class LessonContentComponent implements OnInit {

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
  public lesson: any;
  public subject: any;
  public grade: any;
  public topic: any;
  public subtopic: any;
  progress = 0;

  public selectedDocument: any = null;
  public selectedVideo: any = null;

  constructor(
    private Jarwis: JarwisService,
    private Token: TokenService,
    private router: Router,
    private route: ActivatedRoute,
    private Auth: AuthService,
  ) { }

  onDocumentSelected(event: any) {
    this.selectedDocument = event.target.files[0];
    if (this.selectedDocument === null) {
      this.selectedDocument = null;
    }
    console.log(this.selectedDocument.name);
  }

  onVideoSelected(event: any) {
    this.selectedVideo = event.target.files[0];
    if (this.selectedVideo === null) {
      this.selectedVideo = null;
    }
    console.log(this.selectedVideo.name);
  }

  //get course name from url
  getName() {
    let subject = this.route.snapshot.paramMap.get('subject');
    return (subject);
  };

  //get course name from url
  getGrade() {
    let grade = this.route.snapshot.paramMap.get('grade');
    return (grade);
  };

  //get Topic from url
  getTopic() {
    let topic = this.route.snapshot.paramMap.get('topic');
    return (topic);
  };

  //get Sub Topic from url
  getSubTopic() {
    let subtopic = this.route.snapshot.paramMap.get('subtopic');
    return (subtopic);
  };

  //get Sub Topic from url
  getLesson() {
    let lesson = this.route.snapshot.paramMap.get('lesson');
    return (lesson);
  };

  ngOnInit() {

    this.Auth.authStatus.subscribe((value: boolean) => this.loggedIn = value);
    this.token = localStorage.getItem('token');
    this.user = this.Token.payload(this.token);
    this.user = this.user.data.name;

    this.subject = this.getName();
    this.grade = this.getGrade();
    this.topic = this.getTopic();
    this.subtopic = this.getSubTopic();
    this.lesson = this.getLesson();

    //get admin profile image
    let myFormData = new FormData();
    myFormData.append('name', this.user);

    this.Jarwis.getImage(myFormData).subscribe((response: any) => {
      this.pic = response['Image'];
    },
      error => this.handleError(error),
    );

    this.Jarwis.getContents({ "subject": this.subject, "grade": this.grade, "topic": this.topic, "subtopic": this.subtopic, "lesson": this.lesson }).subscribe((response: any) => {
      this.lessons = response['lessons'];
    })
  }

  deleteContent(id: any) {
    this.Jarwis.deleteContent({ "id": id }).subscribe(
      data => this.handleResponse(data),
    );
  }

  onSubmit() {

    this.progress = 0;

    this.subject = this.getName();
    this.grade = this.getGrade();
    this.topic = this.getTopic();
    this.subtopic = this.getSubTopic();
    this.lesson = this.getLesson();

    let myFormData = new FormData();
    myFormData.append('video', this.selectedVideo, this.selectedVideo.name);
    myFormData.append('name', this.form.name);
    myFormData.append('subject', this.subject)
    myFormData.append('grade', this.grade)
    myFormData.append('topic', this.topic)
    myFormData.append('subtopic', this.subtopic)
    myFormData.append('lesson', this.lesson)

    this.Jarwis.uploadLesson(myFormData).subscribe(
      (event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        }
      },
      error => this.handleError(error),
    );

  }


  onSubmit2() {

    this.progress = 0;

    this.subject = this.getName();
    this.grade = this.getGrade();
    this.topic = this.getTopic();
    this.subtopic = this.getSubTopic();
    this.lesson = this.getLesson();

    let myFormData = new FormData();
    myFormData.append('document', this.selectedDocument, this.selectedDocument.name);
    myFormData.append('name', this.form.name);
    myFormData.append('subject', this.subject)
    myFormData.append('grade', this.grade)
    myFormData.append('topic', this.topic)
    myFormData.append('subtopic', this.subtopic)
    myFormData.append('lesson', this.lesson)

    this.Jarwis.uploadLesson(myFormData).subscribe(
      (event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        }
      },
      error => this.handleError(error),
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
