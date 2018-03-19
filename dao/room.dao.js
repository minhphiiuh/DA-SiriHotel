/**
 * Author: Phi Nguyen
 * Create date: 04/03/2018
 * Update date: 11/03/2018
 */

// Dependenci
const aws = require("aws-sdk");
const config = require('../config/dbConfig');

// Variable
const awscongif = config.AwsConfig;
const docClient = new AWS.DynamoDB.DocumentClient();
const tableName = config.Tables.Room.TableName; // "Room"
const partitionKey = "RoomType";
const sortKey = "RoomID";

/**
 * @description Get all room
 * @author PhiNguyen
 * @returns ListRoom/ Callback (err, data)
 */
exports.FindAll = function (callBack) {
    var params = {
        TableName: tableName
    };
    docClient.scan(params, (err, data) => {
        callBack(err, data);
    });
};
/**
 * @description Get List room by roomType
 * @author PhiNguyen
 * @param {*}  roomType
 * @returns ListRoomByType/ Callback(err, data)
 */
exports.FindRoomByRoomType = function (roomType, callBack) {
    var params = {
        TableName: tableName,
        KeyConditionExpression: "#type = :value",
        ExpressionAttributeNames: {
            "#type": "RoomType"
        },
        ExpressionAttributeValues: {
            ":value": roomType
        }
    };
    docClient.query(params, function (err, data) {
        callBack(err, data);
    });
};

/**
 * @description Create new room and save to database
 * @param {Room} room 
 * @returns callback(err, data)
 * @description HashKey: RoomType, SortKey: RoomId
 * @author PhiNguyen
 */
exports.Add = function (room, callBack) {
    var params = {
        TableName: tableName,
        Item: room
    };
    docClient.put(params, function (err, data) {
        callBack(err, data);
    });
}

/**
 * @description Update room and save to database
 * @param {Room} room 
 * @returns callback(err, data)
 * @description HashKey: RoomType, SortKey: RoomId
 * @author PhiNguyen
 */
exports.Update = function (room, callBack) {
    var params = {
        TableName: tableName,
        Key: {
            partitionKey: room.RoomType,
            sortKey: room.RoomID
        },
        UpdateExpression: "set Info =: i",
        ExpressionAttributeValues: {
            ":i": room.Info
        },
        ReturnValues: "UPDATED_NEW"
    }
    docClient.update(params, function (err, data) {
        callBack(err, data);
    });
};
/**
 * @description Remove room
 */
exports.Remove = function () {

};