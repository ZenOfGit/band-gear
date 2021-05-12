import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { apiEnv } from '../../environments/api-env';
import { DrumKit } from '../models/drum-kit';

@Injectable({
  providedIn: 'root',
})
export class DrumsService {

  constructor(private http: HttpClient) {}

  getAllCountries(): Observable<string[]> {
    return this.http.get<string[]>(apiEnv.apiUrl);
  }

  getDrumKit(id: number) {
    return this.getAllDrumKits().pipe(
      map(drumKitArray => {
        // throw new Error('A fake error occured');
        return drumKitArray.find(d => d.id === id);
      })
    );
  }

  getAllDrumKits(kitOrSingle?: number): Observable<DrumKit[]> {
    return this.http.get('data/drums.json').pipe(
      map((data) => {
        const drumArray: Array<DrumKit> = [];
        const localDrumKits = JSON.parse(localStorage.getItem('newDrumKit'));

        if (localDrumKits) {
          for (const id in localDrumKits) {
            if (kitOrSingle) {
              if (
                localDrumKits.hasOwnProperty(id) &&
                localDrumKits[id].kitOrSingle === kitOrSingle
              ) {
                drumArray.push(localDrumKits[id]);
              }
            } else {
              drumArray.push(localDrumKits[id]);
            }
          }
        }

        for (const id in data) {
          if (kitOrSingle) {
            if (data.hasOwnProperty(id) && data[id].kitOrSingle === kitOrSingle) {
              drumArray.push(data[id]);
            }
          } else {
            drumArray.push(data[id]);
          }
        }
        return drumArray;
      })
    );
  }

  addDrumKit(drumKit: DrumKit) {
    let newDrumKit = [drumKit];

    // Add new property in array if newDrum already exists in local storage
    if (localStorage.getItem('newDrumKit')) {
      newDrumKit = [drumKit, ...JSON.parse(localStorage.getItem('newDrumKit'))];
    }
    localStorage.setItem('newDrumKit', JSON.stringify(newDrumKit)); //Should just be drumkit?
  }

  newDrumId() {
    if (localStorage.getItem('dId')) {
      localStorage.setItem('dId', String(+localStorage.getItem('dId') +1));
      return +localStorage.getItem('dId');
    } else {
      localStorage.setItem('dId', '101');
      return 101;
    }
  }
}
