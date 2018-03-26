var AWS = require("aws-sdk");
const config = require('./dbConfig');
// Variable
const awsconfig = config.AwsConfig;

AWS.config.update(awsconfig);

var dynamodb = new AWS.DynamoDB();

// dynamodb.createTable(config.Tables.RoomType, function(err, data) {
//     if (err) {
//         console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
//     } else {
//         console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
//     }
// });

dynamodb.createTable(config.Tables.Transaction, function(err, data) {
    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});

