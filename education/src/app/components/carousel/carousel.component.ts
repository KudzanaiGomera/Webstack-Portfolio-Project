import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit {
  public lessons = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  constructor() {}

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
    navText: [
      '<i class="fa fa-angle-left"></i>',
      '<i class="fa fa-angle-right"></i>',
    ],
    responsive: {
      0: {
        items: 2,
      },
      400: {
        items: 2.5,
      },
      740: {
        items: 3,
      },
      840: {
        items: 4,
      },
      940: {
        items: 5,
      },
      1000: {
        items: 4.8,
      },
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
    navText: [
      '<i class="fa fa-angle-left"></i>',
      '<i class="fa fa-angle-right"></i>',
    ],
    responsive: {
      0: {
        items: 2,
      },
      400: {
        items: 2.5,
      },
      740: {
        items: 3,
      },
      940: {
        items: 5,
      },
      1000: {
        items: 4.8,
      },
    },
    nav: true,
    lazyLoad: true,
  };

  ngOnInit(): void {}
}
