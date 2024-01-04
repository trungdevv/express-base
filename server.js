import app from "./app.js";
import cors from "cors";

const port = process.env.PORT || 3000;
app.use(
  cors({
    origin: "*",
  })
);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
