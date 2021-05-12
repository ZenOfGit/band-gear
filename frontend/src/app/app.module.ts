import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { BsDatepickerModule, BsDatepickerConfig  } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { TabsModule } from "ngx-bootstrap/tabs";

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardMainComponent } from './dashboard/dashboard-main/dashboard-main.component';
import { DrumAddComponent } from './drums/drum-add/drum-add.component';
import { DrumCardComponent } from './drums/drum-card/drum-card.component';
import { DrumDetailComponent } from './drums/drum-detail/drum-detail.component';
import { DrumListComponent } from './drums/drum-list/drum-list.component';
import { EquipmentAddComponent } from './equipment/equipment-add/equipment-add.component';
import { EquipmentCardComponent } from './equipment/equipment-card/equipment-card.component';
import { EquipmentDetailComponent } from './equipment/equipment-detail/equipment-detail.component';
import { EquipmentListComponent } from './equipment/equipment-list/equipment-list.component';
import { GuitarAddComponent } from './guitars/guitar-add/guitar-add.component';
import { GuitarCardComponent } from './guitars/guitar-card/guitar-card.component';
import { GuitarDetailComponent } from './guitars/guitar-detail/guitar-detail.component';
import { GuitarListComponent } from './guitars/guitar-list/guitar-list.component';
import { KeyboardAddComponent } from './keyboards/keyboard-add/keyboard-add.component';
import { KeyboardCardComponent } from './keyboards/keyboard-card/keyboard-card.component';
import { KeyboardDetailComponent } from './keyboards/keyboard-detail/keyboard-detail.component';
import { KeyboardListComponent } from './keyboards/keyboard-list/keyboard-list.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { OtherInstrumentsAddComponent } from './other-instruments/other-instruments-add/other-instruments-add.component';
import { OtherInstrumentsCardComponent } from './other-instruments/other-instruments-card/other-instruments-card.component';
import { OtherInstrumentsDetailComponent } from './other-instruments/other-instruments-detail/other-instruments-detail.component';
import { OtherInstrumentsListComponent } from './other-instruments/other-instruments-list/other-instruments-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PedalAddComponent } from './pedals/pedal-add/pedal-add.component';
import { PedalCardComponent } from './pedals/pedal-card/pedal-card.component';
import { PedalDetailComponent } from './pedals/pedal-detail/pedal-detail.component';
import { PedalListComponent } from './pedals/pedal-list/pedal-list.component';
import { UserLoginComponent } from './users/user-login/user-login.component';
import { UserRegisterComponent } from './users/user-register/user-register.component';

import { AlertifyService } from './services/alertify.service';
import { AuthService } from './services/auth.service';
import { DrumDetailResolverService } from './drums/drum-detail/drum-detail-resolver.service';
import { EquipmentService } from './services/equipment.service';
import { GuitarsService } from './services/guitars.service';
import { UsersService } from './services/users.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardMainComponent,
    DrumAddComponent,
    DrumCardComponent,
    DrumDetailComponent,
    DrumListComponent,
    EquipmentAddComponent,
    EquipmentCardComponent,
    EquipmentDetailComponent,
    EquipmentListComponent,
    GuitarAddComponent,
    GuitarCardComponent,
    GuitarDetailComponent,
    GuitarListComponent,
    KeyboardAddComponent,
    KeyboardCardComponent,
    KeyboardDetailComponent,
    KeyboardListComponent,
    NavBarComponent,
    OtherInstrumentsAddComponent,
    OtherInstrumentsCardComponent,
    OtherInstrumentsDetailComponent,
    OtherInstrumentsListComponent,
    PedalAddComponent,
    PedalCardComponent,
    PedalDetailComponent,
    PedalListComponent,
    PageNotFoundComponent,
    UserLoginComponent,
    UserRegisterComponent,
    PedalAddComponent,
   ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    ButtonsModule.forRoot(),
    FormsModule,
    HttpClientModule,
    NgxGalleryModule,
    ReactiveFormsModule,
    TabsModule.forRoot()
  ],
  providers: [
    AlertifyService,
    AuthService,
    BsDatepickerConfig,
    DrumDetailResolverService,
    EquipmentService,
    GuitarsService,
    UsersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
