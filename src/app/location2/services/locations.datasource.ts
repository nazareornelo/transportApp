import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {Observable, BehaviorSubject, of} from "rxjs";
import {Location} from "../model/location";
import {Search} from "../model/search";
import {catchError, finalize, tap} from 'rxjs/operators';
import {AppState} from '../../reducers';
import {select, Store} from '@ngrx/store';
import {LocationsPageRequested, PageQuery, ClearData} from '../location2.actions';
import {selectLocationPage} from '../location2.selectors';
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";

export class LocationsDataSource extends MatTableDataSource<Location> {// DataSource<Location> {

    public newData : Location[];
    pageNext : number = 1;
    pageCurrent : number = 0;
    initialPage1: PageQuery = {
      pageIndex: 1,
      pageSize: 100
    };
    initialPage2: PageQuery = {
      pageIndex: 2,
      pageSize: 100
    };
    initialPage3: PageQuery = {
      pageIndex: 3,
      pageSize: 100
    };
    initialPage4: PageQuery = {
      pageIndex: 4,
      pageSize: 100
    };
    public initcall : boolean = true;
    calls : number = 0;
    constructor(private store: Store<AppState>, public paginator : MatPaginator) {super();
    this.paginator = paginator;
    }

    loadLocations(page: PageQuery, search:Search) {
      
        this.store
          .pipe(
            
            
           select(selectLocationPage(page,search)),
           

            tap(
             
              locations => {
               
            

              if (this.initcall ){
                
                this.store.dispatch(new LocationsPageRequested({page},search));
                page = this.initialPage1;
                
                this.store.dispatch(new LocationsPageRequested({page},search));
                page = this.initialPage2;
                
                this.store.dispatch(new LocationsPageRequested({page},search));  
                page = this.initialPage3;
                this.store.dispatch(new LocationsPageRequested({page},search));  

                page = this.initialPage4;
                this.store.dispatch(new LocationsPageRequested({page},search)); 
                this.data = locations;
               this.initcall  = false;
               this.store.dispatch(new ClearData());
               } else {
               
                  this.data = locations;
                }
            
        
              }
             
            
            ) 
            ,
            catchError(() => of([])),
          
            
          )
          
          .subscribe();
            
    }
}

