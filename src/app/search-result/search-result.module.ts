import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { RoomTypeService } from '../services/roomType.service';
import { HttpModule } from '@angular/http';
import { CalendarService } from '../services/calendar.service';
import { LoadingModule } from 'ngx-loading';
import { SearchResultComponent } from './search-result.component';


@NgModule({
    imports: [
    CommonModule,
        BrowserModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule,
        HttpModule,
        LoadingModule
    ],
    declarations: [
        SearchResultComponent
    ],
    exports: [
        SearchResultComponent,
        LoadingModule,
    ],
    providers: [RoomTypeService, CalendarService]
})
export class SearchResultModule { }
