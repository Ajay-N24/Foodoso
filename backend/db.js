const mongoose = require("mongoose"); // importing
const MongoURI =
  "mongodb+srv://ajayprmk:ZD4iMKC9_jzr8JN@foodoso.x18x9fm.mongodb.net/Foodoso?retryWrites=true&w=majority"; // Uri to which mongoose should be connected
const mongodb = async () => {
  await mongoose
    .connect(MongoURI)
    .then(async () => {
      console.log("Connected to mongodb");
      const fetchData = await mongoose.connection.db.collection("food_items");
      fetchData
        .find({})
        .toArray()
        .then(async (data) => {
          const foodCategory = await mongoose.connection.db.collection(
            "food_category"
          );
          foodCategory
            .find({})
            .toArray()
            .then((category_data) => {
              global.foodData = data;
              global.category_data = category_data;
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
}; // connecting to the database.
module.exports = mongodb; // exporting
