import { IPedalBase } from './../../models/ipedal-base';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs/public_api';
import { Pedal } from 'src/app/models/pedal';
import { AlertifyService } from 'src/app/services/alertify.service';
import { PedalsService } from 'src/app/services/pedals.service';

@Component({
  selector: 'app-pedal-add',
  templateUrl: './pedal-add.component.html',
  styleUrls: ['./pedal-add.component.css']
})
export class PedalAddComponent implements OnInit {

  @ViewChild('formTabs') formTabs: TabsetComponent;

  pedal = new Pedal();
  pedalAddForm: FormGroup;
  nextClicked: boolean;
  countryList: any;

  pedalView: IPedalBase = {
    id: null,
    digiOrAnalog: null,
    isTrueBypass: null,
    brand: null,
    name: null,
    description: null,
    year: null,
    countryOfOrigin: '',
    value: null,
    forBassOrGuitar: null,
  }

  constructor(
    private alertify: AlertifyService,
    private pedalsService: PedalsService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createPedalAddForm();
    this.pedalsService.getAllCountries().subscribe(data => {
      this.countryList = data;
    })
  }

  createPedalAddForm() {
    this.pedalAddForm = this.fb.group({
      basicInfo: this.fb.group({
        digiOrAnalog: [null],
        isTrueBypass: [null],
        brand: [null],
        name: [null],
        model: [null],
        numKnobs: [null],
        formFactor: [null],
        description: [null]
      }),

      desirability: this.fb.group({
        year: [null],
        countryOfOrigin: [null],
        value: [null],
        isModded: [null]
      }),

      features: this.fb.group({
        forBassOrGuitar: [null],
        isStereo: [null]
      }),

      accessories: this.fb.group({
        case: [null]
      }),

      images: this.fb.group({
        image: [null]
      }),
    });
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
    if (this.features.invalid) {
      this.formTabs.tabs[2].active = true;
      return false;
    }
    if (this.accessories.invalid) {
      this.formTabs.tabs[3].active = true;
      return false;
    }
    return true;
  }

    // #region <Getter Methods>
  // #region <Form Groups>
  get basicInfo() {
    return this.pedalAddForm.controls.basicInfo as FormGroup;
  }

  get desirability() {
    return this.pedalAddForm.controls.desirability as FormGroup;
  }

  get features() {
    return this.pedalAddForm.controls.features as FormGroup;
  }

  get accessories() {
    return this.pedalAddForm.controls.accessories as FormGroup;
  }

  // #endregion

  //#region <Form Controls>
  get digiOrAnalog() {
    return this.basicInfo.controls.digiOrAnalog as FormControl;
  }

  get isTrueBypass() {
    return this.basicInfo.controls.isTrueBypass as FormControl;
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

  get numKnobs() {
    return this.basicInfo.controls.numKnobs as FormControl;
  }

  get formFactor() {
    return this.basicInfo.controls.formFactor as FormControl;
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

  get isModded() {
    return this.desirability.controls.isModded as FormControl;
  }

  get forBassOrGuitar() {
    return this.features.controls.forBassOrGuitar as FormControl;
  }

  get isStereo() {
    return this.features.controls.isStereo as FormControl;
  }

  get case() {
    return this.accessories.controls.case as FormControl;
  }

  // #endregion
  // #endregion

  mapPedal(): void {
    this.pedal.id = this.pedalsService.newPedalId();
    this.pedal.digiOrAnalog = +this.digiOrAnalog.value;
    this.pedal.isTrueBypass = this.isTrueBypass.value;
    this.pedal.brand = this.brand.value;
    this.pedal.name = this.name.value;
    this.pedal.model = this.model.value;
    this.pedal.numKnobs = this.numKnobs.value;
    this.pedal.formFactor = this.formFactor.value;
    this.pedal.description = this.description.value;
    this.pedal.year = this.year.value;
    this.pedal.countryOfOrigin = this.countryOfOrigin.value;
    this.pedal.value = this.value.value;
    this.pedal.isModded = this.isModded.value;
    this.pedal.forBassOrGuitar = this.forBassOrGuitar.value;
    this.pedal.isStereo = this.isStereo.value;
    this.pedal.case = this.case.value;
    // this.pedal.image = this.image.value;
  }

  selectTab(nextTabId: number, isCurrentTabValid: boolean) {
    this.nextClicked = true;
    if (isCurrentTabValid) {
      this.formTabs.tabs[nextTabId].active = true;
    }
  }

  onSubmit() {
    this.nextClicked = true;
    if (this.allTabsValid()) {
      this.mapPedal();
      this.pedalsService.addPedal(this.pedal);
      this.alertify.success('Pedal listed successfully.');
      console.log(this.pedalAddForm);
      if (this.digiOrAnalog.value == 1) {
        this.router.navigate(['pedals-digital']);
      } else {
        this.router.navigate(['pedals-analog']);
      }
    } else {
      this.alertify.error('Please review the form and make sure you have provided all valid entries.');
    }
  }
}
