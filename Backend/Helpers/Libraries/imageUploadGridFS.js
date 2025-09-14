const { upload, uploadToGridFS } = require('./gridfsStorage');
const CustomError = require("../error/CustomError");

// Middleware for single image upload
const imageUpload = upload.single('image');

// Middleware for profile photo upload
const profilePhotoUpload = upload.single('photo');

// Process uploaded image and store in GridFS
const processImageUpload = async (req, res, next) => {
    try {
        console.log("processImageUpload - req.file:", req.file);
        
        if (!req.file) {
            console.log("No file uploaded");
            return next();
        }

        const file = req.file;
        let filename;

        if (file.fieldname === "photo") {
            // Profile photo
            const extension = file.mimetype.split("/")[1];
            filename = `photo_user_${req.user.id}_${Date.now()}.${extension}`;
            req.savedUserPhotoId = await uploadToGridFS(file, filename);
            console.log("Profile photo uploaded with ID:", req.savedUserPhotoId);
        } else {
            // Story image
            filename = `image_${new Date().toISOString().replace(/:/g, '-')}_${file.originalname}`;
            req.savedStoryImageId = await uploadToGridFS(file, filename);
            console.log("Story image uploaded with ID:", req.savedStoryImageId);
        }

        next();
    } catch (error) {
        console.error("Error in processImageUpload:", error);
        next(new CustomError("Error uploading image: " + error.message, 500));
    }
};

// Process profile photo upload
const processProfilePhotoUpload = async (req, res, next) => {
    try {
        console.log("processProfilePhotoUpload - req.file:", req.file);
        
        if (!req.file) {
            console.log("No profile photo uploaded");
            return next();
        }

        const file = req.file;
        const extension = file.mimetype.split("/")[1];
        const filename = `photo_user_${req.user.id}_${Date.now()}.${extension}`;
        
        req.savedUserPhotoId = await uploadToGridFS(file, filename);
        console.log("Profile photo uploaded with ID:", req.savedUserPhotoId);
        next();
    } catch (error) {
        console.error("Error in processProfilePhotoUpload:", error);
        next(new CustomError("Error uploading profile photo: " + error.message, 500));
    }
};

// Process story image upload
const processStoryImageUpload = async (req, res, next) => {
    try {
        console.log("processStoryImageUpload - req.file:", req.file);
        
        if (!req.file) {
            console.log("No story image uploaded");
            return next();
        }

        const file = req.file;
        const filename = `image_${new Date().toISOString().replace(/:/g, '-')}_${file.originalname}`;
        
        req.savedStoryImageId = await uploadToGridFS(file, filename);
        console.log("Story image uploaded with ID:", req.savedStoryImageId);
        next();
    } catch (error) {
        console.error("Error in processStoryImageUpload:", error);
        next(new CustomError("Error uploading story image: " + error.message, 500));
    }
};

module.exports = {
    imageUpload,
    profilePhotoUpload,
    processImageUpload,
    processProfilePhotoUpload,
    processStoryImageUpload
};