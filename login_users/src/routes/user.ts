import { UserController } from "../controller/UserController";
import { Router } from "express";
import { checkJwt } from "./../middlewares/jwt";

const router = Router();

//Get all user 
router.get("/",[checkJwt], UserController.getAll);

//Get one user 
router.get("/:id", UserController.getById);

//create a new user 
router.post("/", UserController.newUser);

//Edit user 
router.patch("/:id", UserController.editUser);

//Delele user 
router.delete("/:id", UserController.deleteUser);


export default router;