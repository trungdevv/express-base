import express from "express";
import { body } from "express-validator";
import { userController } from "../controllers/index.js";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Get users");
});
router.get("/:id", (req, res) => {
  res.send("Get detail user by id:" + req?.params?.id ?? "");
});
router.post("/login", userController.login);
router.post("/register", userController.register);
// if not =>create
router.patch("/", (req, res) => {
  res.send("Get detail user by id");
});

// update
router.put("/", (req, res) => {
  res.send("Get detail user by id");
});

// fake data user
router.post("/generated", userController.generated); 
export default router;
