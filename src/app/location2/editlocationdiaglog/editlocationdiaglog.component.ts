import {Component, Inject, OnInit, ViewEncapsulation, ChangeDetectionStrategy} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import {Location} from "../model/location";
import {Address} from "../model/address";
import {Coordinates} from "../model/coordinates";
import {LocationsService} from "../services/location.service";
import {AppState} from "../../reducers";
import {Store} from "@ngrx/store";
import {Update} from "@ngrx/entity";
import {LocationSaved} from '../location2.actions';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'editlocationdiaglog',
  templateUrl: './editlocationdiaglog.component.html',
  styleUrls: ['./editlocationdiaglog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditlocationdiaglogComponent implements OnInit {

    location:Location;

    form: FormGroup;
    description:string;
    enter : boolean = true; 
    constructor(
      private store: Store<AppState>,
      private locationsService: LocationsService,
      private fb: FormBuilder,
      private dialogRef: MatDialogRef<EditlocationdiaglogComponent>,
      @Inject(MAT_DIALOG_DATA) data:Location ) { 

      this.form = fb.group({
        name: [data.name, Validators.required],
        normalizedName: [data.normalizedName, Validators.required],
        city: [data.address.city, Validators.required],
        country: [data.address.country, Validators.required],
        continent: [data.address.continent, Validators.required],
        streetName: [data.address.streetName, Validators.required],
        streetNumber: [data.address.streetNumber, Validators.required],
        postalCode: [data.address.postalCode, Validators.required],
        administrativeLevel2: [data.address.administrativeLevel2, Validators.required],
        administrativeLevel1: [data.address.administrativeLevel1, Validators.required],
        latitudeInDegrees: [data.coordinates.latitudeInDegrees, Validators.required],
        longitudeInDegrees: [data.coordinates.longitudeInDegrees, Validators.required],
        resourceId: [data.resourceId, Validators.required],
        version: [data.version, Validators.required],
        function: [data.function, Validators.required],


      });

  }

  save() {
   
    let changes = this.form.value;
    let add : Address = {

      city : changes.city,
      country : changes.country,
      continent : changes.continent,
      streetName: changes.streetName,
      streetNumber : changes.streetNumber,
      postalCode : changes.postalCode,
      administrativeLevel2 : changes.administrativeLevel2,
      administrativeLevel1 : changes.administrativeLevel1

      
     };

     let cood : Coordinates = {

      latitudeInDegrees : changes.latitudeInDegrees,
      longitudeInDegrees : changes.longitudeInDegrees
    };

    let location2  : Location = {
      name : changes.name,
      normalizedName : changes.normalizedName,       
      address : add, 
      coordinates : cood,      
      function : changes.function,
      version : changes.version,
      resourceId : changes.resourceId

   };
  
    this.location  = location2;
    this.locationsService
        .locationUpdateByID(this.location.resourceId,location2)
        .subscribe(
            (data) => {

                const location: Update<Location> = {
                  id: this.location.resourceId,
                  changes :{
                    name : data.name,
                    normalizedName : data.normalizedName,       
                    address : data.address, 
                    coordinates : data.coordinates,      
                    function : data.function,
                    version : data.version,
                    resourceId : data.resourceId   
                  }
                };

                this.store.dispatch(new LocationSaved({location}));
                this.dialogRef.close();
               
            },
            error => {
              alert("Please contact the System Administrator");
             
          }
            
        );
      
        
    }

  close() {
      this.dialogRef.close();
  }
  ngOnInit() {
   
  }

}
