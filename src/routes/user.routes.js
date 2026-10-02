import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/user.controller.js";

const router = express.Router();

const mid = (req, res, next) => {
  console.log("route level");
  next();
};

const mid1 = (req, res, next) => {
  console.log("route level 1");
  next();
};

router.use((req, res, next) => {
  console.log("all users route");
  next();
});
//* get all users
router.get("/", mid, mid1, getAllUsers);

//* get one user
// get user by id 1 , 2 ,3 , 40
router.get("/:id", getUserById);

//* create
// post /users
router.post("/", createUser);

//* update
// put /users
router.put("/:userId", updateUser);

//* delete
// delete /users/1
router.delete("/:id", deleteUser);

export default router;
