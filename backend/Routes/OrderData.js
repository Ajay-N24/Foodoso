const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Order = require("../models/Orders");
router.post("/orderData", async (req, res) => {
  let data = req.body.order_data;
  await data.splice(0, 0, { order_date: req.body.order_date });
  const eid = await Order.findOne({ email: req.body.email });
  if (eid === null) {
    try {
      await Order.create({
        email: req.body.email,
        order_data: [data],
      })
        .then(() => {
          res.json({
            success: true,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error.message);
    }
  } else {
    try {
      await Order.findOneAndUpdate(
        { email: req.body.email },
        {
          $push: {
            order_data: data,
          },
        }
      )
        .then((result) => {
          res.json({
            success: false,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error.message);
    }
  }
});
module.exports = router;
