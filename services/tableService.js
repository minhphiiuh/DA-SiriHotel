var aws = require("aws-sdk");


/**
 * Create table
 * @param config : aws config {region,endpoint,accessKeyId,secretAccessKey}
 * @param params : table params
 * @param callback : create table result
 */
exports.createTable = function (config, params, callBack) {
    aws.config.update(config);
    var dynamoDB = new aws.DynamoDB();
    dynamoDB.createTable(params,(err,data) => {
        callBack(err, data);
    });
};

/**
 * Check a table is exist or not
 * @param config : aws config {region,endpoint,accessKeyId,secretAccessKey}
 * @param tableName : Name of table need to check
 * @param callback : error if config error, true if existed and fail if not exist
 */
exports.isExistTable = function (config, tableName, callBack) {
    aws.config.update(config);
    var dynamoDB = new aws.DynamoDB();
    dynamoDB.listTables({}, function (error, data) {
        if (error) {
            //error
            callBack(err);
        } else {
            //get data
            var check = false;
            data.TableNames.forEach(function (name) {
                if(tableName === name){
                    check = true;
                }
            });
            callBack(check);
        }
    });
};