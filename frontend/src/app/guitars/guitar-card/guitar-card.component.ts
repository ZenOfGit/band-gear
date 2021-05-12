import { Component, Input, OnInit } from '@angular/core';
import { Guitar } from '../../models/guitar';

@Component({
  selector: 'app-guitar-card',
  templateUrl: './guitar-card.component.html',
  styleUrls: ['./guitar-card.component.scss']
})
export class GuitarCardComponent implements OnInit {

  @Input() guitar: Guitar;

  constructor() { }

  ngOnInit() {
  }

}
