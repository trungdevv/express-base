import express from "express";
import { userRouter } from "./routes/index.js";
import connect from "./database/database.js";
import createError from "http-errors";
import checkToken from "./authentication/auth.js";
import { Server } from 'socket.io';
import { createServer } from 'node:http';
import * as dotenv from "dotenv";
const app = express();
dotenv.config(); // must haves

export const server = createServer(app);
const io = new Server(server, {
  cors: { origin: 'http://localhost:3000' }
});

io.on('connection', (socket) => {
  console.log('a user connected');
  
  socket.on('chatMessageClient', (messageContent) => {
 
    io.emit('chatMessageServer', messageContent); // Broadcast message to all connected clients
    console.log('Message emitted:', messageContent);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

app.use(express.json());
app.use(checkToken);

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

// Connect DB
await connect();
export default app;