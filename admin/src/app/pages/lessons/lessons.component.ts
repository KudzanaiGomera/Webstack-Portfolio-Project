import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { JarwisService } from 'src/app/services/jarwis.service';
import { TokenService } from 'src/app/services/token.service';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.scss'],
})
export class LessonsComponent implements OnInit {
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
  public lessons: any;
  public subject: any;
  public grade: any;
  public topic: any;
  public subtopic: any;
  progress = 0;

  public selectedFile: any = null;

  constructor(
    private Jarwis: JarwisService,
    private Token: TokenService,
    private router: Router,
    private route: ActivatedRoute,
    private Auth: AuthService
  ) { }

  openLesson(lesson: string) {
    let subject = this.route.snapshot.paramMap.get('subject');
    let grade = this.route.snapshot.paramMap.get('grade');
    let topic = this.route.snapshot.paramMap.get('topic');
    let subtopic = this.route.snapshot.paramMap.get('subtopic');
    this.router.navigate([
      '/lesson-content',
      subject,
      grade,
      topic,
      subtopic,
      lesson,
    ]);
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile === null) {
      this.selectedFile = null;
    }
    console.log(this.selectedFile.name);
  }

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

  //get Topic from url
  getTopic() {
    let topic = this.route.snapshot.paramMap.get('topic');
    return topic;
  }

  //get Sub Topic from url
  getSubTopic() {
    let subtopic = this.route.snapshot.paramMap.get('subtopic');
    return subtopic;
  }

  openTopic(topic: string) {
    let subject = this.route.snapshot.paramMap.get('subject');
    let grade = this.route.snapshot.paramMap.get('grade');
    this.router.navigate(['/subtopic', subject, grade, topic]);
  }

  ngOnInit() {
    this.Auth.authStatus.subscribe((value: boolean) => (this.loggedIn = value));
    this.token = localStorage.getItem('token');
    this.user = this.Token.payload(this.token);
    this.user = this.user.data.name;

    this.subject = this.getName();
    this.grade = this.getGrade();
    this.topic = this.getTopic();
    this.subtopic = this.getSubTopic();

    //get admin profile image
    let myFormData = new FormData();
    myFormData.append('name', this.user);

    this.Jarwis.getImage(myFormData).subscribe(
      (response: any) => {
        this.pic = response['Image'];
      },
      (error) => this.handleError(error)
    );

    this.Jarwis.getLessons({
      subject: this.subject,
      grade: this.grade,
      topic: this.topic,
      subtopic: this.subtopic,
    }).subscribe((response: any) => {
      this.lessons = response['lessons'];
    });
  }

  deleteLesson(id: any) {
    this.Jarwis.deleteLesson({ id: id }).subscribe((data) =>
      this.handleResponse(data)
    );
  }

  editDescription() {
    this.subject = this.getName();
    this.grade = this.getGrade();
    this.topic = this.getTopic();
    this.subtopic = this.getSubTopic();

    let myFormData = new FormData();
    myFormData.append('name', this.form.name);
    myFormData.append('newName', this.form.newName);
    myFormData.append('description', this.form.description);
    myFormData.append('subject', this.subject);
    myFormData.append('topic', this.topic);
    myFormData.append('subtopic', this.subtopic);
    myFormData.append('grade', this.grade);

    this.Jarwis.editLesson(myFormData).subscribe(
      (success) => this.handleSuccess(success),
      (error) => this.handleError(error)
    );
  }

  editPreviewImage() {
    this.progress = 0;

    if (this.selectedFile === null) {
      this.error = 'Please select an image.';
    } else {
      this.subject = this.getName();
      this.grade = this.getGrade();
      this.topic = this.getTopic();
      this.subtopic = this.getSubTopic();

      let myFormData = new FormData();
      myFormData.append('file', this.selectedFile, this.selectedFile.name);
      myFormData.append('name', this.form.name);
      myFormData.append('description', this.form.description);
      myFormData.append('subject', this.subject);
      myFormData.append('grade', this.grade);
      myFormData.append('topic', this.topic);
      myFormData.append('subtopic', this.subtopic);

      this.Jarwis.editPreviewImage(myFormData).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round((100 * event.loaded) / event.total);
          }
        },
        (error) => this.handleError(error)
      );
    }
  }

  onSubmit() {
    this.progress = 0;

    if (this.selectedFile === null) {
      this.error = 'Please select an image.';
    } else {
      this.subject = this.getName();
      this.grade = this.getGrade();
      this.topic = this.getTopic();
      this.subtopic = this.getSubTopic();

      let myFormData = new FormData();
      myFormData.append('file', this.selectedFile, this.selectedFile.name);
      myFormData.append('name', this.form.name);
      myFormData.append('description', this.form.description);
      myFormData.append('subject', this.subject);
      myFormData.append('grade', this.grade);
      myFormData.append('topic', this.topic);
      myFormData.append('subtopic', this.subtopic);

      this.Jarwis.addLesson(myFormData).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round((100 * event.loaded) / event.total);
          }
        },
        (error) => this.handleError(error)
      );
    }
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
