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
        isExpressionPedal: [null],
        numKnobs: [null],
        numSwitches: [null],
        formFactor: [null],
        description: [null]
      }),

      controls: this.fb.group({
        buttonOnOff: [true],
        buttonEffect: [false],
        buttonUpDown: [false],
        knobBalance: [false],
        knobDecayRate: [false],
        knobDelay: [false],
        knobDepth: [false],
        knobDirectSignal: [false],
        knobDistortion: [false],
        knobEQ: [false],
        knobFeedRamp: [false],
        knobFilter: [false],
        knobForm: [false],
        knobGain: [false],
        knobLevel: [false],
        knobMix: [false],
        knobMode: [false],
        knobOctaveDown: [false],
        knobOctaveUp: [false],
        knobOverdrive: [false],
        knobPeak: [false],
        knobRate: [false],
        knobRegen: [false],
        knobResonance: [false],
        knobSustain: [false],
        knobTone: [false],
        knobVolume: [false],
        knobDoubleA: [false],
        knobDoubleAName: [null],
        knobDoubleAFunction1: [null],
        knobDoubleAFunction2: [null],
        knobDoubleB: [false],
        knobDoubleBName: [null],
        knobDoubleBFunction1: [null],
        knobDoubleBFunction2: [null],
        toggleMode: [false],
        togglePreset: [false],
        toggleRange: [false],
        toggleStage: [false],
        toggleLeftWaveShape: [false],
        toggleRightWaveShape: [false]
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
    if (this.controls.invalid) {
      this.formTabs.tabs[1].active = true;
      return false;
    }
    if (this.desirability.invalid) {
      this.formTabs.tabs[2].active = true;
      return false;
    }
    if (this.features.invalid) {
      this.formTabs.tabs[3].active = true;
      return false;
    }
    if (this.accessories.invalid) {
      this.formTabs.tabs[4].active = true;
      return false;
    }
    return true;
  }

    // #region <Getter Methods>
  // #region <Form Groups>
  get basicInfo() {
    return this.pedalAddForm.controls.basicInfo as FormGroup;
  }

  get controls() {
    return this.pedalAddForm.controls.controls as FormGroup;
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

  get isExpressionPedal() {
    return this.basicInfo.controls.isExpressionPedal as FormControl;
  }

  get numKnobs() {
    return this.basicInfo.controls.numKnobs as FormControl;
  }

  get numSwitches() {
    return this.basicInfo.controls.numSwitches as FormControl;
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

  get buttonOnOff() {
    return this.controls.controls.buttonOnOff as FormControl;
  }

  get buttonEffect() {
    return this.controls.controls.buttonEffect as FormControl;
  }

  get buttonUpDown() {
    return this.controls.controls.buttonUpDown as FormControl;
  }

  get knobBalance() {
    return this.controls.controls.knobBalance as FormControl;
  }

  get knobDecayRate() {
    return this.controls.controls.knobDecayRate as FormControl;
  }

  get knobDelay() {
    return this.controls.controls.knobDelay as FormControl;
  }

  get knobDepth() {
    return this.controls.controls.knobDepth as FormControl;
  }

  get knobDirectSignal() {
    return this.controls.controls.knobDirectSignal as FormControl;
  }

  get knobDistortion() {
    return this.controls.controls.knobDistortion as FormControl;
  }

  get knobEQ() {
    return this.controls.controls.knobEQ as FormControl;
  }

  get knobFeedRamp() {
    return this.controls.controls.knobFeedRamp as FormControl;
  }

  get knobFilter() {
    return this.controls.controls.knobFilter as FormControl;
  }

  get knobForm() {
    return this.controls.controls.knobForm as FormControl;
  }

  get knobGain() {
    return this.controls.controls.knobGain as FormControl;
  }

  get knobLevel() {
    return this.controls.controls.knobLevel as FormControl;
  }

  get knobMix() {
    return this.controls.controls.knobMix as FormControl;
  }

  get knobMode() {
    return this.controls.controls.knobMode as FormControl;
  }

  get knobOctaveDown() {
    return this.controls.controls.knobOctaveDown as FormControl;
  }

  get knobOctaveUp() {
    return this.controls.controls.knobOctaveUp as FormControl;
  }

  get knobOverdrive() {
    return this.controls.controls.knobOverdrive as FormControl;
  }

  get knobPeak() {
    return this.controls.controls.knobPeak as FormControl;
  }

  get knobRate() {
    return this.controls.controls.knobRate as FormControl;
  }

  get knobRegen() {
    return this.controls.controls.knobRegen as FormControl;
  }

  get knobResonance() {
    return this.controls.controls.knobResonance as FormControl;
  }

  get knobSustain() {
    return this.controls.controls.knobSustain as FormControl;
  }

  get knobTone() {
    return this.controls.controls.knobTone as FormControl;
  }

  get knobVolume() {
    return this.controls.controls.knobVolume as FormControl;
  }

  get knobDoubleA() {
    return this.controls.controls.knobDoubleA as FormControl;
  }

  get knobDoubleAName() {
    return this.controls.controls.knobDoubleAName as FormControl;
  }

  get knobDoubleAFunction1() {
    return this.controls.controls.knobDoubleAFunction1 as FormControl;
  }

  get knobDoubleAFunction2() {
    return this.controls.controls.knobDoubleAFunction2 as FormControl;
  }

  get knobDoubleB() {
    return this.controls.controls.knobDoubleB as FormControl;
  }

  get knobDoubleBName() {
    return this.controls.controls.knobDoubleBName as FormControl;
  }

  get knobDoubleBFunction1() {
    return this.controls.controls.knobDoubleBFunction1 as FormControl;
  }

  get knobDoubleBFunction2() {
    return this.controls.controls.knobDoubleBFunction2 as FormControl;
  }

  get toggleMode() {
    return this.controls.controls.toggleMode as FormControl;
  }

  get togglePreset() {
    return this.controls.controls.togglePreset as FormControl;
  }

  get toggleRange() {
    return this.controls.controls.toggleRange as FormControl;
  }

  get toggleStage() {
    return this.controls.controls.toggleStage as FormControl;
  }

  get toggleLeftWaveShape() {
    return this.controls.controls.toggleLeftWaveShape as FormControl;
  }

  get toggleRightWaveShape() {
    return this.controls.controls.toggleRightWaveShape as FormControl;
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
    this.pedal.isExpressionPedal = this.isExpressionPedal.value;
    this.pedal.numKnobs = this.numKnobs.value;
    this.pedal.numSwitches = this.numSwitches.value;
    this.pedal.formFactor = this.formFactor.value;
    this.pedal.description = this.description.value;
    this.pedal.year = this.year.value;
    this.pedal.countryOfOrigin = this.countryOfOrigin.value;
    this.pedal.value = this.value.value;
    this.pedal.isModded = this.isModded.value;
    this.pedal.forBassOrGuitar = this.forBassOrGuitar.value;
    this.pedal.isStereo = this.isStereo.value;
    this.pedal.case = this.case.value;
    this.pedal.buttonOnOff = this.buttonOnOff.value;
    this.pedal.buttonEffect = this.buttonEffect.value;
    this.pedal.buttonUpDown = this.buttonUpDown.value;
    this.pedal.knobBalance = this.knobBalance.value;
    this.pedal.knobDecayRate = this.knobDecayRate.value;
    this.pedal.knobDelay = this.knobDelay.value;
    this.pedal.knobDepth = this.knobDepth.value;
    this.pedal.knobDirectSignal = this.knobDirectSignal.value;
    this.pedal.knobDistortion = this.knobDistortion.value;
    this.pedal.knobEQ = this.knobEQ.value;
    this.pedal.knobFeedRamp = this.knobFeedRamp.value;
    this.pedal.knobFilter = this.knobFilter.value;
    this.pedal.knobForm = this.knobForm.value;
    this.pedal.knobGain = this.knobGain.value;
    this.pedal.knobLevel = this.knobLevel.value;
    this.pedal.knobMix = this.knobMix.value;
    this.pedal.knobMode = this.knobMode.value;
    this.pedal.knobOctaveDown = this.knobOctaveDown.value;
    this.pedal.knobOctaveUp = this.knobOctaveUp.value;
    this.pedal.knobOverdrive = this.knobOverdrive.value;
    this.pedal.knobPeak = this.knobPeak.value;
    this.pedal.knobRate = this.knobRate.value;
    this.pedal.knobRegen = this.knobRegen.value;
    this.pedal.knobResonance = this.knobResonance.value;
    this.pedal.knobSustain = this.knobSustain.value;
    this.pedal.knobTone = this.knobTone.value;
    this.pedal.knobVolume = this.knobVolume.value
    this.pedal.knobDoubleA = this.knobDoubleA.value;
    this.pedal.knobDoubleAName = this.knobDoubleAName.value;
    this.pedal.knobDoubleAFunction1 = this.knobDoubleAFunction1.value;
    this.pedal.knobDoubleAFunction2 = this.knobDoubleAFunction2.value;
    this.pedal.knobDoubleB = this.knobDoubleB.value;
    this.pedal.knobDoubleBName = this.knobDoubleBName.value;
    this.pedal.knobDoubleBFunction1 = this.knobDoubleBFunction1.value;
    this.pedal.knobDoubleBFunction2 = this.knobDoubleBFunction2.value;
    this.pedal.toggleMode = this.toggleMode.value;
    this.pedal.togglePreset = this.togglePreset.value;
    this.pedal.toggleRange = this.toggleRange.value;
    this.pedal.toggleStage = this.toggleStage.value;
    this.pedal.toggleLeftWaveShape = this.toggleLeftWaveShape.value;
    this.pedal.toggleRightWaveShape = this.toggleRightWaveShape.value;
    // this.pedal.image = this.image.value;
  }

  selectTab(nextTabId: number, isCurrentTabValid: boolean) {
    this.nextClicked = true;
    if (isCurrentTabValid) {
      this.formTabs.tabs[nextTabId].active = true;
    }
  }

  fillNulls() {
    // this is where we fill fields that are hidden from users when adding certain types of drum kits
    if (this.numSwitches.value == null){
      this.pedal.numSwitches = 0;
    }
    if (this.knobDoubleA.value == false){
      this.pedal.knobDoubleAName = "None";
      this.pedal.knobDoubleAFunction1 = "None";
      this.pedal.knobDoubleAFunction2 = "None";
    }
    if (this.knobDoubleB.value == false){
      this.pedal.knobDoubleBName = "None";
      this.pedal.knobDoubleBFunction1 = "None";
      this.pedal.knobDoubleBFunction2 = "None";
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
