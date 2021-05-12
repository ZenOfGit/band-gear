import { AlertifyService } from './../../services/alertify.service';
import { IDrumKitBase } from './../../models/idrum-kit-base';
import { DrumKit } from './../../models/drum-kit';
import { DrumsService } from './../../services/drums.service';

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, } from '@angular/forms';
import { TabsetComponent } from 'ngx-bootstrap/tabs/public_api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-drum-add',
  templateUrl: './drum-add.component.html',
  styleUrls: ['./drum-add.component.css'],
})
export class DrumAddComponent implements OnInit {
  //@ViewChild('drumAddForm') drumAddForm: NgForm;
  @ViewChild('formTabs') formTabs: TabsetComponent;

  drumKit = new DrumKit();
  drumAddForm: FormGroup;
  nextClicked: boolean;

  //We will get these fromteh database later
  sonicTypes: Array<string> = ['Acoustic', 'Electric', 'Hybrid'];
  countryList: any; /*string[];  Array<string> = [
    'China',
    'Japan',
    'Korea',
    'Mexico',
    'Thailand',
    'USA',
  ]; */
  // We have already passed this variable to our card component with @Input
  // We will load the values ni our HTML template
  // When we want to keep any property xynched between model and view
  drumKitView: IDrumKitBase = {
    id: null,
    brand: null,
    name: null,
    description: null,
    year: null,
    countryOfOrigin: '',
    value: null,
  };

  constructor(
    private alertify: AlertifyService,
    private drumsService: DrumsService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createDrumAddForm();
    this.drumsService.getAllCountries().subscribe(data => {
      this.countryList = data;
      console.log(this.countryList);
      console.log(data);
    })
  }

  createDrumAddForm() {
    this.drumAddForm = this.fb.group({
      basicInfo: this.fb.group({
        kitOrSingle: [null, [Validators.required]],
        brand: [null, [Validators.required, Validators.minLength(2)]],
        name: [null, [Validators.required, Validators.minLength(2)]],
        model: [null],
        numPieces: [null],
        isElectric: [null],
        description: [null],
      }),

      desirability: this.fb.group({
        year: [null],
        countryOfOrigin: [null],
        value: [null],
        numDrums: [null],
        numCymbals: [null],
      }),

      enhancements: this.fb.group({
        skinsAreAftermarket: [null],
        brandOfSkins: [null],
        nameOfSkins: [null],
        cymbalsAreAftermarket: [null],
        brandOfCymbals: [null],
        nameOfCymbals: [null],
      }),

      accessories: this.fb.group({
        hasThrone: [null],
        brandOfThrone: [null],
        nameOfThrone: [null],
        hasBassPillow: [null],
        brandOfBassPillow: [null],
        nameOfBassPillow: [null],
      }),

      images: this.fb.group({
        image: [null],
      }),
    });
  }

  // #region <Getter Methods>
  // #region <Form Groups>
  get basicInfo() {
    return this.drumAddForm.controls.basicInfo as FormGroup;
  }

  get desirability() {
    return this.drumAddForm.controls.desirability as FormGroup;
  }

  get enhancements() {
    return this.drumAddForm.controls.enhancements as FormGroup;
  }

  get accessories() {
    return this.drumAddForm.controls.accessories as FormGroup;
  }

  // #endregion

  //#region <Form Controls>
  get kitOrSingle() {
    return this.basicInfo.controls.kitOrSingle as FormControl;
  }

  get brand() {
    return this.basicInfo.controls.brand as FormControl;
  }

  get name() {
    return this.basicInfo.controls.name as FormControl;
  }

  get model() {
    return this.basicInfo.controls.model as FormControl;
  }

  get numPieces() {
    return this.basicInfo.controls.numPieces as FormControl;
  }

  get isElectric() {
    return this.basicInfo.controls.isElectric as FormControl;
  }

  get description() {
    return this.basicInfo.controls.description as FormControl;
  }

  get year() {
    return this.desirability.controls.year as FormControl;
  }

  get countryOfOrigin() {
    return this.desirability.controls.countryOfOrigin as FormControl;
  }

  get value() {
    return this.desirability.controls.value as FormControl;
  }

  get numDrums() {
    return this.desirability.controls.numDrums as FormControl;
  }

  get numCymbals() {
    return this.desirability.controls.numCymbals as FormControl;
  }

  get skinsAreAftermarket() {
    return this.enhancements.controls.skinsAreAftermarket as FormControl;
  }

  get brandOfSkins() {
    return this.enhancements.controls.brandOfSkins as FormControl;
  }

  get nameOfSkins() {
    return this.enhancements.controls.nameOfSkins as FormControl;
  }

  get cymbalsAreAftermarket() {
    return this.enhancements.controls.cymbalsAreAftermarket as FormControl;
  }

  get brandOfCymbals() {
    return this.enhancements.controls.brandOfCymbals as FormControl;
  }

  get nameOfCymbals() {
    return this.enhancements.controls.nameOfCymbals as FormControl;
  }

  get hasThrone() {
    return this.accessories.controls.hasThrone as FormControl;
  }

  get brandOfThrone() {
    return this.accessories.controls.brandOfThrone as FormControl;
  }

  get nameOfThrone() {
    return this.accessories.controls.nameOfThrone as FormControl;
  }

  get hasBassPillow() {
    return this.accessories.controls.hasBassPillow as FormControl;
  }

  get brandOfBassPillow() {
    return this.accessories.controls.brandOfBassPillow as FormControl;
  }

  get nameOfBassPillow() {
    return this.accessories.controls.nameOfBassPillow as FormControl;
  }

  // #endregion
  // #endregion

  mapDrumkit(): void {
    this.drumKit.id = this.drumsService.newDrumId();
    this.drumKit.kitOrSingle = +this.kitOrSingle.value;
    this.drumKit.brand = this.brand.value;
    this.drumKit.name = this.name.value;
    this.drumKit.model = this.model.value;
    this.drumKit.numPieces = this.numPieces.value;
    this.drumKit.isElectric = this.isElectric.value;
    this.drumKit.description = this.description.value;
    this.drumKit.year = this.year.value;
    this.drumKit.countryOfOrigin = this.countryOfOrigin.value;
    this.drumKit.value = this.value.value;
    this.drumKit.numDrums = this.numDrums.value;
    this.drumKit.numCymbals = this.numCymbals.value;
    this.drumKit.skinsAreAftermarket = this.skinsAreAftermarket.value;
    this.drumKit.brandOfSkins = this.brandOfSkins.value;
    this.drumKit.nameOfSkins = this.nameOfSkins.value;
    this.drumKit.cymbalsAreAftermarket = this.cymbalsAreAftermarket.value;
    this.drumKit.brandOfCymbals = this.brandOfCymbals.value;
    this.drumKit.nameOfCymbals = this.nameOfCymbals.value;
    this.drumKit.hasThrone = this.hasThrone.value;
    this.drumKit.brandOfThrone = this.brandOfThrone.value;
    this.drumKit.nameOfThrone = this.nameOfThrone.value;
    this.drumKit.hasBassPillow = this.hasBassPillow.value;
    this.drumKit.brandOfBassPillow = this.brandOfBassPillow.value;
    this.drumKit.nameOfBassPillow = this.nameOfBassPillow.value;
    // this.drumKit.image = this.image.value;
  }

  allTabsValid(): boolean {
    //we only have validation in one tab so that is all we need for this, but we check all anyway
    if (this.basicInfo.invalid) {
      this.formTabs.tabs[0].active = true;
      return false;
    }
    if (this.desirability.invalid) {
      this.formTabs.tabs[1].active = true;
      return false;
    }
    if (this.enhancements.invalid) {
      this.formTabs.tabs[2].active = true;
      return false;
    }
    if (this.accessories.invalid) {
      this.formTabs.tabs[3].active = true;
      return false;
    }
    return true;
  }

  selectTab(nextTabId: number, isCurrentTabValid: boolean) {
    this.nextClicked = true;
    if (isCurrentTabValid) {
      this.formTabs.tabs[nextTabId].active = true;
    }
  }

  fillNulls() {
    // this is where we fill fields that are hidden from users when adding certain types of drum kits
    if (this.kitOrSingle.value == 2){
      this.drumKit.numPieces = 1;
      this.drumKit.numDrums = 1;
      this.drumKit.numCymbals = 0;
      this.drumKit.cymbalsAreAftermarket = false;
      this.drumKit.brandOfCymbals = "No cymbals";
      this.drumKit.nameOfCymbals = "No cymbals";
      this.drumKit.hasThrone = false;
      this.drumKit.brandOfThrone = "No throne";
      this.drumKit.nameOfThrone = "No throne";
      this.drumKit.hasBassPillow = false;
      this.drumKit.brandOfBassPillow = "No bass pillow";
      this.drumKit.nameOfBassPillow = "No bass pillow";
    }
    if (this.skinsAreAftermarket.value == false) {
      this.drumKit.brandOfSkins = "Original";
      this.drumKit.nameOfSkins = "Original";
    }
    if (this.cymbalsAreAftermarket.value == false) {
      this.drumKit.brandOfCymbals = "Original";
      this.drumKit.nameOfCymbals = "Original";
    }
    if (this.hasBassPillow.value == false) {
      this.drumKit.brandOfBassPillow = "No bass pillow";
      this.drumKit.nameOfBassPillow = "No bass pillow";
    }
    if (this.hasThrone.value == false) {
      this.drumKit.brandOfThrone = "No throne";
      this.drumKit.nameOfThrone = "No throne";
    }
  }

  onSubmit() {
    this.nextClicked = true;
    if (this.allTabsValid()) {
      this.mapDrumkit();
      console.log(this.drumKit);
      this.fillNulls();
      this.drumsService.addDrumKit(this.drumKit);
      this.alertify.success('Drum/kit listed successfully.');
      console.log(this.drumAddForm);
      if (this.kitOrSingle.value == 1) {
        this.router.navigate(['drums-kits']);
      } else {
        this.router.navigate(['drums-single']);
      }
    } else {
      this.alertify.error('Please review the form and make sure you have provided all valid entries.');
    }
  }
}
