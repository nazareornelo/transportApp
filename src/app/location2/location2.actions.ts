import {Action} from '@ngrx/store';
import {Location} from './model/location';
import {Update} from '@ngrx/entity';
import {Search} from './model/search';

export enum LocationActionTypes {  
  ClearData = '[Clear Data store] ClearData',
  CreateNewLocation = '[Create New location] New Location Requested',
  LocationsRequested = '[Location Landing Page] Location Requested',
  LocationSaved = '[Edit Location Dialog] Location Saved',
  LocationsPageRequested = '[Location Landing Page] Location Page Requested',
  LocationsPageLoaded = '[Location API] Location Page Loaded',
  LocationsPageCancelled = '[Location API] Lessons Page Cancelled'
}

export interface PageQuery {
  pageIndex: number;
  pageSize:number;
}

export class CreateNewLocation implements Action {

  readonly type = LocationActionTypes.CreateNewLocation;

  constructor(public location : Location) {}

}


export class LocationsRequested implements Action {

  readonly type = LocationActionTypes.LocationsRequested;

  constructor(public id : string) {}

}

export class LocationsPageRequested implements Action {

  readonly type = LocationActionTypes.LocationsPageRequested;

  constructor(public payload: {page:PageQuery}, public search : Search) {}

}

export class LocationsPageLoaded implements Action {

  readonly type = LocationActionTypes.LocationsPageLoaded;

  constructor(public payload:{locations: Location[]}) {}

}

export class LocationsPageCancelled implements Action {

  readonly type = LocationActionTypes.LocationsPageCancelled;

}



export class LocationSaved implements Action {

  readonly type = LocationActionTypes.LocationSaved;

  constructor(public payload: { location: Update<Location> }) {}


}

export class ClearData implements Action {
  readonly type = LocationActionTypes.ClearData;
}



export type LocationActions =  
   ClearData
  |CreateNewLocation
  |LocationSaved
  | LocationsPageRequested
  | LocationsPageLoaded
  | LocationsPageCancelled;




