import { RoomDetailComponent } from './room-detail/room-detail.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { RoomComponent } from './room.component';
import { RoomTypeService } from '../services/roomType.service';
import { HttpModule } from '@angular/http';
import { CalendarService } from '../services/calendar.service';
import { LoadingModule } from 'ngx-loading';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule,
        HttpModule,
        LoadingModule,
        NgbModule
    ],
    declarations: [
        RoomComponent,
        RoomDetailComponent
    ],
    exports: [
        RoomComponent,
        LoadingModule,
    ],
    providers: [RoomTypeService, CalendarService]
})
export class RoomModule { }
