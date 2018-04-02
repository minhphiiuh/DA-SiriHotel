/**
 * @author PhiNguyen
 */

// Dependenci
const express = require('express');
const router = express.Router();
const service = require('../services/calendar.service');


/**
 * @description get roomType infomation
 * @author PhiNguyen
 * @param roomType
 */
router.post('/', (req, res) => {
    const body = req.body;
    service.getTransactionByCheckinCheckOut(body.CheckIn, body.CheckOut, body.RoomType, (err, data) => {
        res.send(data);
    })
});
/**
 * @description Add new RoomType
 * @author PhiNguyen
 */
router.put('/', (req, res) => {
    service.addTransactionCalendar(req.body, (err, data) => {
        if (err) {
            res.sendStatus(500);
        }
        res.json(data);
    });
});

module.exports = router; 