import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
  NgxGalleryAnimation,
  NgxGalleryImage,
  NgxGalleryOptions,
} from '@kolkov/ngx-gallery';
import { Pedal } from './../../models/pedal';
import { PedalsService } from './../../services/pedals.service';

@Component({
  selector: 'app-pedal-detail',
  templateUrl: './pedal-detail.component.html',
  styleUrls: ['./pedal-detail.component.scss']
})
export class PedalDetailComponent implements OnInit {

  public pedalId: number;
  pedal = new Pedal();
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pedalsService: PedalsService
  ) { }

  ngOnInit() {
    this.pedalId = +this.route.snapshot.params['id'];

    this.route.params.subscribe(
      (params) => {
        this.pedalId = +params['id'];
        this.pedalsService.getPedal(this.pedalId).subscribe(
          (data: Pedal) => {
            this.pedal = data;
          });
      });

    this.galleryOptions = [
      {
        width: '100%',
        height: '450px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: true
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
      }
    ];
  }
}
