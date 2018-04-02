import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Constant } from './../shared/constant';


@Injectable()
export class RoomTypeService {

  private url = Constant.ROOM_TYPE_API;

  constructor(private http: Http) { }

  getAll() {
    return this.http.get(this.url)
      .map(res => res.json());
  }

  get(name: string) {
    return this.http.get(this.url + '/' + name)
      .map(res => res.json());
  }

//   add(book: Book) {
//     return this.http.post(this.url, book)
//       .map(res => res.json());
//   }

//   update(book: Book) {
//     return this.http.put(this.url, book)
//       .map(res => res.json());
//   }

//   delete(id: number) {
//     return this.http.delete(this.getUrl(id))
//       .map(res => res.json());
//   }

}
