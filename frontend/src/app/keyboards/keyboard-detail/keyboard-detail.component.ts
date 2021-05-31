import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
  NgxGalleryAnimation,
  NgxGalleryImage,
  NgxGalleryOptions,
} from '@kolkov/ngx-gallery';
import { Keyboard } from 'src/app/models/keyboard';
import { KeyboardsService } from 'src/app/services/keyboards.service';

@Component({
  selector: 'app-keyboard-detail',
  templateUrl: './keyboard-detail.component.html',
  styleUrls: ['./keyboard-detail.component.scss'],
})
export class KeyboardDetailComponent implements OnInit {
  public keyboardId: number;
  keyboard = new Keyboard();
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private keyboardsService: KeyboardsService
  ) {}

  ngOnInit() {
    this.keyboardId = +this.route.snapshot.params['id'];

    this.route.data.subscribe(
      (data: Keyboard) => {
        this.keyboard = data['kbd'];
      }
    );

/*     this.route.params.subscribe(
      (params) => {
        this.keyboardId = +params['id'];
        this.keyboardsService.getKeyboard(this.keyboardId).subscribe(
          (data: Keyboard) => {
            this.keyboard = data;
          });
      }); */

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
      },
    ];
  }
}
