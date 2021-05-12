import { DrumsService } from './../../services/drums.service';
import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRoute,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { DrumKit } from 'src/app/models/drum-kit';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DrumDetailResolverService implements Resolve<DrumKit> {
  constructor(private drumsService: DrumsService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DrumKit> | DrumKit {
    const drumKitId = route.params['id'];
    return this.drumsService.getDrumKit(+drumKitId).pipe(
      catchError((error) => {
        this.router.navigate(['/']); // Should be a better error page instead of home page?
        return of(null);
      })
    );
  }
}
