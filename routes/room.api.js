/**
 * Author
 * Create Date:  11/3/2018
 * Update Date:  11/3/2018
 */

 // Dependenci
const express = require('express');
const router = express.Router();
const roomDao = require('../dao/room.dao');

/**
 * @description get all room
 * @author PhiNguyen
 */
router.get('/', (req, res) => {
    roomDao.FindAll(function (err, data) {
        res.send(JSON.stringify(data));
    })
});

/**
 * @description get list room by roomType
 * @author PhiNguyen
 * @param roomType
 */
router.get('/:roomType', (req, res) => {
    roomDao.FindRoomByRoomType(req.params.roomType, (err, data) => {
        res.send(data);
    })
});
/**
 * @description Add new Room
 * @author PhiNguyen
 */
router.post('/', (req, res) => {
    roomDao.Add(req.body, (err, data) => {
        if (err){
            res.sendStatus(404);
        }
        res.sendStatus(200);
    });
});
/**
 * @description Update Room infomation
 * @author PhiNguyen
 */
router.put('/', (req, res) => {
    roomDao.Update(req.body, (err, data) => {
        if (err){
            res.send(err);
        }
        res.json(data);
    });
});
module.exports = router; 