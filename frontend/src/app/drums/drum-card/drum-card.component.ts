import { Component, Input, OnInit } from '@angular/core';
import { DrumKit } from './../../models/drum-kit';

@Component({
  selector: 'app-drum-card',
  templateUrl: './drum-card.component.html',
  styleUrls: ['./drum-card.component.scss']
})
export class DrumCardComponent implements OnInit {

  @Input() drumKit: DrumKit;

  constructor() { }

  ngOnInit(): void {
  }

}
