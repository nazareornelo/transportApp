import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LocationsService} from "./services/location.service";
import {Location2Component} from "./location2/location2.component";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSelectModule } from "@angular/material/select";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import {MatTabsModule} from "@angular/material/tabs";
import {ReactiveFormsModule} from "@angular/forms";
import {MatMomentDateModule} from "@angular/material-moment-adapter";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {RouterModule, Routes} from "@angular/router";
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {LocationEffects} from './location2.effects';
import {locationReducer} from './location2.reducers';
import {MatBottomSheetModule} from '@angular/material';
import { EditlocationdiaglogComponent } from './editlocationdiaglog/editlocationdiaglog.component';

export const locationsRoutes: Routes = [
    {

        path: 'search',
        component: Location2Component,
       
    }

];



@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatTabsModule,
        MatInputModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatProgressSpinnerModule,
        MatSlideToggleModule,
        MatDialogModule,
        MatSelectModule,
        MatDatepickerModule,
        MatBottomSheetModule,
        MatMomentDateModule,
        ReactiveFormsModule,
        RouterModule.forChild(locationsRoutes),
        StoreModule.forFeature('locations', locationReducer),
        EffectsModule.forFeature([LocationEffects])
    ],
    declarations: [Location2Component,  EditlocationdiaglogComponent],
    exports: [Location2Component],
    entryComponents: [ EditlocationdiaglogComponent],
    providers: [
        LocationsService,
    ]
})
export class LocationsModule {


}
