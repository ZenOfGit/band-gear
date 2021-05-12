import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
  NgxGalleryAnimation,
  NgxGalleryImage,
  NgxGalleryOptions,
} from '@kolkov/ngx-gallery';
import { DrumKit } from './../../models/drum-kit';
import { DrumsService } from './../../services/drums.service';

@Component({
  selector: 'app-drum-detail',
  templateUrl: './drum-detail.component.html',
  styleUrls: ['./drum-detail.component.scss'],
})
export class DrumDetailComponent implements OnInit {

  public drumKitId: number;
  drumKit = new DrumKit();
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private drumsService: DrumsService
  ) {}

  ngOnInit() {
    this.drumKitId = +this.route.snapshot.params['id'];
    this.route.data.subscribe(
      (data: DrumKit) => {
        this.drumKit = data['drm'];

        // the following was commented out in order to use the route resolver with teh above code
/*     this.route.params.subscribe(
      (params) => {
        this.drumKitId = +params['id'];
        this.drumsService.getDrumKit(this.drumKitId).subscribe(
          (data: DrumKit) => {
            this.drumKit = data;
          }, error => this.router.navigate(['/'])
          ); */
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
