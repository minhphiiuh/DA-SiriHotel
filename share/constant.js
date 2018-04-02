/**
 * Author: Phi Nguyen
 * Create date: 18/03/2018
 */

module.exports = {
    Table: {
        RoomType: {
            TableName: "RoomType",
            PartitionKey: "Name"
        },
        Transaction: {
            TableName: "Transaction",
            PartitionKey: "TransactionId"
        }
    }
}
