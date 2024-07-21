import mongoose from "mongoose";

mongoose
  .connect("mongodb://127.0.0.1:27017/Assignment9")
  .then(() => console.log("Database is connected successfully"))
  .catch((err) => console.log(err));
