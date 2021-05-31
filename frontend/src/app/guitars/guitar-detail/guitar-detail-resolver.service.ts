import { Injectable } from '@angular/core';
import { GuitarsService } from './../../services/guitars.service';
import {
  Resolve,
  ActivatedRoute,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Guitar } from 'src/app/models/guitar';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GuitarDetailResolverService implements Resolve<Guitar> {

  constructor(private guitarsService: GuitarsService, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Guitar> | Guitar {
    const guitarId = route.params['id'];
    return this.guitarsService.getGuitar(+guitarId).pipe(
      catchError((error) => {
        this.router.navigate(['/']);
        return of(null);
      })
    );
  }
}
