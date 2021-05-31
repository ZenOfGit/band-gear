import { KeyboardsService } from './../../services/keyboards.service';
import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRoute,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Keyboard } from 'src/app/models/keyboard';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class KeyboardDetailResolverService implements Resolve<Keyboard> {
  constructor(private keyboardsService: KeyboardsService, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Keyboard> | Keyboard { // return an observable of Keyboard or Keyboard data itself
    const keyboardId = route.params['id'];
    return this.keyboardsService.getKeyboard(+keyboardId).pipe(
      catchError((error) => {
        this.router.navigate(['/']); // Should be a better error page instead of home page?
        return of(null);
      })
    );
  }
}
