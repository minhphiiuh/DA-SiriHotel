import { FeedBackComponent } from './feed-back/feed-back.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { ComponentsModule } from '../components/components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ContactComponent } from './contact/contact.component';
import { IntroduceComponent } from './introduce/introduce.component';


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
        IntroduceComponent,
        ContactComponent
    ],
    exports: [
        HomeComponent
    ],
    providers: []
})
export class HomeModule { }
