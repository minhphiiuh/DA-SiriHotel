/**
 * Author
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
         res.send(JSON.stringify(data));
     })
 });
 
 /**
  * @description get list room by roomType
  * @author PhiNguyen
  * @param roomType
  */
 router.get('/:roomType', (req, res) => {
    roomTypeDao.FindRoomByRoomType(req.params.roomType, (err, data) => {
         res.send(data);
     })
 });
 /**
  * @description Add new Room
  * @author PhiNguyen
  */
 router.post('/', (req, res) => {
    roomTypeDao.Add(req.body, (err, data) => {
         if (err){
             res.send("Bad request");
         }
         res.send("OK");
     });
 });
 /**
  * @description Update Room infomation
  * @author PhiNguyen
  */
 router.put('/', (req, res) => {
    roomTypeDao.Update(req.body, (err, data) => {
         if (err){
             res.send(err);
         }
         res.json(data);
     });
 });
 module.exports = router; 