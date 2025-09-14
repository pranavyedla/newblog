const express = require("express")
const { imageUpload, processStoryImageUpload } = require("../Helpers/Libraries/imageUploadGridFS");

const { getAccessToRoute } = require("../Middlewares/Authorization/auth");
const {addStory,getAllStories,detailStory,likeStory, editStory, deleteStory, editStoryPage } = require("../Controllers/story")
const { checkStoryExist, checkUserAndStoryExist } = require("../Middlewares/database/databaseErrorhandler");

const router = express.Router() ;

router.post("/addstory" ,[getAccessToRoute, imageUpload, processStoryImageUpload],addStory)


router.post("/:slug", checkStoryExist, detailStory)

router.post("/:slug/like",[getAccessToRoute,checkStoryExist] ,likeStory)

router.get("/editStory/:slug",[getAccessToRoute,checkStoryExist,checkUserAndStoryExist] , editStoryPage)

router.put("/:slug/edit",[getAccessToRoute,checkStoryExist,checkUserAndStoryExist, imageUpload, processStoryImageUpload] ,editStory)

router.delete("/:slug/delete",[getAccessToRoute,checkStoryExist,checkUserAndStoryExist] ,deleteStory)

router.get("/getAllStories",getAllStories)


module.exports = router