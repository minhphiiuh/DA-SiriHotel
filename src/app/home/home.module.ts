import { ListServicesComponent } from './list-services/list-services.component';
import { FeedBackComponent } from './feed-back/feed-back.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { ComponentsModule } from '../components/components.module';
import { IntroduceRoomComponent } from './introduce-room/introduce-room.component';
import { ReactiveFormsModule } from '@angular/forms'; 

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        RouterModule,
        ComponentsModule,
        NgbModule.forRoot(),
        ReactiveFormsModule
    ],
    declarations: [
        HomeComponent,
        FeedBackComponent,
        IntroduceRoomComponent,
        ListServicesComponent
    ],
    exports: [
        HomeComponent
    ],
    providers: []
})
export class HomeModule { }
