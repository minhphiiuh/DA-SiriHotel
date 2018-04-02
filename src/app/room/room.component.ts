import { Component, OnInit, OnDestroy } from '@angular/core';

import { RoomTypeService } from '../services/roomType.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CalendarService } from './../services/calendar.service';
import { RoomTypeDTO } from './../models/room-type-dto.model';
import { Constant } from './../shared/constant';

@Component({
    selector: 'app-room',
    templateUrl: './room.component.html',
    styleUrls: ['./room.component.css']
})

export class RoomComponent implements OnInit {
    roomTypes: Array<RoomTypeDTO> = new Array<RoomTypeDTO>();
    loading = false;

    constructor(
        private roomTypeService: RoomTypeService,
        private router: Router,
        private route: ActivatedRoute,
        private calendarService: CalendarService
    ) { }

    ngOnInit() {
        this.loading = true;
        this.roomTypes = new Array<RoomTypeDTO>()
        this.roomTypeService.getAll()
            .subscribe(data => {
                data.Items.forEach(e => {
                    this.roomTypes.push(new RoomTypeDTO(
                        e.Name,
                        e.Quanlity,
                        e.Price,
                        e.Infomation.Preview,
                        e.Quanlity,
                        0
                    ));
                });
                this.loading = false;
            });

    }
}
