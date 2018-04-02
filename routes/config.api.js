// Get dependencies
const express = require('express');
// Get our API routes
const roomTypeApi = require('./roomType.api');
const transactionApi = require('./transaction.api');
const calendarApi = require('./calendar.api');

const app = express();
const router = express.Router();

router.get('/', (req, res) => {
    res.send("RESTFUL API in localhost:3000/api");
});
router.use('/roomType', roomTypeApi);
router.use('/transaction', transactionApi);
router.use('/calendar', calendarApi);


module.exports = router;


