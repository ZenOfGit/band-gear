import { OthersService } from './../../services/others.service';
import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRoute,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Other } from 'src/app/models/other';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OtherInstrumentsDetailResolverService implements Resolve<Other> {
  constructor(private othersService: OthersService, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Other> | Other { // return an observable of Other or Other data itself
    const otherId = route.params['id'];
    return this.othersService.getOther(+otherId).pipe(
      catchError((error) => {
        this.router.navigate(['/']); // Should be a better error page instead of home page?
        return of(null);
      })
    );
  }
}
