import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { JarwisService } from 'src/app/services/jarwis.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.scss']
})

export class WatchComponent implements OnInit {

  public loggedIn!: boolean;
  public video: any;
  public topics: any;
  public users: any;
  public token: any;
  public username = '';
  public email: any;
  public videoid: any;
  public upNextVideo: any | undefined;
  public previousVideo: any | undefined;
  public done: any;
  public done2: any;
  public lesson: any;
  public details: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private Token: TokenService,
    private jarwis: JarwisService,
    private Auth: AuthService,
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  //get subject
  getVideoId() {
    const vid = this.route.snapshot.paramMap.get('id');
    return (vid);
  };

  book(module: any) {
    this.router.navigate(["/book", module])
      .then(() => {
        window.location.reload();
      });
  }

  prev(id: any) {
    console.log(id);
    this.router.navigate(["/watch", id])
      .then(() => {
        window.location.reload();
      });
  }

  quiz(name: any) {
    // console.log(name);
    this.videoid = this.getVideoId();
    this.router.navigate(["/quiz", 1, name])
      .then(() => {
        window.location.reload();
      });
  }

  ngOnInit() {

    this.Auth.authStatus.subscribe(value => this.loggedIn = value);

    // bug fix due js only working on refresh
    this.loadScript('assets/js/script.js');

    this.token = localStorage.getItem('token');
    this.users = this.Token.payload(this.token);
    this.username = this.users.data.name;
    this.email = this.users.data.email;

    this.videoid = this.getVideoId();
    // console.log(this.video);

    // get video by id sent from on click
    this.jarwis.watch({ 'video_id': this.videoid }).subscribe((res: any) => {
      this.video = res['video'];
    });


    //post video_id to get next video in the topic
    this.jarwis.getUpNext({ 'id': this.videoid }).subscribe((response: any) => {
      this.upNextVideo = response.video;
      if (this.upNextVideo === undefined || this.upNextVideo.length === 0) {
        this.done2 = 1;
        // console.log(this.done2);
      }
    });

    //post video_id to get prev video in the topic
    this.jarwis.getPrevious({ 'id': this.videoid }).subscribe((response: any) => {
      this.previousVideo = response.video;
      // console.log(this.previousVideo);
      if (this.previousVideo === undefined || this.previousVideo.length === 0) {
        this.done = 1;
      }
    });

    // get content details
    this.jarwis.getContentDetails({ "id": this.videoid }).subscribe((response: any) => {
      this.details = response['details'];
    })

  }

  // load js file in components
  loadScript(url: string) {
    const body = <HTMLDivElement>document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }

}
