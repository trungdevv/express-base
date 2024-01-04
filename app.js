import express from "express";
import helmet from "helmet";
import { studentRouter, userRouter } from "./routes/index.js";
import connect from './database/database.js'


const app = express();
import * as dotenv from "dotenv";
dotenv.config(); // must haves

app.use(express.json());
// Router
app.use("/users", userRouter);
app.use("/students", studentRouter);
//Connect DB
await connect();
export default app;