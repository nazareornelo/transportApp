
import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Location} from "../model/location";
import {Search} from "../model/search";
import {PageQuery} from '../location2.actions';
@Injectable()
export class LocationsService {

    constructor(private http:HttpClient) {

    }

    allLocations(): Observable<any> {
        return this.http.get('http://arviem-api.us-east-1.elasticbeanstalk.com/tenant1/locations');        
    }

    locationsByPageSize(page :PageQuery,search:Search): Observable<any> {
        let filterParams = new HttpParams();
        filterParams = filterParams.append('page',page.pageIndex.toString());
        filterParams = filterParams.append('pageSize',page.pageSize.toString());
        if(search.name != "")
          filterParams = filterParams.append('name',search.name);
        if(search.id != "")
          filterParams = filterParams.append('id',search.id);
        if(search.funct != "")
          filterParams = filterParams.append('function',search.funct);
        let sort = "";
        let id = "";
        let name = "";
        let func = "";
        if(search.byid != undefined)
          id = search.byid
        if(search.byname != undefined)
          name = search.byname
        if(search.byfunction != undefined)
          func = search.byfunction  
        if(id != "" && name !="" && func != "" )
          sort = id + "," + name + "," + func
        else   
        if(id != "" && name !=""  )
          sort = name+ "," + id
        else   
        if(name !="" && func != "")
          sort = name + "," + func
        else if  (id !="" && func != "")
        sort = id + "," + func 
        else if (id !=  "")
          sort = id        
        else if (name !=  "")
          sort = name
        else if (func !=  "")
          sort = func 
        if(sort != "")
         filterParams = filterParams.append('sort',sort);
          


        return this.http.get('http://arviem-api.us-east-1.elasticbeanstalk.com/tenant1/locations',{ params: filterParams
    });
    }

    locationId(id : string) : Observable<any> {
        let filterParams = new HttpParams();
        filterParams = filterParams.append('id',id.substring(19,24));
        return this.http.get('http://arviem-api.us-east-1.elasticbeanstalk.com/tenant1/locations',{ params: filterParams
    });

    }

    locationUpdateByID( resourceid : string,changes : Partial<Location>) : Observable<any> {
        return this.http.put(`http://arviem-api.us-east-1.elasticbeanstalk.com` + resourceid,changes 
        );
        
    }
    
    creatLocation(location :  Partial<Location>) : Observable<any> {
        return this.http.post(`http://arviem-api.us-east-1.elasticbeanstalk.com/tenant1/locations`, location);
        
    }
    


}