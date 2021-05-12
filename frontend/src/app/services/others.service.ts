import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Other } from '../models/other';

@Injectable({
  providedIn: 'root',
})
export class OthersService {

  constructor(private http: HttpClient) {}

  getAllCountries(): Observable<string[]> {
    return this.http.get<string[]>('http://localhost:5000/api/countries');
  }

  getOther(id: number) {
    return this.getAllOthers().pipe(
      map(otherArray => {
        //throw new Error('A fake error occured');
        return otherArray.find(o => o.id === id);
      })
    );
  }

  getAllOthers(isElectric?: number): Observable<Other[]> {
    return this.http.get('data/others.json').pipe(
      map((data) => {
        const otherArray: Array<Other> = [];
        const localOthers = JSON.parse(localStorage.getItem('newOther'));

        if (localOthers) {
          for (const id in localOthers) {
            if (isElectric) {
              if (
                localOthers.hasOwnProperty(id) &&
                localOthers[id].isElectric === isElectric
              ) {
                otherArray.push(localOthers[id]);
              }
            } else {
              otherArray.push(localOthers[id]);
            }
          }
        }

        for (const id in data) {
          if (isElectric) {
            if (data.hasOwnProperty(id) && data[id].isElectric === isElectric) {
              otherArray.push(data[id]);
            }
          } else {
            otherArray.push(data[id]);
          }
        }
        return otherArray;
      })
    );
  }

  addOther(other: Other) {
    let newOther = [other];

    // Add new property in array if newDrum already exists in local storage
    if (localStorage.getItem('newOther')) {
      newOther = [other, ...JSON.parse(localStorage.getItem('newOther'))];
    }
    localStorage.setItem('newOther', JSON.stringify(newOther));
  }

  newOtherId() {
    if (localStorage.getItem('oId')) {
      localStorage.setItem('oId', String(+localStorage.getItem('oId') + 1));
      return +localStorage.getItem('oId');
    } else {
      localStorage.setItem('oId', '101');
      return 101;
    }
  }
}
