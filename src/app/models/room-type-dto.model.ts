export class RoomTypeDTO {
    Name: string;
    Quanlity: number;
    Price: number;
    Preview: string;
    NumberOfRoomAvailble: number;
    NumberOfBooked: number;

    constructor(name, quanlity, price, preview, numberOfRoomAvailble, numberOfBooked) {
        this.Name = name;
        this.Quanlity = quanlity;
        this.Price = price;
        this.Preview = preview;
        this.NumberOfRoomAvailble = numberOfRoomAvailble;
        this.NumberOfBooked = numberOfBooked;
    }
}
