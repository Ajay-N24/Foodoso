const express = require("express");
const router = express.Router();
router.post("/foodData", (req, res) => {
  try {
    console.log(global.foodData);
    res.send([global.foodData, global.category_data]);
  } catch (err) {
    console.log(err.message);
    res.send(err.message);
  }
});
module.exports = router;
