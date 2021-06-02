import { apiEnv } from 'src/environments/api-env';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Pedal } from '../models/pedal';

@Injectable({
  providedIn: 'root'
})
export class PedalsService {

  constructor(private http: HttpClient) { }

  getAllCountries(): Observable<string[]> {
    return this.http.get<string[]>(apiEnv.apiUrl);
  }

  getPedal(id: number) {
    return this.getAllPedals().pipe(
      map(pedalArray => {
        //throw new Error('A fake error occured');
        return pedalArray.find(d => d.id === id);
      })
    );
  }

  getAllPedals(digiOrAnalog?: number): Observable<Pedal[]> {
    return this.http.get('data/pedals.json').pipe(
      map((data) => {
        const pedalArray: Array<Pedal> = [];
        const localPedals = JSON.parse(localStorage.getItem('newPedal'));

        if (localPedals) {
          for (const id in localPedals) {
            if (digiOrAnalog) {
              if (
                localPedals.hasOwnProperty(id) &&
                localPedals[id].digiOrAnalog === digiOrAnalog
              ) {
                pedalArray.push(localPedals[id]);
              }
            } else {
              pedalArray.push(localPedals[id]);
            }
          }
        }

        for (const id in data) {
          if (digiOrAnalog) {
            if (data.hasOwnProperty(id) && data[id].digiOrAnalog === digiOrAnalog) {
              pedalArray.push(data[id]);
            }
          } else {
            pedalArray.push(data[id]);
          }
        }
        return pedalArray;
      })
    );
  }

  addPedal(pedal: Pedal) {
    let newPedal = [pedal];

    // Add new property in array if newDrum already exists in local storage
    if (localStorage.getItem('newPedal')) {
      newPedal = [pedal, ...JSON.parse(localStorage.getItem('newPedal'))];
    }
    localStorage.setItem('newPedal', JSON.stringify(newPedal));
  }

  newPedalId() {
    if (localStorage.getItem('pId')) {
      localStorage.setItem('pId', String(+localStorage.getItem('pId') +1));
      return +localStorage.getItem('pId');
    } else {
      localStorage.setItem('pId', '101');
      return 101;
    }
  }
}
