import { KeyboardsService } from './../../services/keyboards.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs/public_api';
import { AlertifyService } from 'src/app/services/alertify.service';
import { IKeyboardBase } from 'src/app/models/ikeyboard-base'
import { Keyboard } from 'src/app/models/keyboard';

@Component({
  selector: 'app-keyboard-add',
  templateUrl: './keyboard-add.component.html',
  styleUrls: ['./keyboard-add.component.css']
})
export class KeyboardAddComponent implements OnInit {

  @ViewChild('formTabs') formTabs: TabsetComponent;

  keyboardAddForm: FormGroup;
  nextClicked: boolean;
  keyboard = new Keyboard();
  countryList: any;

  keyboardView: IKeyboardBase = {
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
    private keyboardsService: KeyboardsService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createKeyboardAddForm();
    this.keyboardsService.getAllCountries().subscribe(data => {
      this.countryList = data;
    })
  }

  createKeyboardAddForm() {
    this.keyboardAddForm = this.fb.group({
      basicInfo: this.fb.group({
        isElectric: [null, [Validators.required]],
        numKeys: [null],
        brand: [null, [Validators.required]],
        name: [null, [Validators.required]],
        model: [null],
        description: [null],
      }),

      desirability: this.fb.group({
        year: [null],
        countryOfOrigin: [null],
        value: [null],
      }),

      features: this.fb.group({
        outputs: [null],
        inputs: [null],
        hasSpeakers: [null],
        hasBatteries: [null],
        batteries: [null],
      }),

      images: this.fb.group({
        image: [null],
      }),
    });
  }

  // #region <Getter Methods>
  // #region <Form Groups>
  get basicInfo() {
    return this.keyboardAddForm.controls.basicInfo as FormGroup;
  }

  get desirability() {
    return this.keyboardAddForm.controls.desirability as FormGroup;
  }

  get features() {
    return this.keyboardAddForm.controls.features as FormGroup;
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

  get numKeys() {
    return this.basicInfo.controls.numKeys as FormControl;
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

  get outputs() {
    return this.features.controls.outputs as FormControl;
  }

  get inputs() {
    return this.features.controls.inputs as FormControl;
  }

  get hasSpeakers() {
    return this.features.controls.hasSpeakers as FormControl;
  }

  get hasBatteries() {
    return this.features.controls.hasBatteries as FormControl;
  }

  get batteries() {
    return this.features.controls.batteries as FormControl;
  }

  // #endregion
  // #endregion

  mapKeyboard(): void {
    this.keyboard.id = this.keyboardsService.newKeyboardId();
    this.keyboard.isElectric = +this.isElectric.value;
    this.keyboard.brand = this.brand.value;
    this.keyboard.name = this.name.value;
    this.keyboard.model = this.model.value;
    this.keyboard.numKeys = this.numKeys.value;
    this.keyboard.description = this.description.value;
    this.keyboard.year = this.year.value;
    this.keyboard.countryOfOrigin = this.countryOfOrigin.value;
    this.keyboard.value = this.value.value;
    this.keyboard.outputs = this.outputs.value;
    this.keyboard.inputs = this.inputs.value;
    this.keyboard.hasSpeakers = this.hasSpeakers.value;
    this.keyboard.hasBatteries = this.hasBatteries.value;
    this.keyboard.batteries = this.batteries.value;
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
    if (this.features.invalid) {
      this.formTabs.tabs[2].active = true;
      return false;
    }
    return true;
  }


  selectTab(tabId: number, isCurrentTabValid: boolean) {
    if (isCurrentTabValid) {
      this.formTabs.tabs[tabId].active = true;
    }
  }

  fillNulls() {
    // this is where we fill fields that are hidden from users when adding certain types of drum kits
    if (this.isElectric.value == false) {
      this.keyboard.outputs = 'None';
      this.keyboard.inputs = 'None';
      this.keyboard.hasSpeakers = false;
      this.keyboard.hasBatteries = false;
      this.keyboard.batteries = 'None';
    }
    if (this.numKeys.value == '' || this.numKeys.value == null) {
      this.keyboard.numKeys = "Unknown";
    }
    if (this.hasBatteries.value == false) {
      this.keyboard.batteries = "None";
    }
    if (this.outputs.value == '' || this.outputs.value == null) {
      this.keyboard.outputs = "None";
    }
    if (this.inputs.value == '' || this.inputs.value == null) {
      this.keyboard.inputs = "None";
    }
  }

  onSubmit() {
    this.nextClicked = true;
    if (this.allTabsValid()) {
      this.mapKeyboard();
      this.fillNulls();
      this.keyboardsService.addKeyboard(this.keyboard);
      this.alertify.success('Drum/kit listed successfully.');
      console.log(this.keyboardAddForm);
      if (this.isElectric.value == 1) {
        this.router.navigate(['keyboards-digital']);
      } else {
        this.router.navigate(['keyboards-analog']);
      }
    } else {
    this.alertify.error('Please review the form and make sure you have provided all valid entries.');
    }
  }
}
