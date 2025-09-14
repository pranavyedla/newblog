const express = require("express");
const { getImage, deleteImage } = require("../Controllers/image");

const router = express.Router();

// Get image by ID
router.get("/:id", getImage);

// Delete image by ID (for admin use)
router.delete("/:id", deleteImage);

module.exports = router;

