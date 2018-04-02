import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { CalendarBody } from './../models/calender-body.model';
import { Observable } from 'rxjs/Observable';
import { Constant } from './../shared/constant';


@Injectable()
export class CalendarService {

    private url = Constant.CALENDAR_API;

    constructor(private http: Http) { }

    get(checkin, checkout, roomtype): Observable<any> {
        const body = {
            RoomType: roomtype,
            CheckIn: checkin,
            CheckOut: checkout
        }
        return this.http.post(this.url, body)
            .map(res => res.json());
    }

    add(body: CalendarBody): Observable<any> {
        return this.http.put(this.url, body)
            .map(res => res.json());
    }


}
