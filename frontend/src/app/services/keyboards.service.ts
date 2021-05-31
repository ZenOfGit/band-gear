import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Keyboard } from '../models/keyboard';

@Injectable({
  providedIn: 'root'
})
export class KeyboardsService {

constructor(private http: HttpClient) { }

getAllCountries(): Observable<string[]> {
  return this.http.get<string[]>('http://localhost:5000/api/countries');
}

getKeyboard(id: number) {
  return this.getAllKeyboards().pipe(
    map(keboardArray => {
      //throw new Error('A fake error occured');
      return keboardArray.find(d => d.id === id);
    })
  );
}

getAllKeyboards(isElectric?: number): Observable<Keyboard[]> {
  return this.http.get('data/keyboards.json').pipe(
    map((data) => {
      const keyboardArray: Array<Keyboard> = [];
      const localKeyboards = JSON.parse(localStorage.getItem('newKeyboard'));

      if (localKeyboards) {
        for (const id in localKeyboards) {
          if (isElectric) {
            if (
              localKeyboards.hasOwnProperty(id) &&
              localKeyboards[id].isElectric === isElectric
            ) {
              keyboardArray.push(localKeyboards[id]);
            }
          } else {
            keyboardArray.push(localKeyboards[id]);
          }
        }
      }

      for (const id in data) {
        if (isElectric) {
          if (data.hasOwnProperty(id) && data[id].isElectric === isElectric) {
            keyboardArray.push(data[id]);
          }
        } else {
          keyboardArray.push(data[id]);
        }
      }
      return keyboardArray;
    })
  );
}

addKeyboard(keyboard: Keyboard) {
  let newKeyboard = [keyboard];

  // Add new property in array if newDrum already exists in local storage
  if (localStorage.getItem('newKeyboard')) {
    newKeyboard = [keyboard, ...JSON.parse(localStorage.getItem('newKeyboard'))];
  }
  localStorage.setItem('newKeyboard', JSON.stringify(newKeyboard));
}

newKeyboardId() {
  if (localStorage.getItem('kId')) {
    localStorage.setItem('kId', String(+localStorage.getItem('kId') +1));
    return +localStorage.getItem('kId');
  } else {
    localStorage.setItem('kId', '101');
    return 101;
  }
}
}
