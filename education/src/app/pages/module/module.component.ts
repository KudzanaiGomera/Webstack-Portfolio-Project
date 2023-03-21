import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';;
import { JarwisService } from 'src/app/services/jarwis.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.scss']
})
export class ModuleComponent implements OnInit {

  public loggedIn!: boolean;
  public users: any;
  public token: any;
  public username = '';
  public email: any;
  public modules: any;
  public topic: any;
  public grade: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private jarwis: JarwisService,
    private Token: TokenService,
    private Auth: AuthService,
  ) { }

  //get subject
  getTopic() {
    const topic = this.route.snapshot.paramMap.get('topic');
    return (topic);
  };

  //get grade
  getGrade() {
    const grade = this.route.snapshot.paramMap.get('grade');
    return (grade);
  };

  ngOnInit() {

    this.Auth.authStatus.subscribe(value => this.loggedIn = value);

    this.token = localStorage.getItem('token');
    this.users = this.Token.payload(this.token);
    this.username = this.users.data.name;
    this.email = this.users.data.email;

    this.topic = this.getTopic();
    this.grade = this.getGrade();


    //query topics by user purchase.
    this.jarwis.getModules({ 'topic': this.topic, 'grade': this.grade }).subscribe((response: any) => {
      this.modules = response['modules'];
    })

    setTimeout(
      function () {
        location.reload();
      }, 600000);

  }

}
