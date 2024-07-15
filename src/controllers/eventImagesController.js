// controllers/eventImagesController.js

const { validationResult } = require("express-validator");
const path = require("path");
const fs = require("fs");
const eventModel = require("../models/event_imagesModel");
const multer = require("multer");
const env = require("dotenv").config();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "../../uploads");
    // Check if the upload directory exists, if not, create it
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

function getAllEventImages(req, res) {
  try {
    eventModel.getAllEventImages((err, results) => {
      if (err) {
        console.error("Error fetching event images:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res.json(results);
    });
  } catch (error) {
    console.error("Error in getAllEventImages:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

function createEventImage(req, res) {
  try {
    const { imageTitle } = req.body; // Assuming imageTitle is provided in the request body
    const imgFile = req.files["images"][0];
    
    const eventImage = {
      images: imgFile.originalname,
      imageTitle: imageTitle, // Assigning imageTitle from request body
      category_id: req.body.category_id // Assuming category_id is also provided in the request body
    };

    eventModel.createEventImage(eventImage, (err, result) => {
      if (err) {
        console.error("Error creating event image:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res.status(201).json({ message: "Event image created successfully", result: eventImage });
    });
  } catch (error) {
    console.error("Error in createEventImage:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

function updateEventImage(req, res) {
  try {
    const { id } = req.params;
    const { imageTitle } = req.body; // Assuming imageTitle is provided in the request body
    const eventData = {
      ...req.body,
      imageTitle: imageTitle // Assigning imageTitle from request body
    };

    if (req.files && req.files["images"]) {
      const imgFile = req.files["images"][0];
      eventData.images = imgFile.originalname;
    }

    eventModel.updateEventImage(id, eventData, (err, result) => {
      if (err) {
        console.error("Error updating event image:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res.json({ message: "Event image updated successfully" });
    });
  } catch (error) {
    console.error("Error in updateEventImage:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

function deleteEventImage(req, res) {
  try {
    const { id } = req.params;
    eventModel.deleteEventImage(id, (err, result) => {
      if (err) {
        console.error("Error deleting event image:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res.send("Event image deleted successfully");
    });
  } catch (error) {
    console.error("Error in deleteEventImage:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  getAllEventImages,
  createEventImage,
  updateEventImage,
  deleteEventImage,
  upload,
};
