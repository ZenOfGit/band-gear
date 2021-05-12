import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pedal } from '../../models/pedal';
import { PedalsService } from './../../services/pedals.service';


@Component({
  selector: 'app-pedal-list',
  templateUrl: './pedal-list.component.html',
  styleUrls: ['./pedal-list.component.scss']
})
export class PedalListComponent implements OnInit {

  digiOrAnalog = 0;
  pedals: Array<Pedal>;

  constructor(private route: ActivatedRoute, private pedalsService: PedalsService) { }

  ngOnInit() {
    if (this.route.snapshot.url.toString() === "pedals") {
      this.digiOrAnalog = 0;
    } else if (this.route.snapshot.url.toString() === "pedals-analog"){
      this.digiOrAnalog = 1;
    } else if (this.route.snapshot.url.toString() === "pedals-digital"){
      this.digiOrAnalog = 2;
    } else {  // we should not get to this option
      this.digiOrAnalog = 0;
    }
    this.pedalsService.getAllPedals(this.digiOrAnalog).subscribe(
      data => {
        this.pedals = data;
        console.log(data);
      }, error => {
        console.log('httperror');
        console.log(error);
      }
    );
  }

}
