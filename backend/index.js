const express = require("express");
const app = express();
const port = 5000;
const mongodb = require("./db");
const CreateUser = require("./Routes/CreateUser");
const DisplayData = require("./Routes/DisplayData");
const OrderData = require("./Routes/OrderData");
const MyOrderData = require("./Routes/MyOrderData");
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-type, Accept"
  );
  next();
});
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api", CreateUser);
app.use("/api", DisplayData);
app.use("/api", OrderData);
app.use("/api", MyOrderData);
mongodb();
app.listen(port, () => {
  console.log(`Website running at port ${port}`);
});
