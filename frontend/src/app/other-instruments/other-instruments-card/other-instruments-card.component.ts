import { Other } from './../../models/other';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-other-instruments-card',
  templateUrl: './other-instruments-card.component.html',
  styleUrls: ['./other-instruments-card.component.scss']
})
export class OtherInstrumentsCardComponent implements OnInit {

  @Input () other: Other;

  constructor() { }

  ngOnInit() {
  }

}
