import { GuitarsService } from './../../services/guitars.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  NgxGalleryAnimation,
  NgxGalleryImage,
  NgxGalleryOptions,
} from '@kolkov/ngx-gallery';
import { Guitar } from 'src/app/models/guitar';

@Component({
  selector: 'app-guitar-detail',
  templateUrl: './guitar-detail.component.html',
  styleUrls: ['./guitar-detail.component.scss'],
})

export class GuitarDetailComponent implements OnInit {

  public guitarId: number;
  guitar = new Guitar();
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private guitarsService: GuitarsService
  ) {}

  ngOnInit(): void {
    this.guitarId = +this.route.snapshot.params['id'];

    this.route.params.subscribe(
      (params) => {
      this.guitarId = +params['id'];
      this.guitarsService.getGuitar(this.guitarId).subscribe(
        (data: Guitar) => {
        this.guitar = data;
      });
    });

    this.galleryOptions = [
      {
        width: '600px',
        height: '400px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20,
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false,
      },
    ];

    this.galleryImages = [
      {
        small: 'assets/images/drums/lud-accent-1.png',
        medium: 'assets/images/drums/lud-accent-1.png',
        big: 'assets/images/drums/lud-accent-1.png',
      },
      {
        small: 'assets/images/drums/lud-accent-2.png',
        medium: 'assets/images/drums/lud-accent-2.png',
        big: 'assets/images/drums/lud-accent-2.png',
      },
      {
        small: 'assets/images/drums/lud-accent-3.png',
        medium: 'assets/images/drums/lud-accent-3.png',
        big: 'assets/images/drums/lud-accent-3.png',
      },
      {
        small: 'assets/images/drums/lud-accent-4.png',
        medium: 'assets/images/drums/lud-accent-4.png',
        big: 'assets/images/drums/lud-accent-4.png',
      },
      {
        small: 'assets/images/drums/lud-accent-5.png',
        medium: 'assets/images/drums/lud-accent-5.png',
        big: 'assets/images/drums/lud-accent-5.png',
      },
    ];
  }
}
