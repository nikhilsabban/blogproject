import express from "express";
import { isauthenicated } from "../middleware.js/isauthenicated.js";
import { allblog, createblog, deleteblog, getOwnblogs, getownblogwithid, publishedbutton, removebutton, togglepublished, updateblog } from "../controllers/blog.controller.js";
import { singleupload } from "../middleware.js/multer.js";

const router = express.Router();


router.post("/" , isauthenicated , createblog);
router.put("/:blogId" , isauthenicated,singleupload ,updateblog);
router.get("/get-own-blog" , isauthenicated , getOwnblogs);
router.get("/blog/:blogid" , isauthenicated ,getownblogwithid);
router.delete("/delete/:id" , isauthenicated ,deleteblog);
router.patch("/:blogId" , isauthenicated , togglepublished);
router.get("/get-all-blog" , allblog);
router.get("/published/:id" , isauthenicated ,publishedbutton);
router.get("/remove/:id" , isauthenicated ,removebutton);



export default router;
