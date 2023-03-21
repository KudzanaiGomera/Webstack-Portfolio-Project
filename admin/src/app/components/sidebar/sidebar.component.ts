import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JarwisService } from 'src/app/services/jarwis.service';
import { TokenService } from 'src/app/services/token.service';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public token: any;
  public username = '';
  public subadmin: any;
  public role: any;

  constructor(
    private Jarwis: JarwisService,
    private router: Router,
    private Token: TokenService,
  ) { }

  ngOnInit() {

    this.token = localStorage.getItem('token');
    this.subadmin = this.Token.payload(this.token);
    this.role = this.subadmin.data.role;

    console.log('myrole: ', this.role);

  }

}
