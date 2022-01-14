const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./../../config.env" });

const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);
console.log(DB);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successful!"));
