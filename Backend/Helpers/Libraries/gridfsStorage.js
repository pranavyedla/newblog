const mongoose = require('mongoose');
const { GridFSBucket } = require('mongodb');
const multer = require('multer');
const CustomError = require("../error/CustomError");

// Create GridFS bucket
let gfs;
mongoose.connection.once('open', () => {
    gfs = new GridFSBucket(mongoose.connection.db, {
        bucketName: 'uploads'
    });
});

// Multer storage configuration for GridFS
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
    
    if (!allowedMimeTypes.includes(file.mimetype)) {
        return cb(new CustomError("Please provide a valid image file", 400), false);
    }
    
    cb(null, true);
};

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});

// Helper function to upload file to GridFS
const uploadToGridFS = (file, filename) => {
    return new Promise((resolve, reject) => {
        const uploadStream = gfs.openUploadStream(filename, {
            metadata: {
                originalName: file.originalname,
                mimetype: file.mimetype,
                uploadDate: new Date()
            }
        });

        uploadStream.on('error', (error) => {
            reject(error);
        });

        uploadStream.on('finish', () => {
            resolve(uploadStream.id);
        });

        uploadStream.end(file.buffer);
    });
};

// Helper function to get file from GridFS
const getFileFromGridFS = (fileId) => {
    return gfs.openDownloadStream(fileId);
};

// Helper function to delete file from GridFS
const deleteFileFromGridFS = (fileId) => {
    return gfs.delete(fileId);
};

module.exports = {
    upload,
    uploadToGridFS,
    getFileFromGridFS,
    deleteFileFromGridFS
};