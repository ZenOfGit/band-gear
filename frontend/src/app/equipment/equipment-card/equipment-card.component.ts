import { Equipment } from '../../models/equipment';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-equipment-card',
  templateUrl: './equipment-card.component.html',
  styleUrls: ['./equipment-card.component.css']
})
export class EquipmentCardComponent implements OnInit {

  @Input() pieceOfEquipment: Equipment;

  constructor() { }

  ngOnInit(): void {
  }

}
