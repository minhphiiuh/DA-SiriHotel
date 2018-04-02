import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Transaction } from './../models/transaction.model';
import { Constant } from '../shared/constant';


@Injectable()
export class TransactionService {

  private url = Constant.TRANSACTION_API;

  constructor(private http: Http) { }

  getAll() {
    return this.http.get(this.url)
      .map(res => res.json());
  }

  get(id: number) {
    return this.http.get(this.getUrl(id))
      .map(res => res.json());
  }

  add(transaction: Transaction) {
    return this.http.post(this.url, transaction)
      .map(res => res.json());
  }

  delete(id: number) {
    return this.http.delete(this.getUrl(id))
      .map(res => res.json());
  }

  private getUrl(id) {
    return this.url + '/' + id;
  }
}
