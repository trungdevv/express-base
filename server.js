import app, { server } from "./app.js";
import cors from "cors";

const port = process.env.PORT || 3000;
app.use(
  cors({
    origin: "*",
  })
);
server.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
