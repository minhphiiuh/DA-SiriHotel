import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import {  Constant } from '../shared/constant';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
    searchRoomForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private router: Router
    ) { }

    ngOnInit() {
        this.clearSession();
        this.searchRoomForm = this.fb.group({
            'checkin': new FormControl('', Validators.required),
            'checkout': new FormControl('', Validators.required)
        });
    }

    checkAvailble(value) {
        const checkin = value.checkin;
        const checkout = value.checkout;
        const strCheckin = checkin.year + '-' + checkin.month + '-' + checkin.day;
        const strChecout = checkout.year + '-' + checkout.month + '-' + checkout.day;
        localStorage.setItem(Constant.CHECK_IN, strCheckin);
        localStorage.setItem(Constant.CHECK_OUT, strChecout);
        this.router.navigate(['/search'], { queryParams: { checkin: strCheckin, checkout: strChecout }});
    }

    private clearSession(): void {
        localStorage.removeItem(Constant.CHECK_IN);
        localStorage.removeItem(Constant.CHECK_OUT);
        localStorage.removeItem(Constant.ITEMS);
        localStorage.removeItem(Constant.TOTAL);
    }

}
