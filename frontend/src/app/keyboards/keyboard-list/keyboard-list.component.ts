import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Keyboard } from '../../models/keyboard';
import { KeyboardsService } from './../../services/keyboards.service';

@Component({
  selector: 'app-keyboard-list',
  templateUrl: './keyboard-list.component.html',
  styleUrls: ['./keyboard-list.component.scss']
})
export class KeyboardListComponent implements OnInit {

  isElectric = 0;
  keyboards: Array<Keyboard>;

  constructor(private route: ActivatedRoute, private keyboardsService: KeyboardsService) { }

  ngOnInit() {
    if (this.route.snapshot.url.toString() === "keyboards") {
      this.isElectric = 0;
    } else if (this.route.snapshot.url.toString() === "keyboards-digital"){
      this.isElectric = 1;
    } else if (this.route.snapshot.url.toString() === "keyboards-analog"){
      this.isElectric = 2;
    }/*  else {  // we should not get to this option
      this.isElectric = 0;
    } */
    this.keyboardsService.getAllKeyboards(this.isElectric).subscribe(
      data => {
        this.keyboards = data;
        console.log(data);
      }, error => {
        console.log('httperror');
        console.log(error);
      }
    );
  }
}
