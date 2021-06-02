import { apiEnv } from 'src/environments/api-env';
import { Guitar } from '../models/guitar';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GuitarsService {

  constructor(private http: HttpClient) {}

  getAllCountries(): Observable<string[]> {
    return this.http.get<string[]>(apiEnv.apiUrl);
  }

  getGuitar(id: number) {
    return this.getAllGuitars().pipe(
      map((guitarArray) => {
        return guitarArray.find(g => g.id === id);
      })
    );
  }

  getAllGuitars(isElectric?: number): Observable<Guitar[]> {
    return this.http.get('data/guitars.json').pipe(
      map((data) => {
        const guitarArray: Array<Guitar> = [];
        const localGuitars = JSON.parse(localStorage.getItem('newGuit'));

        if (localGuitars) {
          for (const id in localGuitars) {
            if (isElectric) {
              if (
                localGuitars.hasOwnProperty(id) &&
                localGuitars[id].isElectric === isElectric
              ) {
                guitarArray.push(localGuitars[id]);
              }
            } else {
              guitarArray.push(localGuitars[id]);
            }
          }
        }

        for (const id in data) {
          if (isElectric) {
            if (data.hasOwnProperty(id) && data[id].isElectric === isElectric) {
              guitarArray.push(data[id]);
            }
          } else {
            guitarArray.push(data[id]);
          }
        }
        return guitarArray;
      })
    );
  }
  /* return this.http.get<Guitar[]>('data/guitar.json'); */

  /*         // From Local Storage FIX FOR FILTER BUTTON
        if (localGuitars) {
          for (const id in localGuitars) {
            if (isElectric == 0) {
              if (localGuitars.hasOwnProperty(id)) {
                guitarArray.push(localGuitars[id]);
              } else if (localGuitars.hasOwnProperty(id) && localGuitars[id].isElectric === isElectric) {
                guitarArray.push(localGuitars[id]);
              }
            } else if (isElectric == 1) {
              if (localGuitars.hasOwnProperty(id) && localGuitars[id].isElectric === 1) {
              guitarArray.push(localGuitars[id]);
            }
            } else if (isElectric == 2) {
              if (localGuitars.hasOwnProperty(id) && localGuitars[id].isElectric === 2) {
              guitarArray.push(localGuitars[id]);
            } else {  //  ADDED to populate detail data but loads all guitars into all filter buttons MAYBE NOT DO THIS IN THE SERVICE
              guitarArray.push(localGuitars[id]);
            }
          }
        }
      }
        // From data
        for (const id in data) {
          if (isElectric == 0) { // === 0
            if (data.hasOwnProperty(id)) { // not pushing to array when looking for id
              guitarArray.push(data[id]);
            }
          } else if (data.hasOwnProperty(id) && data[id].isElectric === isElectric) {
            guitarArray.push(data[id]);
          } else { // ADDED to populate detail data but loads all guitars into all filter buttons MAYBE NOT DO THIS IN THE SERVICE
            guitarArray.push(data[id]);
          }
        }

        // Data and Local Storage
        return guitarArray;
      })
    ); */

  addGuitar(guitar: Guitar) {
    let newGuit = [guitar];

    if (localStorage.getItem('newGuit')) {
      newGuit = [guitar, ...JSON.parse(localStorage.getItem('newGuit'))];
    }
    localStorage.setItem('newGuit', JSON.stringify(newGuit));
  }

  newGuitarId() {
    if (localStorage.getItem('gId')) {
      localStorage.setItem('gId', String(+localStorage.getItem('gId') + 1));
      return +localStorage.getItem('gId');
    } else {
      localStorage.setItem('gId', '101');
      return 101;
    }
  }
}
