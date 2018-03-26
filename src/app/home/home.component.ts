import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
    checkInDate: Date;

    checkOutDate: Date;

    searchRoomForm: FormGroup;

    constructor(
        private fb: FormBuilder
    ) { }

    ngOnInit() {
        this.searchRoomForm = this.fb.group({
            'checkin': new FormControl('', Validators.required),
            'checkout': new FormControl('', Validators.required)
        });
    }

    onSubmit(value: string) {
        console.log(value);
    }
}
