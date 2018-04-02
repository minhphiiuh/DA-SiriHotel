/**
 * Author PhiNguyen
 * Create Date:  17/3/2018
 * Update Date:  17/3/2018
 */

// Dependenci
const express = require('express');
const router = express.Router();
const roomTypeDao = require('../dao/roomType.dao');

/**
 * @description get all roomType
 * @author PhiNguyen
 */
router.get('/', (req, res) => {
    roomTypeDao.FindAll(function (err, data) {
        res.json(data);
    })
});

/**
 * @description get roomType infomation
 * @author PhiNguyen
 * @param roomType
 */
router.get('/:roomType', (req, res) => {
    roomTypeDao.FindRoomTypeByName(req.params.roomType, (err, data) => {
        res.json(data);
    })
});
/**
 * @description Add new RoomType
 * @author PhiNguyen
 */
router.post('/', (req, res) => {
    roomTypeDao.Add(req.body, (err, data) => {
        if (err) {
            res.sendStatus(500);
        }
        res.sendStatus(200);
    });
});
/**
 * @description Update RoomType infomation
 * @author PhiNguyen
 */
router.put('/', (req, res) => {
    roomTypeDao.Update(req.body, (err, data) => {
        if (err) {
            res.sendStatus(500);
        }
        res.sendStatus(200);
    });
});

/**
 * @description Delete RoomType
 */
router.delete('/:roomType', (req, res) => {
    roomTypeDao.FindRoomTypeByName(req.params.roomType, (err, data) => {
        if (err) {
            // res.sendStatus(500);
            res.send(err);
        } else {
            // res.send(data);
            data.Items.forEach(function (item) {
                roomTypeDao.Remove(item, (err, data) => {
                    if (err) {
                        res.send(err);
                    }
                    res.send("Deleted");
                });
            });
        }
    });
});
module.exports = router; 