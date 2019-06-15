import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Location} from './model/location';
import {LocationActions, LocationActionTypes} from './location2.actions';



export interface LocationState extends EntityState<Location> {
 loading:boolean;
}

export const adapter : EntityAdapter<Location> =
  createEntityAdapter<Location>({
    selectId:  Location => Location.resourceId
  });


const initialLocationState = adapter.getInitialState({
 loading: false
});


export function locationReducer(state = initialLocationState,
                               action: LocationActions): LocationState {

  switch(action.type) {

    case LocationActionTypes.CreateNewLocation:

      return {
        ...state      
      };

    case LocationActionTypes.LocationsPageCancelled:

      return {
        ...state,
       loading:false
      };

    case LocationActionTypes.LocationsPageRequested:
      return {
        ...state,
        loading:true
      };

    case LocationActionTypes.LocationsPageLoaded:

      return adapter.addMany(action.payload.locations, {...state, loading:false});

    case LocationActionTypes.LocationSaved:

        return adapter.updateOne(action.payload.location,state);
        
    case LocationActionTypes.ClearData:

          return state = undefined;

    default:

      return state;

  }
  
}



export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal

} = adapter.getSelectors();


