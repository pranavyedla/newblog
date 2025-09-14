const asyncErrorWrapper = require("express-async-handler");
const mongoose = require('mongoose');
const { GridFSBucket } = require('mongodb');
const CustomError = require("../Helpers/error/CustomError");

// Get GridFS bucket
let gfs;
mongoose.connection.once('open', () => {
    gfs = new GridFSBucket(mongoose.connection.db, {
        bucketName: 'uploads'
    });
});

// Serve image by ID
const getImage = asyncErrorWrapper(async (req, res, next) => {
    const { id } = req.params;
    
    console.log("Image request for ID:", id);

    if (!id) {
        return next(new CustomError("Image ID required", 400));
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        console.log("Invalid image ID:", id);
        return next(new CustomError("Invalid image ID", 400));
    }

    try {
        const downloadStream = gfs.openDownloadStream(new mongoose.Types.ObjectId(id));
        
        downloadStream.on('error', (error) => {
            console.log("Download stream error:", error);
            if (error.code === 'ENOENT') {
                return next(new CustomError("Image not found", 404));
            }
            return next(new CustomError("Error retrieving image", 500));
        });

        // Set appropriate headers
        downloadStream.on('file', (file) => {
            console.log("Serving file:", file.filename, "Type:", file.metadata?.mimetype);
            res.set({
                'Content-Type': file.metadata?.mimetype || 'image/jpeg',
                'Content-Length': file.length,
                'Cache-Control': 'public, max-age=31536000', // Cache for 1 year
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type'
            });
        });

        downloadStream.pipe(res);
    } catch (error) {
        console.log("Error in getImage:", error);
        next(new CustomError("Error retrieving image: " + error.message, 500));
    }
});

// Delete image by ID
const deleteImage = asyncErrorWrapper(async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new CustomError("Invalid image ID", 400));
    }

    try {
        await gfs.delete(new mongoose.Types.ObjectId(id));
        
        res.status(200).json({
            success: true,
            message: "Image deleted successfully"
        });
    } catch (error) {
        next(new CustomError("Error deleting image: " + error.message, 500));
    }
});

module.exports = {
    getImage,
    deleteImage
};