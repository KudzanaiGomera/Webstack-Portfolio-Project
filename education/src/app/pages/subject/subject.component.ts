import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { JarwisService } from 'src/app/services/jarwis.service';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {

  public loggedIn!: boolean;
  public error: any;
  public success: any;
  public message = null;
  public subjects: any;

  constructor(
    private router: Router,
    private Jarwis: JarwisService,
    private Auth: AuthService,
  ) { }

  selectSubject(subject: any) {
    this.router.navigate(['/grade', subject]);
  }

  ngOnInit() {

    this.Auth.authStatus.subscribe(value => this.loggedIn = value);

    this.Jarwis.getSubjects().subscribe((response: any) => {
      this.subjects = response['subjects'];
    })

    setTimeout(
      function () {
        location.reload();
      }, 600000);
  }

}
