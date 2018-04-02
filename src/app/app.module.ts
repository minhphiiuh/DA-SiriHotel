import { RoomModule } from './room/room.module';
import { RoomComponent } from './room/room.component';
import { HomeModule } from './home/home.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ShippingComponent } from './shipping/shipping.component';
import { TransactionService } from './services/transaction.service';
import { SearchResultModule } from './search-result/search-result.module';
import { ComponentsModule } from './components/components.module';
import { BookingSuccessComponent } from './booking-success/booking-success.component';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    ProfileComponent,
    NavbarComponent,
    FooterComponent,
    ShippingComponent,
    BookingSuccessComponent
  ],
  imports: [
BrowserModule,
    NgbModule.forRoot(),
    FormsModule,
    RouterModule,
    AppRoutingModule,
    HomeModule,
    RoomModule,
    ReactiveFormsModule,
    SearchResultModule,
    ComponentsModule
  ],
  providers: [TransactionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
