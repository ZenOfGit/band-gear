import { Component, Input, OnInit } from '@angular/core';
import { Pedal } from '../../models/pedal';

@Component({
  selector: 'app-pedal-card',
  templateUrl: './pedal-card.component.html',
  styleUrls: ['./pedal-card.component.scss']
})
export class PedalCardComponent implements OnInit {

  @Input() pedal: Pedal;

  constructor() { }

  ngOnInit() {
  }

}
