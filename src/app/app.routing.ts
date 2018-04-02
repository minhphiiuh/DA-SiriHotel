import { RoomComponent } from './room/room.component';
import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { NucleoiconsComponent } from './components/nucleoicons/nucleoicons.component';
import { ShippingComponent } from './shipping/shipping.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { RoomDetailComponent } from './room/room-detail/room-detail.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { BookingSuccessComponent } from './booking-success/booking-success.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'user-profile', component: ProfileComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'nucleoicons', component: NucleoiconsComponent },
  { path: 'rooms', component: RoomComponent },
  { path: 'rooms/:type', component: RoomDetailComponent },
  { path: 'search', component: SearchResultComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'shipping', component: ShippingComponent },
  { path: 'booking-success', component: BookingSuccessComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  // { path: '**', redirectTo: '/not-found', pathMatch: 'full' }
];

@NgModule({
  imports: [
CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
