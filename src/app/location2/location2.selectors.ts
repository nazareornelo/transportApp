import {createFeatureSelector, createSelector} from '@ngrx/store';
import {LocationState} from './location2.reducers';
import * as fromLocation from './location2.reducers';
import {PageQuery} from './location2.actions';
import {Search} from './model/search'


export const selectLocationsState = createFeatureSelector<LocationState>("locations");




export const selectAllLocation = createSelector(
    selectLocationsState,
    fromLocation.selectAll

);


export const selectLocationPage = (page:PageQuery,search:Search) => createSelector(
  selectAllLocation,


  allLocations => {


    return allLocations


  }  
);


export const selectLocationsLoading = createSelector(
  selectLocationsState,
 locationState => locationState.loading
);









