import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { JarwisService } from 'src/app/services/jarwis.service';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent implements OnInit {

  public loggedIn!: boolean;
  public users: any;
  public token: any;
  public username = '';
  public email: any;
  public module: any;
  public grade: any;
  public lessons: any;
  public lessons5: any;

  constructor(
    private route: ActivatedRoute,
    private Token: TokenService,
    private jarwis: JarwisService,
    private Auth: AuthService,
  ) { }

  customOptions: OwlOptions = {
    loop: true,
    margin: 10,
    autoWidth: true,
    autoHeight: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 5
      }
    },
    nav: true,
    lazyLoad: true,
  };

  PeopleViewing: OwlOptions = {
    loop: true,
    margin: 10,
    autoWidth: true,
    autoHeight: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 5
      }
    },
    nav: true,
    lazyLoad: true,
  }


  //get module
  getModule() {
    const module = this.route.snapshot.paramMap.get('module');
    return (module);
  };

  //get subject
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

    this.module = this.getModule();
    this.grade = this.getGrade();

    //query lessons by module.
    this.jarwis.getLessonsByModule({ 'subtopic': this.module, 'grade': this.grade }).subscribe((response: any) => {
      this.lessons = response['lessons'];
    })

    //query 5 topics latest.
    this.jarwis.getAllLessons().subscribe((response: any) => {
      this.lessons5 = response['alllessons'];
    })

    setTimeout(
      function () {
        location.reload();
      }, 600000);

  }

}
