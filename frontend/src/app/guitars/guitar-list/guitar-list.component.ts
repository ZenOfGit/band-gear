import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GuitarsService } from './../../services/guitars.service';
import { Guitar } from '../../models/guitar';
import { ConditionalExpr } from '@angular/compiler';


@Component({
  selector: 'app-guitar-list',
  templateUrl: './guitar-list.component.html',
  styleUrls: ['./guitar-list.component.scss']
})
export class GuitarListComponent implements OnInit {

  isElectric = 4;
  guitars: Array<Guitar>;

  constructor(private route: ActivatedRoute, private guitarsService: GuitarsService) { }

  ngOnInit(): void {
    if (this.route.snapshot.url.toString() === "guitars") {
      this.isElectric = 0;
    } else if (this.route.snapshot.url.toString() === "guitars-electric"){
      this.isElectric = 1;
    } else if (this.route.snapshot.url.toString() === "guitars-acoustic"){  //remove the if?
      this.isElectric = 2;
    }
    this.guitarsService.getAllGuitars(this.isElectric).subscribe(
      data => {
        this.guitars = data;
        console.log(data);
      }, error => {
        console.log('httperror');
        console.log(error);
      }
    );
  }
}
