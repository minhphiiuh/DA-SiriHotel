export class CalendarBody {
    RoomType: string;
    CheckIn: string;
    CheckOut: string;
    TransactionId: string;

    constructor(roomType, checkin, checkout, transactionid) {
        this.RoomType = roomType;
        this.CheckIn = checkin;
        this.CheckOut = checkout;
        this.TransactionId = transactionid;
    }
}
