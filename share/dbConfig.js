/**
 * Author: Phi Nguyen
 * Create date: 04/03/2018
 */

module.exports = {
    AwsConfig: {
        accessKeyId: "YOURKEY", //Insert your key
        secretAccessKey: "YOURSECRET",
        region: "us-east-2",
        endpoint: "http://localhost:8000" //Delete when deploy
    },
    NumberTable: 2,
    Tables: {
        Room: {
            TableName: "Room",
            KeySchema: [
                { AttributeName: "RoomType", KeyType: "HASH" },  //Partition key
                { AttributeName: "RoomID", KeyType: "RANGE" }  //Sort key
            ],
            AttributeDefinitions: [
                { AttributeName: "RoomType", AttributeType: "S" },
                { AttributeName: "RoomID", AttributeType: "S" }
            ],
            ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5
            }
        },
        RoomType: {
            TableName: "RoomType",
            KeySchema: [
                { AttributeName: "RoomType", KeyType: "HASH" },  //Partition key
            ],
            AttributeDefinitions: [
                { AttributeName: "RoomType", AttributeType: "S" },
            ],
            ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5
            }
        },
        Transaction: {
            TableName: "Transaction",
            KeySchema: [
                { AttributeName: "RoomType", KeyType: "HASH" },  //Partition key
                { AttributeName: "TransactionId", KeyType: "RANGE" }  //Sort key
            ],
            AttributeDefinitions: [
                { AttributeName: "RoomType", AttributeType: "S" },
                { AttributeName: "TransactionId", AttributeType: "S" }
            ],
            ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5
            }
        }
    }
}
