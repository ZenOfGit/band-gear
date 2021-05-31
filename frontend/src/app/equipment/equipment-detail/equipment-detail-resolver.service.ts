import { EquipmentService } from './../../services/equipment.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Equipment } from 'src/app/models/equipment';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EquipmentDetailResolverService implements Resolve<Equipment> {
  constructor(
    private equipmentService: EquipmentService,
    private router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Equipment> | Equipment {
    const equipmentId = route.params['id'];
    return this.equipmentService.getEquipment(+equipmentId).pipe(
      catchError((error) => {
        this.router.navigate(['/']);
        return of(null);
      })
    );
  }
}
