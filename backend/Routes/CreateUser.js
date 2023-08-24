const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const secretKey = "HelloMERNSTACKPracticeMakesManPerfectJustPractice#!!!$$";
router.post(
  "/createuser",
  [
    body("email", "invalid Email").isEmail(),
    body("password", "Password should be at least 5 Characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    const { name, email, password, location } = req.body;
    const salt = await bcryptjs.genSalt(10);
    const secPassword = await bcryptjs.hash(req.body.password, salt);
    try {
      await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPassword,
        location: req.body.location,
      });
      res.json({
        success: true,
      });
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
      });
    }
  }
);
router.post(
  "/login",
  [
    body("email", "invalid Email").isEmail(),
    body("password", "Password should be at least 5 Characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const { email, password } = req.body;
    try {
      let userData = await User.findOne({
        email,
      });
      if (!userData) {
        return res.status(400).json({
          errors: "Enter Valid Credentials!",
        });
      }
      const passCompare = bcryptjs.compare(password, userData.password);
      if (!passCompare) {
        return res.status(400).json({
          errors: "Enter Valid Credentials!",
        });
      }
      const data = {
        user: {
          id: userData.id,
        },
      };
      const authToken = jwt.sign(data, secretKey);
      return res.json({
        success: true,
        authToken,
      });
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
      });
    }
  }
);
module.exports = router;
