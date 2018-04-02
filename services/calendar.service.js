/**
 * @author BinhTran
 */

var express = require('express');
var router = express.Router();
var fs = require('fs');
var readline = require('readline');
var { google } = require('googleapis');
var OAuth2 = google.auth.OAuth2;
var moment = require('moment');
var SCOPES = [
    'https://www.googleapis.com/auth/calendar'
];
var TOKEN_DIR = './.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'calendar-nodejs-quickstarts.json';

// exports.getTransactionByCheckinCheckOut = function (check_in, check_out, roomType, callBack) {
//     fs.readFile('./client_secret.json', function processClientSecrets(err, content) {
//         if (err) {
//             callBack(err, { "count": 0 });
//         }
//         authorize(JSON.parse(content), listEvents, check_in, check_out, roomType);
//     });
//     function listEvents(OAuth2, check_in, check_out, roomType) {
//         // Num room type
//         var numRoomType = 0;
//         var calendar = google.calendar('v3');
//         calendar.events.list({
//             auth: OAuth2,
//             calendarId: 'primary',
//             timeMin: (new Date()).toISOString(),
//             maxResults: 100,
//             timeZone: "GMT+7",
//             singleEvents: true,
//             orderBy: 'startTime'
//         }, function (err, response) {
//             if (err) {
//                 callBack(err, { "count": 0 })
//             }
//             var events = response.data.items;

//             for (var i = 0; i < events.length; i++) {
//                 var event = events[i];
//                 var start = event.start.dateTime || event.start.date;
//                 var end = event.end.dateTime || event.end.date;
//                 var strRoomType = event.summary.split("-");
//                 if (strRoomType[0] === roomType) {
//                     // check checkin
//                     if (moment(check_in).isBetween(start, end, null, '[]')) {
//                         numRoomType++;
//                         continue;
//                     }
//                     // check checkout
//                     else if (moment(check_out).isBetween(start, end, null, '[]')) {
//                         numRoomType++;
//                         continue;
//                     }
//                     // check checkin and checkout
//                     else if (moment(check_in).isSameOrBefore(start) && moment(check_out).isSameOrAfter(end)) {
//                         numRoomType++;
//                         continue;
//                     }
//                 }
//             }
//             callBack(err, { "count": numRoomType });
//         });
//     }
// };

exports.getTransactionByCheckinCheckOut = function (check_in, check_out, roomType, callBack) {
    fs.readFile('client_secret.json', function processClientSecrets(err, content) {
        if (err) {
            callBack(err, { "count": 0 });
        }
        authorize(JSON.parse(content), listEvents, check_in, check_out, roomType);
    });

    function listEvents(OAuth2, check_in, check_out, roomType) {
        // Num room type
        var numRoomType = 0;
        var calendar = google.calendar('v3');
        calendar.events.list({
            auth: OAuth2,
            calendarId: 'primary',
            timeMin: (new Date()).toISOString(),
            maxResults: 100,
            timeZone: "GMT+7",
            singleEvents: true,
            orderBy: 'startTime'
        }, function (err, response) {
            if (err) {
                callBack(err, { "count": 0 });
            }
            var events = response.data.items;

            for (var i = 0; i < events.length; i++) {
                var event = events[i];
                var start = event.start.dateTime || event.start.date;
                var end = event.end.dateTime || event.end.date;
                start = start.split('T');
                end = end.split('T');

                if (event.summary === roomType) {
                    if (moment(check_in).isBetween(start[0], end[0], null, '[]')) {
                        numRoomType++;
                        continue;
                    }
                    else if (moment(check_out).isBetween(start[0], end[0], null, '[]')) {
                        numRoomType++;
                        continue;
                    }
                    else if (moment(check_in).isSameOrBefore(start[0]) && moment(check_out).isSameOrAfter(end[0])) {
                        numRoomType++;
                        continue;
                    }
                }
            }

            callBack(err, { "count": numRoomType });
        });
    }
};

exports.addTransactionCalendar = function (transaction, callBack) {
    const check_in = transaction.CheckIn;
    const check_out = transaction.CheckOut;
    const roomType = transaction.RoomType;
    const transactionID = transaction.TransactionId;

    fs.readFile('./client_secret.json', function processClientSecrets(err, content) {
        if (err) {
            console.log('Error loading client secret file: ' + err);
            return;
        }
        authorize(JSON.parse(content), addEvents, check_in, check_out, roomType);
    });

    // // add new event
    function addEvents(OAuth2, check_in, check_out, roomType, transactionID){
        check_in += "T08:00:00Z";
        check_out += "T08:00:00Z";
        var calendar = google.calendar('v3');
        calendar.events.insert({
            auth: OAuth2,
            calendarId: 'primary',
            resource: {
                summary: roomType,
                description: 'Book Room',
                id: transactionID,
                start: {
                    dateTime: check_in
                },
                end: {
                    dateTime: check_out
                }
            },
        }, function(err, res) {
            if (err) {
                console.log('The API add events returned an error: ' + err);
                return;
            }
            callBack(err, 'Added successful');
        });
    }
};

// delete event
exports.deleteEvent = function (check_in, check_out, roomType, transactionID, callBack) {
    fs.readFile('client_secret.json', function processClientSecrets(err, content) {
        if (err) {
            callBack(err, {});
        }
        authorize(JSON.parse(content), deleteEvents, check_in, check_out, roomType);
    });
 
    // // delete event
    function deleteEvents(OAuth2, check_in, check_out, roomType, transactionID){
        var calendar = google.calendar('v3');
        var params = {
            auth: OAuth2,
            calendarId: 'primary',
            eventId: transactionID
        };
 
        calendar.events.delete(params, function(err) {
            if (err) {
                callback(err, {})
                return;
            }
            callBack(err, 'Event deleted.');
        });
    }
 };

function authorize(credentials, callback, check_in, check_out, roomType) {
    var clientSecret = credentials.installed.client_secret;
    var clientId = credentials.installed.client_id;
    var redirectUrl = credentials.installed.redirect_uris[0];
    var oauth2Client = new OAuth2(clientId, clientSecret, redirectUrl);

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, function (err, token) {
        if (err) {
            getNewToken(oauth2Client, callback, check_in, check_out, roomType);
        } else {
            oauth2Client.credentials = JSON.parse(token);
            callback(oauth2Client, check_in, check_out, roomType);
        }
    });
}

function getNewToken(oauth2Client, callback, check_in, check_out, roomType) {
    var authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES
    });
    console.log('Authorize this app by visiting this url: ', authUrl);
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.question('Enter the code from that page here: ', function (code) {
        rl.close();
        oauth2Client.getToken(code, function (err, token) {
            if (err) {
                console.log('Error while trying to retrieve access token', err);
                return;
            }
            oauth2Client.credentials = token;
            storeToken(token);
            callback(oauth2Client, check_in, check_out, roomType);
        });
    });
}

function storeToken(token) {
    try {
        fs.mkdirSync(TOKEN_DIR);
    } catch (err) {
        if (err.code != 'EEXIST') {
            throw err;
        }
    }
    fs.writeFile(TOKEN_PATH, JSON.stringify(token));
    console.log('Token stored to ' + TOKEN_PATH);
}