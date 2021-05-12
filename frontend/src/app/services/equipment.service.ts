import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { from, Observable } from 'rxjs';

import { apiEnv } from'./../../environments/api-env';
import { Equipment } from '../models/equipment';

@Injectable({
  providedIn: 'root',
})
export class EquipmentService {

  constructor(private http: HttpClient) {}

  getAllCountries(): Observable<string[]> {
    return this.http.get<string[]>(apiEnv.apiUrl);
  }

  getEquipment(id: number) {
    return this.getAllEquipment().pipe(
      map((equipmentArray) => {
        //throw new Error('A fake error occured');
        return equipmentArray.find((eq) => eq.id === id);
      })
    );
  }

  getAllEquipment(powered?: number): Observable<Equipment[]> {
    return this.http.get('data/equipment.json').pipe(
      map((data) => {
        const equipmentArray: Array<Equipment> = [];
        const localEquipment = JSON.parse(localStorage.getItem('newEquip'));

        if (localEquipment) {
          for (const id in localEquipment) {
            if (powered) {
              if (
                localEquipment.hasOwnProperty(id) &&
                localEquipment[id].powered === powered
              ) {
                equipmentArray.push(localEquipment[id]);
              }
            } else {
              equipmentArray.push(localEquipment[id]);
            }
          }
        }

        for (const id in data) {
          if (powered) {
            if (data.hasOwnProperty(id) && data[id].powered === powered) {
            equipmentArray.push(data[id]);
            }
          } else {
            equipmentArray.push(data[id]);
          }
        }
        return equipmentArray;
      })
    );
  }

  addEquipment(equipment: Equipment) {
    let newEquip = [equipment];

    // Add new property in array if neweQUIP already exists in local storage
    if (localStorage.getItem('newEquip')) {
      newEquip = [equipment, ...JSON.parse(localStorage.getItem('newEquip'))];
    }
    localStorage.setItem('newEquip', JSON.stringify(newEquip)); // newEquip is the key
  }

  newEquipmentId() {
    if (localStorage.getItem('eId')) {
      localStorage.setItem('eId', String(+localStorage.getItem('eId') + 1));
      return +localStorage.getItem('eId');
    } else {
      localStorage.setItem('eId', '101');
      return 101;
    }
  }
}
