import { Component, OnInit } from '@angular/core';
import { EquipmentService } from '../../services/equipment.service';
import { ActivatedRoute } from '@angular/router';
import { Equipment } from '../../models/equipment';


@Component({
  selector: 'app-equipment-list',
  templateUrl: './equipment-list.component.html',
  styleUrls: ['./equipment-list.component.css']
})
export class EquipmentListComponent implements OnInit {

  powered = 0;
  equipment: Array<Equipment>;

  constructor(private route: ActivatedRoute, private equipmentService:EquipmentService) { }

  ngOnInit(): void {
    if (this.route.snapshot.url.toString() === "equipment") {
      this.powered = 0;
    } else if (this.route.snapshot.url.toString() === "equipment-powered"){
      this.powered = 1;
    } else if (this.route.snapshot.url.toString() === "equipment-unpowered"){
      this.powered = 2;
    }
    this.equipmentService.getAllEquipment(this.powered).subscribe(
      data => {
        this.equipment = data;
/*         const newEquipment = JSON.parse(localStorage.getItem('newEquip'));

        if(newEquipment === this.powered) {  // comes from our url up in teh first if routes, is it why we have all iterm in all pages?
          this.equipment = [newEquipment, ...this.equipment];
        } */
        console.log(data);
      }, error => {
        console.log('httperror');
        console.log(error);
      }
    );
  }
}
