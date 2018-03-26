/**
 * Author: Phi Nguyen
 * Create date: 18/03/2018
 */

module.exports = {
    Table: {
        RoomType: {
            TableName: "RoomType",
            PartitionKey: "RoomType"
        },
        Transaction: {
            TableName: "Transaction",
            PartitionKey: "RoomType",
            SortKey: "TransactionId"
        }
    }
}
