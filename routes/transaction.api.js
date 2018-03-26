/**
 * Author PhiNguyen
 * Create Date:  20/3/2018
 * Update Date:  20/3/2018
 */

 // Dependenci
 const express = require('express');
 const router = express.Router();
 const transactionDao = require('../dao/transaction.dao');
 
 /**
  * @description get all transaction
  * @author PhiNguyen
  */
 router.get('/', (req, res) => {
    transactionDao.FindAll(function (err, data) {
         res.json(data);
     })
 });
 
 /**
  * @description get all transaction by roomType
  * @author PhiNguyen
  * @param roomType
  */
 router.get('/:roomType', (req, res) => {
    transactionDao.FindByRoomType(req.params.roomType, (err, data) => {
         res.send(data);
     })
 });
  /**
  * @description
  * @author PhiNguyen
  * @param roomType
  */
 router.get('/:roomType/:checkIn/:checkOut', (req, res) => {
    var type = req.params.roomType;
    var checkIn = req.params.checkIn;
    var checkOut = req.params.checkOut;
    console.log(req.params);
    transactionDao.FindByCheckInToCheckOutForPerRoomType(type, checkIn, checkOut, (err, data) => {
        console.log(err);
         res.send(data);
     })
 });
 /**
  * @description Add new transaction
  * @author PhiNguyen
  */
 router.post('/', (req, res) => {
    transactionDao.Add(req.body, (err, data) => {
         if (err){
             res.send("Bad request");
         }
         res.send("OK");
     });
 });
 /**
  * @description Update transaction infomation
  * @author PhiNguyen
  */
 router.put('/', (req, res) => {
    transactionDao.Update(req.body, (err, data) => {
         if (err){
             res.sendStatus(500);
         }
         res.json(data);
     });
 });
 module.exports = router; 