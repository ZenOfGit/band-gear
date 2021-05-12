import { OthersService } from './../../services/others.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Other } from '../../models/other';

@Component({
  selector: 'app-other-instruments-list',
  templateUrl: './other-instruments-list.component.html',
  styleUrls: ['./other-instruments-list.component.scss']
})
export class OtherInstrumentsListComponent implements OnInit {

  isElectric = 0;
  others: Array<Other>;

  constructor(private route: ActivatedRoute, private otherService: OthersService) { }

  ngOnInit() {
    if (this.route.snapshot.url.toString() === "others") {
      this.isElectric = 0;
    } else if (this.route.snapshot.url.toString() === "others-electric"){
      this.isElectric = 1;
    } else if (this.route.snapshot.url.toString() === "others-acoustic"){
      this.isElectric = 2;
    } else {  // we should not get to this option
      this.isElectric = 0;
    }
    this.otherService.getAllOthers(this.isElectric).subscribe(
      data => {
        this.others = data;
        console.log(data);
      }, error => {
        console.log('httperror');
        console.log(error);
      }
    );
  }
}
