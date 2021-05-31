import { PedalsService } from './../../services/pedals.service';
import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRoute,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Pedal } from 'src/app/models/pedal';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PedalDetailResolverService implements Resolve<Pedal> {
  constructor(private pedalsService: PedalsService, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Pedal> | Pedal { // return an observable of Pedal or Pedal data itself
    const pedalId = route.params['id'];
    return this.pedalsService.getPedal(+pedalId).pipe(
      catchError((error) => {
        this.router.navigate(['/']); // Should be a better error page instead of home page?
        return of(null);
      })
    );
  }
}
