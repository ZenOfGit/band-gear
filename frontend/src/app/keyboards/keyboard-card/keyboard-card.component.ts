import { Keyboard } from '../../models/keyboard';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-keyboard-card',
  templateUrl: './keyboard-card.component.html',
  styleUrls: ['./keyboard-card.component.scss']
})
export class KeyboardCardComponent implements OnInit {

  @Input() keyboard: Keyboard;

  constructor() { }

  ngOnInit() {
  }

}
