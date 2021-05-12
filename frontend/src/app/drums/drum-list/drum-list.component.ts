import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DrumKit } from './../../models/drum-kit';
import { DrumsService } from './../../services/drums.service';

@Component({
  selector: 'app-drum-list',
  templateUrl: './drum-list.component.html',
  styleUrls: ['./drum-list.component.scss']
})
export class DrumListComponent implements OnInit {

  kitOrSingle = 0;
  drumKits: Array<DrumKit>;

  constructor(private route: ActivatedRoute, private drumsService: DrumsService) { }

  //NEED to work on this because All Drums button only shows the two from teh json data
  ngOnInit(): void {
    if (this.route.snapshot.url.toString() === "drums") {
      this.kitOrSingle = 0;
    } else if (this.route.snapshot.url.toString() === "drums-kits"){
      this.kitOrSingle = 1;
    } else if (this.route.snapshot.url.toString() === "drums-single"){
      this.kitOrSingle = 2;
    } //else {  // we should not get to this option
      //this.kitOrSingle = 0;
    //}
    this.drumsService.getAllDrumKits(this.kitOrSingle).subscribe(
      data => {
        this.drumKits = data;
/*         const newDrumKit = JSON.parse(localStorage.getItem('newDrum'));

        if (newDrumKit.kitOrSingle == this.kitOrSingle) {
          this.drumKits = [newDrumKit, ...this.drumKits];
        } */
        console.log(data);
      }, error => {
        console.log('httperror');
        console.log(error);
      }
    );
  }
}
