import { DrumDetailResolverService } from './drums/drum-detail/drum-detail-resolver.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardMainComponent } from './dashboard/dashboard-main/dashboard-main.component';
import { DrumAddComponent } from './drums/drum-add/drum-add.component';
// import { DrumCardComponent } from './drums/drum-card/drum-card.component';
import { DrumDetailComponent } from './drums/drum-detail/drum-detail.component';
import { DrumListComponent } from './drums/drum-list/drum-list.component';
import { EquipmentAddComponent } from './equipment/equipment-add/equipment-add.component';
// import { EquipmentCardComponent } from './equipment/equipment-add/equipment-add.component';
import { EquipmentDetailComponent } from './equipment/equipment-detail/equipment-detail.component';
import { EquipmentListComponent } from './equipment/equipment-list/equipment-list.component';
import { GuitarAddComponent } from './guitars/guitar-add/guitar-add.component';
import { GuitarDetailComponent } from './guitars/guitar-detail/guitar-detail.component';
import { GuitarListComponent } from './guitars/guitar-list/guitar-list.component';
import { KeyboardAddComponent } from './keyboards/keyboard-add/keyboard-add.component';
import { KeyboardDetailComponent } from './keyboards/keyboard-detail/keyboard-detail.component';
//import { KeyboardCardComponent } from './keyboards/keyboard-card/keyboard-card.component';
import { KeyboardListComponent } from './keyboards/keyboard-list/keyboard-list.component';
import { OtherInstrumentsAddComponent } from './other-instruments/other-instruments-add/other-instruments-add.component';
// import { OtherInstrumentsCardComponent } from './other-instruments/other-instruments-card/other-instruments-card.component';
import { OtherInstrumentsDetailComponent } from './other-instruments/other-instruments-detail/other-instruments-detail.component';
import { OtherInstrumentsListComponent } from './other-instruments/other-instruments-list/other-instruments-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PedalAddComponent } from './pedals/pedal-add/pedal-add.component';
import { PedalDetailComponent } from './pedals/pedal-detail/pedal-detail.component';
import { PedalListComponent } from './pedals/pedal-list/pedal-list.component';
import { UserLoginComponent } from './users/user-login/user-login.component';
import { UserRegisterComponent } from './users/user-register/user-register.component';

const routes: Routes = [
  {path: '', component: DashboardMainComponent},
  {path: 'dashboard-main', component: DashboardMainComponent},
  // {path: 'drum-card', component: DrumCardComponent},
  {path: 'drum-add', component: DrumAddComponent},
  {path: 'drums', component: DrumListComponent},
  {path: 'drums-kits', component: DrumListComponent},
  {path: 'drums-single', component: DrumListComponent},
  {path: 'drum-detail/:id', component: DrumDetailComponent, resolve: {drm: DrumDetailResolverService}},
  {path: 'equipment', component: EquipmentListComponent},
  {path: 'equipment-add', component: EquipmentAddComponent},
  {path: 'equipment-detail/:id', component: EquipmentDetailComponent},
  {path: 'equipment-powered', component: EquipmentListComponent},
  {path: 'equipment-unpowered', component: EquipmentListComponent},
  {path: 'guitar-add', component: GuitarAddComponent},
  {path: 'guitar-detail/:id', component: GuitarDetailComponent},
  {path: 'guitars', component: GuitarListComponent},
  {path: 'guitars-acoustic', component: GuitarListComponent},
  {path: 'guitars-electric', component: GuitarListComponent},
  {path: 'keyboard-add', component: KeyboardAddComponent},
  {path: 'keyboard-detail/:id', component: KeyboardDetailComponent},
  {path: 'keyboards', component: KeyboardListComponent},
  {path: 'keyboards-analog', component: KeyboardListComponent},
  // {path: 'keyboard-card', component: KeyboardCardComponent},
  {path: 'keyboards-digital', component: KeyboardListComponent},
  {path: 'others', component: OtherInstrumentsListComponent},
  {path: 'other-add', component: OtherInstrumentsAddComponent},
  {path: 'others-acoustic', component: OtherInstrumentsListComponent},
  // {path: 'others-card', component: OtherInstrumentsCardComponent},
  {path: 'others-electric', component: OtherInstrumentsListComponent},
  {path: 'other-instruments', component: OtherInstrumentsListComponent},
  {path: 'other-instruments-detail/:id', component: OtherInstrumentsDetailComponent},
  {path: 'pedal-add', component: PedalAddComponent},
  {path: 'pedals-analog', component: PedalListComponent},
  // {path: 'pedal-card', component: PedalCardComponent},
  {path: 'pedals-digital', component: PedalListComponent},
  {path: 'pedals', component: PedalListComponent},
  {path: 'pedal-detail/:id', component: PedalDetailComponent},
  {path: 'user/login', component: UserLoginComponent},
  {path: 'user/register', component: UserRegisterComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
