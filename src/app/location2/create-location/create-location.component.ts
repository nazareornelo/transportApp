import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import {Location} from "../model/location";
import {Address} from "../model/address";
import {Coordinates} from "../model/coordinates";
import {LocationsService} from "../services/location.service";
import {AppState} from "../../reducers";
import {Store} from "@ngrx/store";
import {CreateNewLocation} from '../location2.actions';

@Component({
  selector: 'create-location',
  templateUrl: './create-location.component.html',
  styleUrls: ['./create-location.component.scss']
})
export class CreateLocationComponent implements OnInit {

  constructor(
    private store: Store<AppState>,
    private locationsService: LocationsService,
    private fb: FormBuilder

  ) { }

 ngOnInit() {

  }



creatlocation(
s_name : string,
s_normalizedName : string,
s_funct: string,
s_city :string,
s_country :string,
s_continent : string,
s_streetName : string,
s_streetNumber : string,
s_postalCode : string,
s_administrativeLevel2 : string,
s_administrativeLevel1 : string,
s_latitudeInDegrees : number,
s_longitudeInDegrees : number
){

let add : Address = {

  city : s_city,
  country :s_country,
  continent : s_continent,
  streetName: s_streetName,
  streetNumber : s_streetNumber,
  postalCode : s_postalCode,
  administrativeLevel2 : s_administrativeLevel2 ,
  administrativeLevel1 : s_administrativeLevel1

 };

 let cood : Coordinates = {

  latitudeInDegrees : s_latitudeInDegrees,
  longitudeInDegrees :s_longitudeInDegrees
};


 let location2  : Location = {
   name : s_name ,
   normalizedName : s_normalizedName,
   address : add,
   coordinates : cood,
   function : s_funct
};

console.log(location2);

this.locationsService.creatLocation(location2).subscribe(data =>
  {
   console.log(data.resourceId);
   this.store.dispatch(new CreateNewLocation(data));
   alert("Created new location " + data.resourceId);
},
error => {
  alert("Input all fields or contact the System Administrator");

});

  }
}
