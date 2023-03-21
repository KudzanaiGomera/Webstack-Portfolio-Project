import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { JarwisService } from 'src/app/services/jarwis.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-verify-eft',
  templateUrl: './verify-eft.component.html',
  styleUrls: ['./verify-eft.component.scss'],
})
export class VerifyEftComponent implements OnInit {
  public token: any;

  constructor(private route: ActivatedRoute) {}

  //get topic
  getToken() {
    const mytoken = this.route.snapshot.paramMap.get('token');
    return mytoken;
  }

  ngOnInit() {
    this.token = this.getToken();
    localStorage.setItem('token', this.token);
  }
}
