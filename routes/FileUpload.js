const express=require("express");
const router=express.Router();

const {localFileUpload}=require("../controllers/fileUpload");
const {imageUpload}=require("../controllers/fileUpload");
const {videoUpload}=require("../controllers/fileUpload");
const {reduceImageUpload}=require("../controllers/fileUpload");
router.post("/videoUpload",videoUpload);
router.post("/localFileUpload",localFileUpload);
router.post("/imageUpload",imageUpload);
router.post("/reduceImageUpload",reduceImageUpload)

module.exports=router;