import { Customer } from './customer.model';
import { RoomType } from './room-type.model';
import { RoomTypeDTO } from './room-type-dto.model';

export class Transaction {
    TransactionId: string;
    CheckIn: string;
    CheckOut: string;
    Customer: Customer;
    Notes: string;
    Status: string;
    Total: number;
    CreateDate: Date;
    Items: RoomTypeDTO[];

    constructor(id, checkIn, checkOut, customer, items, total, status, notes) {
        this.TransactionId = id;
        this.CheckIn = checkIn;
        this.CheckOut = checkOut;
        this.Customer = customer;
        this.Total = total;
        this.CreateDate = new Date();
        this.Items = items;
        this.Status = status;
        this.Notes = notes;
    }
}
