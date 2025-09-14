const express = require("express")

const { profilePhotoUpload, processProfilePhotoUpload } = require("../Helpers/Libraries/imageUploadGridFS");

const {profile,editProfile,changePassword,addStoryToReadList,readListPage} = require("../Controllers/user");
const { getAccessToRoute } = require("../Middlewares/Authorization/auth");


const router = express.Router() ;

router.get("/profile",getAccessToRoute ,profile)

router.post("/editProfile",[getAccessToRoute, profilePhotoUpload, processProfilePhotoUpload],editProfile)

router.put("/changePassword",getAccessToRoute,changePassword)

router.post("/:slug/addStoryToReadList",getAccessToRoute ,addStoryToReadList)

router.get("/readList",getAccessToRoute ,readListPage)



module.exports = router