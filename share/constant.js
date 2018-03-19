/**
 * Author: Phi Nguyen
 * Create date: 18/03/2018
 */

module.exports = {
    Table: {
        Room: {
            TableName: "Room",
            PartitionKey: "RoomType",
            SortKey: "RoomId"
        },
        RoomType: {
            TableName: "RoomType",
            PartitionKey: "RoomTypeName"
        }
    }
}
