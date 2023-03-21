import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  public loggedIn!: boolean;
  loading = false;
  returnUrl: string;

  constructor(
    private Auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.Auth.authStatus.subscribe((value) => (this.loggedIn = value));
    // console.log('am l logged in', this.loggedIn);
    if (!this.loggedIn === true) {
      this.router.navigate(['/login']);
    }
    this.router.navigate(['/home']);
  }
}
