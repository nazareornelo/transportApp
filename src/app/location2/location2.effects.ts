import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {
  CreateNewLocation,
  LocationsRequested,
  LocationSaved,
  LocationActionTypes,
   LocationsPageCancelled, LocationsPageLoaded,
  LocationsPageRequested
} from './location2.actions';
import {throwError,of} from 'rxjs';
import {catchError, concatMap, exhaustMap, filter, map, mergeMap, withLatestFrom} from "rxjs/operators";
import {LocationsService} from './services/location.service';
import {AppState} from '../reducers';
import {select, Store} from '@ngrx/store';

@Injectable()
export class LocationEffects {

  constructor(private actions$ :Actions, private locationsService: LocationsService,
    private store: Store<AppState>) {

}

  @Effect()
  loadLocationsPage$ = this.actions$
    .pipe(
      ofType<LocationsPageRequested>(LocationActionTypes.LocationsPageRequested),
      mergeMap(({payload,search}) =>
              this.locationsService.locationsByPageSize(
                          payload.page,search)
                          
                .pipe(
                  catchError(err => {
                    
                    console.log('error loading a lessons page ', err);
                    this.store.dispatch(new LocationsPageCancelled());
                    alert("Please contact the System Admistrator");
                    return of([]);
                  })
                )
      
      ),
      map(locations => new LocationsPageLoaded({locations})));

      @Effect()
      loadlocation$ = this.actions$
        .pipe(
          ofType<LocationsRequested>(LocationActionTypes.LocationsRequested),
          mergeMap(action => this.locationsService.locationId(action.id)),
          map(location => new LocationSaved(location))
      );

}









