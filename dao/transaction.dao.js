/**
 * Author: Phi Nguyen
 * Create date: 19/03/2018
 * Update date: 19/03/2018
 */
// Dependenci
const aws = require("aws-sdk");
const constant = require('../share/constant');
aws.config.loadFromPath('./config/configAws.json');
// Variable
const transaction = constant.Table.Transaction;
const tableName = transaction.TableName;
const partitionKey = transaction.PartitionKey;
const sortKey = transaction.SortKey;
const docClient = new aws.DynamoDB.DocumentClient();

/**
 * @description Find all transaction
 * @author PhiNguyen
 */
exports.FindAll = (callBack) => {
    var params = {
        TableName: tableName
    };
    docClient.scan(params, (err, data) => {
        callBack(err, data);
    });
}
/**
 * Get list transaction of roomType
 * @param {*} roomType 
 * @param {*} callBack 
 */
exports.FindByRoomType = (roomType, callBack) => {
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
}

/**
 * Return umber of room have reservation from CheckIn to CheckOut
 * @param {*} startDate 
 * @param {*} endDate 
 * @param {*} callBack 
 */
exports.CountReservationByRoomTypeFromCheckInToCheckOut = (roomType, checkIn, checkOut, callBack) => {
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
        if (!err) {
            data.Items.forEach(item => {
                //conditions
            });
        }
    });
}

/**
 * @description Create new transaction and save to database
 * @author PhiNguyen
 */
exports.Add = function (transaction, callBack) {
    var params = {
        TableName: tableName,
        Item: transaction
    };
    docClient.put(params, function (err, data) {
        console.log(err);
        callBack(err, data);
    });
}

/**
 * @description Update transaction and save to database
 * @author PhiNguyen
 */
exports.Update = function (transaction, callBack) {
    var params = {
        TableName: tableName,
        Key: {
            "RoomType": transaction.RoomType,
            "TransactionId": transaction.TransactionId
        },
        UpdateExpression: "set Info = :i",
        ExpressionAttributeValues: {
            ":i": transaction.Info
        },
        ReturnValues: "UPDATED_NEW"
    }
    docClient.update(params, function (err, data) {
        callBack(err, data);
    });
};