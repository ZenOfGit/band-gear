import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs/public_api';
import { IEquipmentBase } from 'src/app/models/iequipment-base';
import { AlertifyService } from 'src/app/services/alertify.service';
import { EquipmentService } from '../../services/equipment.service';
import { Equipment } from './../../models/equipment';

@Component({
  selector: 'app-equipment-add',
  templateUrl: './equipment-add.component.html',
  styleUrls: ['./equipment-add.component.scss'],
})
export class EquipmentAddComponent implements OnInit {
  @ViewChild('formTabs') formTabs: TabsetComponent;

  equipment = new Equipment();
  equipmentAddForm: FormGroup;
  nextClicked: boolean;
  countryList: any;

  equipmentView: IEquipmentBase = {
    id: null,
    category: null,
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
    private equipmentService: EquipmentService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createEquipmentAddform();
    this.equipmentService.getAllCountries().subscribe((data) => {
      this.countryList = data;
    });
  }

  createEquipmentAddform() {
    this.equipmentAddForm = this.fb.group({
      basicInfo: this.fb.group({
        powered: [null, [Validators.required]],
        category: [null, [Validators.required]],
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
    return this.equipmentAddForm.controls.basicInfo as FormGroup;
  }

  get desirability() {
    return this.equipmentAddForm.controls.desirability as FormGroup;
  }

  get accessories() {
    return this.equipmentAddForm.controls.accessories as FormGroup;
  }

  // #endregion

  //#region <Form Controls>
  get powered() {
    return this.basicInfo.controls.powered as FormControl;
  }

  get category() {
    return this.basicInfo.controls.category as FormControl;
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

  get case() {
    return this.accessories.controls.case as FormControl;
  }

  get sticks() {
    return this.accessories.controls.sticks as FormControl;
  }

  get pillow() {
    return this.accessories.controls.pillow as FormControl;
  }

  // #endregion
  // #endregion

  mapEquipment(): void {
    this.equipment.id = this.equipmentService.newEquipmentId();
    this.equipment.powered = +this.powered.value;
    this.equipment.category = this.category.value;
    this.equipment.brand = this.brand.value;
    this.equipment.name = this.name.value;
    this.equipment.model = this.model.value;
    this.equipment.description = this.description.value;
    this.equipment.year = this.year.value;
    this.equipment.countryOfOrigin = this.countryOfOrigin.value;
    this.equipment.value = this.value.value;
    this.equipment.case = this.case.value;
    // this.equipment.image = this.image.value;
  }

  selectTab(tabId: number, isCurrentTabValid: boolean) {
    this.nextClicked = true;
    if (isCurrentTabValid) {
      this.formTabs.tabs[tabId].active = true;
    }
  }

  allTabsValid(): boolean {
    //we only have validation in one tab but we add this for future changes
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

  onSubmit() {
    this.nextClicked = true;
    if (this.allTabsValid()) {
      this.mapEquipment();
      this.equipmentService.addEquipment(this.equipment);
      this.alertify.success('Form successfully submitted');
      console.log(this.equipmentAddForm);
      if (this.powered.value == 1) {
        this.router.navigate(['equipment-powered']);
      } else {
        this.router.navigate(['equipment-unpowered']);
      }
    } else {
      this.alertify.error('Error: Form not submitted');
    }
  }
}
