/**
 * Author: Phi Nguyen
 * Create date: 04/03/2018
 */

// Library
var AWS = require("aws-sdk");
const service = require('../services/tableService');
const config = require('./dbConfig');
// Variable
const awsconfig = config.AwsConfig;
const room = config.Tables.Room;
const roomType = config.Tables.RoomType;

AWS.config.update(awsconfig);
/**
 * Set up database
 * Create nessesary table
 */
exports.setupDb = () => {
    /**
     * Create Room table
     */
    service.isExistTable(awsconfig, room.TableName, (isExist) => {
        if (isExist === true) {
            // console.log("Table is exist:" + room.TableName);
            return;
        } else {
            if (isExist === false) {
                // Create process
                service.createTable(awsconfig, room, (error, data) => {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log(data);
                    }
                });
            } else {
                console.log("Error: " + data);
            }
        }
    });
    /**
     * Create RoomType table
     */
    service.isExistTable(awsconfig, roomType.TableName, (isExist) => {
        if (isExist === true) {
            // console.log("Table is exist:" + roomType.TableName);
            return;
        } else {
            if (isExist === false) {
                // Create process
                service.createTable(awsconfig, roomType.TableName, (error, data) => {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log(data);
                    }
                });
            } else {
                console.log("Error: " + data);
            }
        }
    });
}

exports.listTable = () => {
    var dynamodb = new AWS.DynamoDB();

    // Call DynamoDB to retrieve the list of tables
    dynamodb.listTables({ Limit: 10 }, function (err, data) {
        if (err) {
            console.log("Error", err.code);
        } else {
            console.log("Table names are ", data.TableNames);
        }
    });
}