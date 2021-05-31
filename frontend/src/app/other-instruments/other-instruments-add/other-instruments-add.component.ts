import { IOtherBase } from './../../models/iother-base';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs/public_api';
import { AlertifyService } from 'src/app/services/alertify.service';
import { OthersService } from 'src/app/services/others.service';
import { Other } from 'src/app/models/other';

@Component({
  selector: 'app-other-instruments-add',
  templateUrl: './other-instruments-add.component.html',
  styleUrls: ['./other-instruments-add.component.css'],
})
export class OtherInstrumentsAddComponent implements OnInit {
  @ViewChild('formTabs') formTabs: TabsetComponent;

  otherAddForm: FormGroup;
  nextClicked: boolean;
  other = new Other();
  countryList: any;

  otherView: IOtherBase = {
    id: null,
    isElectric: null,
    brand: null,
    name: null,
    model: null,
    description: null,
    year: null,
    countryOfOrigin: '',
    value: null,
  };

  constructor(
    private alertify: AlertifyService,
    private othersService: OthersService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createKeyboardAddForm();
    this.othersService.getAllCountries().subscribe((data) => {
      this.countryList = data;
    });
  }

  createKeyboardAddForm() {
    this.otherAddForm = this.fb.group({
      basicInfo: this.fb.group({
        isElectric: [null],
        brand: [null],
        name: [null],
        model: [null],
        description: [null],
      }),

      desirability: this.fb.group({
        year: [null],
        countryOfOrigin: [null],
        value: [null],
        isAntique: [null],
      }),

      accessories: this.fb.group({
        case: [null],
      }),

      images: this.fb.group({
        image: [null],
      }),
    });
  }

  // #region <Getter Methods>
  // #region <Form Groups>
  get basicInfo() {
    return this.otherAddForm.controls.basicInfo as FormGroup;
  }

  get desirability() {
    return this.otherAddForm.controls.desirability as FormGroup;
  }

  get accessories() {
    return this.otherAddForm.controls.accessories as FormGroup;
  }

  // #endregion

  //#region <Form Controls>
  get isElectric() {
    return this.basicInfo.controls.isElectric as FormControl;
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

  get isAntique() {
    return this.desirability.controls.isAntique as FormControl;
  }

  get case() {
    return this.accessories.controls.case as FormControl;
  }

  // #endregion
  // #endregion

  mapOther(): void {
    this.other.id = this.othersService.newOtherId();
    this.other.isElectric = +this.isElectric.value;
    this.other.brand = this.brand.value;
    this.other.name = this.name.value;
    this.other.model = this.model.value;
    this.other.description = this.description.value;
    this.other.year = this.year.value;
    this.other.countryOfOrigin = this.countryOfOrigin.value;
    this.other.value = this.value.value;
    this.other.isAntique = this.isAntique.value;
    this.other.case = this.case.value;
    // this.other.image = this.image.value;
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
    if (this.accessories.invalid) {
      this.formTabs.tabs[2].active = true;
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
    if (this.case.value == '' || this.case.value == null) {
      this.other.case = 'None';
    }
  }

  onSubmit() {
    this.nextClicked = true;
    if (this.allTabsValid()) {
      this.mapOther();
      this.fillNulls();
      this.othersService.addOther(this.other);
      this.alertify.success('Other instrument listed successfully.');
      console.log(this.otherAddForm);
      if (this.isElectric.value == 1) {
        this.router.navigate(['others-electric']);
      } else {
        this.router.navigate(['others-acoustic']);
      }
    } else {
      this.alertify.error(
        'Please review the form and make sure you have provided all valid entries.'
      );
    }
  }
}
