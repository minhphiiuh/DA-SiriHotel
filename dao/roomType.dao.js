/**
 * Author: Phi Nguyen
 * Create date: 17/03/2018
 * Update date: 19/03/2018
 */
// Dependenci
const aws = require("aws-sdk");
const constant = require('../share/constant');
aws.config.loadFromPath('./aws_config.json');
// Variable
const roomType = constant.Table.RoomType;
const tableName = roomType.TableName;
const partitionKey = roomType.PartitionKey;
const docClient = new aws.DynamoDB.DocumentClient();
/**
 * @description Get list room type
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
 * @description Get roomtype infomation
 * @author PhiNguyen
 * @param {*}  roomType
 */
exports.FindRoomTypeByName = function (roomType, callBack) {
    var params = {
        TableName: tableName,
        KeyConditionExpression: "#type = :value",
        ExpressionAttributeNames: {
            "#type": "Name"
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
 * @param {RoomType} roomType 
 * @returns callback(err, data)
 * @description HashKey: RoomType
 * @author PhiNguyen
 */
exports.Add = function (roomType, callBack) {
    var params = {
        TableName: tableName,
        Item: roomType
    };
    docClient.put(params, function (err, data) {
        callBack(err, data);
    });
}

/**
 * @description Update room and save to database
 * @param {RoomType} roomType 
 * @returns callback(err, data)
 * @description HashKey: RoomType
 * @author PhiNguyen
 */
exports.Update = function (roomType, callBack) {
    var params = {
        TableName: tableName,
        Key: {
            // partitionKey: roomType.RoomType
            "Name": roomType.Name
        },
        UpdateExpression: "set Info = :i",
        ExpressionAttributeValues: {
            ":i": roomType.Info
        },
        ReturnValues: "UPDATED_NEW"
    }
    docClient.update(params, function (err, data) {
        callBack(err, data);
    });
};
/**
 * @description Remove roomType
 * @author PhiNguyen
 */
exports.Remove = function (roomType, callBack) {
    var params = {
        TableName: tableName,
        Key: {
            // partitionKey: roomType.RoomType
            "Name": roomType.Name
        }        
        // ConditionExpression: "RoomType = :val",
        // ExpressionAttributeValues: {
        //     ":val": roomType.RoomType
        // }
    };
    docClient.delete(params, function (err, data) {
        callBack(err, data);
    });
}