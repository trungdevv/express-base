import express from "express";
import helmet from "helmet";
import { userRouter } from "./routes/index.js";
import connect from "./database/database.js";
import createError from "http-errors";
import checkToken from "./authentication/auth.js";
const app = express();
import * as dotenv from "dotenv";
dotenv.config(); // must haves

app.use(express.json());
app.use(checkToken)
// Router
app.use("/users", userRouter);


// 404
app.use((req, res, next) => {
  next(createError[404]('Not Found'))
});
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    status: err.status || 500,
    message: err.message,
  });
});

//Connect DB
await connect();
export default app;
