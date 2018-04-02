import { Component, OnInit, OnDestroy } from '@angular/core';

import { RoomTypeService } from '../services/roomType.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CalendarService } from './../services/calendar.service';
import { RoomTypeDTO } from './../models/room-type-dto.model';
import { Constant } from './../shared/constant';

@Component({
    selector: 'app-search-result',
    templateUrl: './search-result.component.html',
    styleUrls: ['./search-result.component.css']
})

export class SearchResultComponent implements OnInit {
    roomTypes: Array<RoomTypeDTO> = new Array<RoomTypeDTO>();
    loading = false;
    checkin: string;
    checkout: string;
    total = 0;

    constructor(
        private roomTypeService: RoomTypeService,
        private router: Router,
        private route: ActivatedRoute,
        private calendarService: CalendarService
    ) { }

    ngOnInit() {
        this.roomTypes = new Array<RoomTypeDTO>()
        this.route.queryParams.subscribe(params => {
            this.loading = true;
            const checkin = params['checkin'];
            const checkout = params['checkout'];
            this.roomTypeService.getAll()
                .subscribe(data => {
                    data.Items.forEach(e => {
                        this.calendarService.get(checkin, checkout, e.Name)
                            .subscribe(res => {
                                if (e.Quanlity - res.count !== 0) {
                                    this.roomTypes.push(new RoomTypeDTO(
                                        e.Name,
                                        e.Quanlity,
                                        e.Price,
                                        e.Infomation.Preview,
                                        e.Quanlity - res.count,
                                        0
                                    ));
                                }
                            })
                        this.loading = false;
                    });
                });
        });
    }

    changeTotal(event) {
        this.total = 0;
        this.roomTypes.forEach(element => {
            this.total += element.NumberOfBooked * element.Price;
        });
    }

    book() {
        localStorage.setItem(Constant.ITEMS, JSON.stringify(this.roomTypes));
        localStorage.setItem(Constant.TOTAL, this.total.toString());
        this.router.navigate(['/shipping']);
    }
}
