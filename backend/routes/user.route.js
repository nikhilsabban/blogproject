import express from "express";
import { me, register, updateprofile } from "../controllers/user.controller.js";
const router =express.Router();
import {login} from "../controllers/user.controller.js";
import { logout } from "../controllers/user.controller.js";
import {verify} from "../middleware.js/index.js"
import { isauthenicated } from "../middleware.js/isauthenicated.js";
import { singleupload } from "../middleware.js/multer.js";

router.post("/register" , register);
router.post("/login" , login);
router.get("/verify" , verify);
router.get("/logout" , logout);
router.put("/profile/update" , isauthenicated,singleupload,updateprofile );
router.get("/me" , isauthenicated , me);



export default router