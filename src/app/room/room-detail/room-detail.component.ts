import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomType } from './../../models/room-type.model';
import { RoomTypeService } from './../../services/roomType.service';

@Component({
    selector: 'app-room-detail',
    templateUrl: './room-detail.component.html',
    styleUrls: ['./room-detail.component.scss']
})

export class RoomDetailComponent implements OnInit {
    roomType: RoomType ;
    name = '';
    images: string[] = [];
    loading = false;
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private roomTypeService: RoomTypeService
    ) { }

    ngOnInit() {
        this.loading = true;
        this.route.params.subscribe(params => {
            this.name = params['type'];
        });
        this.roomTypeService.get(this.name).subscribe(data => {
            this.images = data.Items[0].Infomation.Images;
            this.roomType = new RoomType(
                this.name,
                data.Items[0].Quanlity,
                data.Items[0].Price,
                data.Items[0].Infomation.Description,
                data.Items[0].Infomation.RoomSize,
                data.Items[0].Infomation.Preview,
                data.Items[0].Infomation.Images);
            this.loading = false;
        });
    }
}
