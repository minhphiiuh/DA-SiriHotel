import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Constant } from './../shared/constant';
import { RoomTypeDTO } from './../models/room-type-dto.model';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CalendarService } from './../services/calendar.service';
import { TransactionService } from './../services/transaction.service';
import { Customer } from './../models/customer.model';
import { Transaction } from './../models/transaction.model';
import { CalendarBody } from '../models/calender-body.model';

@Component({
    selector: 'app-shipping',
    templateUrl: './shipping.component.html',
    styleUrls: ['./shipping.component.scss']
})

export class ShippingComponent implements OnInit, OnDestroy {
    items: RoomTypeDTO[];
    checkin: string;
    checkout: string;
    total: number;
    customerForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private transactionService: TransactionService,
        private calendarService: CalendarService
    ) { }

    ngOnInit() {
        this.customerForm = this.fb.group({
            'name': new FormControl('', Validators.required),
            'cmnd': new FormControl('', Validators.required),
            'email': new FormControl('', Validators.required),
            'phone': new FormControl('', Validators.required),
            'notes': new FormControl()
        });

        const check = !localStorage.getItem(Constant.CHECK_IN)
            || !localStorage.getItem(Constant.CHECK_OUT)
            || !localStorage.getItem(Constant.ITEMS);
        if (check) {
            this.router.navigate(['/home']);
        } else {
            this.items = JSON.parse(localStorage.getItem(Constant.ITEMS));
            this.total = JSON.parse(localStorage.getItem(Constant.TOTAL));
            this.checkin = localStorage.getItem(Constant.CHECK_IN);
            this.checkout = localStorage.getItem(Constant.CHECK_OUT);
            this.items = this.items.filter(item => item.NumberOfBooked > 0);
        }
    }

    private clearSession(): void {
        localStorage.removeItem(Constant.CHECK_IN);
        localStorage.removeItem(Constant.CHECK_OUT);
        localStorage.removeItem(Constant.ITEMS);
        localStorage.removeItem(Constant.TOTAL);
    }

    ngOnDestroy(): void {
        this.clearSession();
    }

    saveCustomerInfoToDb(customer) {
        const customerObj = new Customer(customer.name, customer.cmnd, customer.email, customer.phone);
        const transaction = new Transaction(
            JSON.stringify(new Date()),
            this.checkin,
            this.checkout,
            customerObj,
            this.items,
            this.total,
            'Success',
            customer.notes
        )
        this.transactionService.add(transaction).subscribe(data => {
            if (data) {
                this.items.forEach(element => {
                    for (let index = 0; index < element.NumberOfBooked; index++) {
                        const calendarBody = new CalendarBody(element.Name, this.checkin, this.checkout, transaction.TransactionId);
                        this.calendarService.add(calendarBody).subscribe(res => {
                            if (res !== 'Added successful') {
                                console.log('error');
                            }
                        });
                    }
                });
                this.router.navigate(['/booking-success']);
            }
        });
    }
}
