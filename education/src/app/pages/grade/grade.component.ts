import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { JarwisService } from 'src/app/services/jarwis.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-grade',
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.scss']
})
export class GradeComponent implements OnInit {

  public loggedIn!: boolean;
  public error: any;
  public success: any;
  public message = null;
  public subject: any;
  public grades: any;
  public token: any;
  public users: any;
  public username: any;
  public email: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private Jarwis: JarwisService,
    private Token: TokenService,
    private Auth: AuthService,
  ) { }

  //get subject
  getSubject() {
    const sub = this.route.snapshot.paramMap.get('subject');
    return (sub);
  };

  selectGrade(grade: any) {
    const subject = this.getSubject();
    this.router.navigate(['/topic', subject, grade]);
  }

  ngOnInit() {
    this.token = localStorage.getItem('token');
    this.users = this.Token.payload(this.token);
    this.username = this.users.data.name;
    this.email = this.users.data.email;

    this.subject = this.getSubject();
    this.Jarwis.getGrade({ "subject": this.subject, "username": this.email }).subscribe((response: any) => {
      this.grades = response['grades'];
    })

    setTimeout(
      function () {
        location.reload();
      }, 600000);
  }

}
