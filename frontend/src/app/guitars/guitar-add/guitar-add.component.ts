import { GuitarsService } from './../../services/guitars.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IGuitarBase } from './../../models/iguitar-base';
import { NgForm, FormsModule, FormGroup, FormBuilder, Validators, FormControl  } from "@angular/forms";
import { TabsetComponent } from 'ngx-bootstrap/tabs/public_api';
import { AlertifyService } from 'src/app/services/alertify.service';
import { Router } from '@angular/router';
import { Guitar } from 'src/app/models/guitar';


@Component({
  selector: 'app-guitar-add',
  templateUrl: './guitar-add.component.html',
  styleUrls: ['./guitar-add.component.css']
})
export class GuitarAddComponent implements OnInit {

  @ViewChild('formTabs') formTabs: TabsetComponent;

  guitar = new Guitar();
  guitarAddForm: FormGroup;
  nextClicked: boolean;
  countryList: any;

  guitarView: IGuitarBase = {
    id: null,
    isElectric: null,
    typeGOrB: null,
    brand: null,
    name: null,
    description: null,
    year: null,
    countryOfOrigin: '',
    value: null
  };

  constructor(
    private alertify: AlertifyService,
    private guitarsService: GuitarsService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createGuitarAddform();
    this.guitarsService.getAllCountries().subscribe(data => {
      this.countryList = data;
    });
  }

  createGuitarAddform() {
    this.guitarAddForm = this.fb.group({
      basicInfo: this.fb.group({
        isElectric: [null, [Validators.required]],
        typeGOrB: [null, [Validators.required]],
        brand: [null, [Validators.required]],
        name: [null, [Validators.required]],
        model: [null],
        numStrings: [null],
        formFactor: [null],
        description: [null],
      }),
      desirability: this.fb.group({
        puConfiguration: [null],
        year: [null],
        countryOfOrigin: [null],
        value: [null],
      }),
      enhancements: this.fb.group({
        pUsAreAftermarket: [null],
        brandOfPickups: [null],
        nameOfPickups: [null],
        tunersAreAftermarket: [null],
        brandOfTuners: [null],
        nameOfTuners: [null],
        electronicsAreAftermarket: [null],
        brandOfPots: [null],
        nameOfPots: [null],
        nameOfCapacitor: [null],
        additionalCustomElectronics: [null],
        bridgeIsAftermarket: [null],
        brandOfBridge: [null],
        nameOfBridge: [null],
        hasSpecificStrings: [null],
        brandOfStrings: [null],
        nameOfStrings: [null],
        guageOfStrings: [null],
      }),
      accessories: this.fb.group({
        case: [null],
        strap: [null],
      }),
      images: this.fb.group({
        image: [null],
      })
    });
  }

  // #region <Getter Methods>
  // #region <Form Groups>
  get basicInfo() {
    return this.guitarAddForm.controls.basicInfo as FormGroup;
  }

  get desirability() {
    return this.guitarAddForm.controls.desirability as FormGroup;
  }

  get enhancements() {
    return this.guitarAddForm.controls.enhancements as FormGroup;
  }

  get accessories() {
    return this.guitarAddForm.controls.accessories as FormGroup;
  }

  // #endregion

  //#region <Form Controls>
  get isElectric() {
    return this.basicInfo.controls.isElectric as FormControl;
  }

  get typeGOrB() {
    return this.basicInfo.controls.typeGOrB as FormControl;
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

  get numStrings() {
    return this.basicInfo.controls.numStrings as FormControl;
  }

  get formFactor() {
    return this.basicInfo.controls.formFactor as FormControl;
  }

  get description() {
    return this.basicInfo.controls.description as FormControl;
  }

  get puConfiguration() {
    return this.desirability.controls.puConfiguration as FormControl;
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

  get pUsAreAftermarket() {
    return this.enhancements.controls.pUsAreAftermarket as FormControl;
  }

  get brandOfPickups() {
    return this.enhancements.controls.brandOfPickups as FormControl;
  }

  get nameOfPickups() {
    return this.enhancements.controls.nameOfPickups as FormControl;
  }

  get tunersAreAftermarket() {
    return this.enhancements.controls.tunersAreAftermarket as FormControl;
  }

  get brandOfTuners() {
    return this.enhancements.controls.brandOfTuners as FormControl;
  }

  get nameOfTuners() {
    return this.enhancements.controls.nameOfTuners as FormControl;
  }

  get electronicsAreAftermarket() {
    return this.enhancements.controls.electronicsAreAftermarket as FormControl;
  }

  get brandOfPots() {
    return this.enhancements.controls.brandOfPots as FormControl;
  }

  get nameOfPots() {
    return this.enhancements.controls.nameOfPots as FormControl;
  }

  get nameOfCapacitor() {
    return this.enhancements.controls.nameOfCapacitor as FormControl;
  }

  get additionalCustomElectronics() {
    return this.enhancements.controls.additionalCustomElectronics as FormControl;
  }

  get bridgeIsAftermarket() {
    return this.enhancements.controls.bridgeIsAftermarket as FormControl;
  }

  get brandOfBridge() {
    return this.enhancements.controls.brandOfBridge as FormControl;
  }

  get nameOfBridge() {
    return this.enhancements.controls.nameOfBridge as FormControl;
  }

  get hasSpecificStrings() {
    return this.enhancements.controls.hasSpecificStrings as FormControl;
  }

  get brandOfStrings() {
    return this.enhancements.controls.brandOfStrings as FormControl;
  }

  get nameOfStrings() {
    return this.enhancements.controls.nameOfStrings as FormControl;
  }

  get guageOfStrings() {
    return this.enhancements.controls.guageOfStrings as FormControl;
  }

  get case() {
    return this.accessories.controls.case as FormControl;
  }

  get strap() {
    return this.accessories.controls.strap as FormControl;
  }

  // #endregion
  // #endregion

  mapGuitar(): void {
    this.guitar.id = this.guitarsService.newGuitarId();
    this.guitar.isElectric = +this.isElectric.value;
    this.guitar.typeGOrB = this.typeGOrB.value;
    this.guitar.brand = this.brand.value;
    this.guitar.name = this.name.value;
    this.guitar.model = this.model.value;
    this.guitar.numStrings = this.numStrings.value;
    this.guitar.formFactor = this.formFactor.value;
    this.guitar.description = this.description.value;
    this.guitar.puConfiguration = this.puConfiguration.value;
    this.guitar.year = this.year.value;
    this.guitar.countryOfOrigin = this.countryOfOrigin.value;
    this.guitar.value = this.value.value;
    this.guitar.pUsAreAftermarket = this.pUsAreAftermarket.value;
    this.guitar.brandOfPickups = this.brandOfPickups.value;
    this.guitar.nameOfPickups = this.nameOfPickups.value;
    this.guitar.tunersAreAftermarket = this.tunersAreAftermarket.value;
    this.guitar.brandOfTuners = this.brandOfTuners.value;
    this.guitar.nameOfTuners = this.nameOfTuners.value;
    this.guitar.electronicsAreAftermarket = this.electronicsAreAftermarket.value;
    this.guitar.brandOfPots = this.brandOfPots.value;
    this.guitar.nameOfPots = this.nameOfPots.value;
    this.guitar.nameOfCapacitor = this.nameOfCapacitor.value;
    this.guitar.additionalCustomElectronics = this.additionalCustomElectronics.value;
    this.guitar.bridgeIsAftermarket = this.bridgeIsAftermarket.value;
    this.guitar.brandOfBridge = this.brandOfBridge.value;
    this.guitar.nameOfBridge = this.nameOfBridge.value;
    this.guitar.hasSpecificStrings = this.hasSpecificStrings.value;
    this.guitar.brandOfStrings = this.brandOfStrings.value;
    this.guitar.nameOfStrings = this.nameOfStrings.value;
    this.guitar.guageOfStrings = this.guageOfStrings.value;
    this.guitar.case = this.case.value;
    this.guitar.strap = this.strap.value;
    // this.guitar.image = this.image.value;
  }


  allTabsValid(): boolean {
    //we only have validation in one tab so that is all we need for this, but we check all anyway for future
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

  selectTab(tabId: number, isCurrentTabValid: boolean) {
    this.nextClicked = true;
    if (isCurrentTabValid) {
      this.formTabs.tabs[tabId].active = true;
    }
  }

  fillNulls() {
    // this is where we fill fields that are hidden from users when adding certain types of drum kits
    if (this.isElectric.value == false){
      this.guitar.puConfiguration = 'None';
      this.guitar.pUsAreAftermarket = false;
      this.guitar.brandOfPickups = 'None';
      this.guitar.nameOfPickups = 'None';
      this.guitar.electronicsAreAftermarket = false;
      this.guitar.brandOfPots = 'None';
      this.guitar.nameOfPots = 'None';
      this.guitar.nameOfCapacitor = 'None';
      this.guitar.additionalCustomElectronics = 'None';
    }
    if (this.isElectric.value == true || this.pUsAreAftermarket.value == false) {
      this.guitar.brandOfPickups = "Original";
      this.guitar.nameOfPickups = "Original";
    }
    if (this.tunersAreAftermarket.value == false) {
      this.guitar.brandOfTuners = "Original";
      this.guitar.nameOfTuners = "Original";
    }
    if (this.isElectric.value == true || this.electronicsAreAftermarket.value == false) {
      this.guitar.brandOfPots = "Original";
      this.guitar.nameOfPots = "Original";
      this.guitar.nameOfCapacitor = "Original";
      this.guitar.additionalCustomElectronics = "Original";
    }
    if (this.bridgeIsAftermarket.value == false) {
      this.guitar.brandOfBridge = "Original";
      this.guitar.nameOfBridge = "Original";
    }
    if (this.hasSpecificStrings.value == false) {
      this.guitar.brandOfStrings = "Original";
      this.guitar.nameOfStrings = "Original";
      this.guitar.guageOfStrings = "Unknown";
    }
  }

  onSubmit() {
    this.nextClicked = true;
    if (this.allTabsValid()) {
      this.mapGuitar();
      this.guitarsService.addGuitar(this.guitar);
      this.alertify.success('Guitar listed successfully.');
      console.log(this.guitarAddForm);
      if (this.isElectric.value == 1) {
        this.router.navigate(['guitars-electric']);
      } else {
        this.router.navigate(['guitars-acoustic']);
      }
    } else {
      this.alertify.error('Please review the form and make sure you have provided all valid entries.');
    }
  }
}
