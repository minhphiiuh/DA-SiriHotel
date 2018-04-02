/**
 * Author: Phi Nguyen
 * Create date: 19/03/2018
 * Update date: 19/03/2018
 */
// Dependenci
const aws = require("aws-sdk");
const constant = require('../share/constant');
aws.config.loadFromPath('./aws_config.json');
// Variable
const transaction = constant.Table.Transaction;
const tableName = transaction.TableName;
const partitionKey = transaction.PartitionKey;
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
 * @param {*} id 
 * @param {*} callBack 
 */
exports.FindByRoomType = (id, callBack) => {
    var params = {
        TableName: tableName,
        KeyConditionExpression: "#id = :value",
        ExpressionAttributeNames: {
            "#id": "TransactionId"
        },
        ExpressionAttributeValues: {
            ":value": id
        }
    };
    docClient.query(params, function (err, data) {
        callBack(err, data);
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

/**
 * @description Remove transaction
 * @author PhiNguyen
 */
exports.Remove = function (id, callBack) {
    var params = {
        TableName: tableName,
        Key: {
            "TransactionId": id
        }        
    };
    docClient.delete(params, function (err, data) {
        callBack(err, data);
    });
}