export class RoomType {
    Name: string;
    Quanlity: number;
    Price: number;
    Description: string;
    RoomSize: number;
    Preview: string;
    Images: string[];

    constructor(name, quanlity, price, description, roomSize, preview, images) {
        this.Name = name;
        this.Quanlity = quanlity;
        this.Price = price;
        this.Description = description;
        this.RoomSize = roomSize;
        this.Preview = preview;
        this.Images = images;
    }
}
