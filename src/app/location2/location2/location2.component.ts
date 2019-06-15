import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild, AfterViewChecked, OnDestroy} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { MatPaginator } from "@angular/material/paginator";
import {LocationsService} from "../services/location.service";
import {tap} from 'rxjs/operators';
import {Observable} from "rxjs";
import {LocationsDataSource} from "../services/locations.datasource";
import {AppState} from '../../reducers';
import {select, Store} from '@ngrx/store';
import {PageQuery, ClearData} from '../location2.actions';
import {selectLocationsLoading} from '../location2.selectors';
import {Location} from "../model/location";
import {Search}  from "../model/search";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import {EditlocationdiaglogComponent} from "../editlocationdiaglog/editlocationdiaglog.component"

@Component({
  selector: 'location2',
  templateUrl: './location2.component.html',
  styleUrls: ['./location2.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Location2Component implements OnInit, AfterViewInit, OnDestroy {
  dataSource: LocationsDataSource;
  search_value : Search;
  displayedColumns = ["name", "function", "resourceId", "editlocation"];
  clear : boolean = true;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  loading$ : Observable<boolean>;


  constructor(private locationsService: LocationsService, private route: ActivatedRoute, private store: Store<AppState>,private dialog: MatDialog) {

  }

  ngOnInit() {
   
    this.dataSource = new LocationsDataSource(this.store,this.paginator );
  
  }

  searchlocation(search_id : string, search_name : string, search_funct : string, search_byid : string,search_byname : string ,search_byfunction : string){

    
  
  let search : Search = {
  
    id: search_id,
    name: search_name,
    funct : search_funct,
    byid : search_byid,
    byname : search_byname,
    byfunction : search_byfunction

  }
  this.search_value = search;

  this.loading$ = this.store.pipe(select(selectLocationsLoading));


 
  const initialPage: PageQuery = {
    pageIndex: 0,
    pageSize: 100
  };
  this.dataSource.loadLocations(initialPage,search);  

  }

  ngAfterViewInit() {

    
  
    this.paginator.page
      .pipe(
        tap(() => this.loadLocationsPage())
      )
      .subscribe();


}

loadLocationsPage() {

  const newPage: PageQuery = {
    pageIndex: this.paginator.pageIndex,
    pageSize:  this.paginator.pageSize
  };

  console.log("pageIndex = " + newPage.pageIndex + "  pageSize  = " + newPage.pageSize )


}

editLocation(location : Location){
  const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '400px';

        dialogConfig.data = location;
        
        const dialogRef = this.dialog.open(EditlocationdiaglogComponent,
            dialogConfig);


}
clearData(){
  
  
  this.dataSource.initcall = true;
  this.dataSource.data = [];
  

}
ngOnDestroy(){
}
}
