const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieParser=require("cookie-parser")
const { errorHandler } = require("./middleware/errorhandler.middleware");
const { connect } = require("./Configs/db");
const { productRouter } = require("./Routes/product.routes");
const { userRouter } = require("./Routes/users.routes");

const port = process.env.PORT || 8080;

const app = express();

//use external middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());


//use all routes here
app.use("/api/v1/product", productRouter);
app.use("/api/v1/user", userRouter);

app.listen(port, async () => {
  try {
    await connect;
    console.log("connected to db");
  } catch (error) {
    console.log(`error while connecting to db error: ${error}`);
  }
  console.log(`server is running on port ${port}`);
});

//Error handler for express
app.use(errorHandler);
