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
  showButtons = false;
  showDoubleKnobs = false;
  showKnobs = false;
  showToggleSwitches = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pedalsService: PedalsService
  ) { }

  ngOnInit() {
    this.pedalId = +this.route.snapshot.params['id'];

    this.route.data.subscribe(
      (data: Pedal) => {
        this.pedal = data['pdl'];
        this.buttonsChecked();  //  these must happen inside the subscribe
        this.knobsChecked();
        this.toggleSwitchesChecked();
      }
    );


/*     this.route.params.subscribe(
      (params) => {
        this.pedalId = +params['id'];
        this.pedalsService.getPedal(this.pedalId).subscribe(
          (data: Pedal) => {
            this.pedal = data;
            console.log("here is teh data: " + data);
            this.buttonsChecked();  //  these must happen inside the subscribe
            this.knobsChecked();
            this.toggleSwitchesChecked();
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
      }
    ];
  }

  buttonsChecked() {
    if (this.pedal.buttonOnOff
      || this.pedal.buttonEffect
      || this.pedal.buttonUpDown) {
      this.showButtons = true;
    }
  }

  doubleKnobsChecked() {
    if (this.pedal.knobDoubleA) {
      this.showDoubleKnobs = true;
    }
  }

  knobsChecked() {
    if (this.pedal.knobBalance
      || this.pedal.knobDecayRate
      || this.pedal.knobDelay
      || this.pedal.knobDepth
      || this.pedal.knobDirectSignal
      || this.pedal.knobDistortion
      || this.pedal.knobEQ
      || this.pedal.knobFeedRamp
      || this.pedal.knobFilter
      || this.pedal.knobForm
      || this.pedal.knobGain
      || this.pedal.knobLevel
      || this.pedal.knobMix
      || this.pedal.knobMode
      || this.pedal.knobOctaveDown
      || this.pedal.knobOctaveUp
      || this.pedal.knobOverdrive
      || this.pedal.knobPeak
      || this.pedal.knobRate
      || this.pedal.knobRegen
      || this.pedal.knobResonance
      || this.pedal.knobSustain
      || this.pedal.knobTone
      || this.pedal.knobVolume
      || this.pedal.knobOthers) {
      this.showKnobs = true;
    }
  }

  toggleSwitchesChecked() {
    if (this.pedal.toggleMode
      || this.pedal.togglePreset
      || this.pedal.toggleRange
      || this.pedal.toggleStage
      || this.pedal.toggleLeftWaveShape
      || this.pedal.toggleRightWaveShape) {
      this.showToggleSwitches = true;
    }
  }
}


