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

router.post(
  "/login",
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  userController.login
);
router.post(
  "/registor",
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  userController.registor
);
// if not =>create
router.patch("/", (req, res) => {
  res.send("Get detail user by id");
});

// update
router.put("/", (req, res) => {
  res.send("Get detail user by id");
});
export default router;
