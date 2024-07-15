const express = require("express");
const { validationResult } = require("express-validator");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const eventModel = require("../models/event_imagesModel");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "../../uploads");
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

// POST route to create a new event image
router.post("/post", upload.single("image"), (req, res) => {
  try {
    const { category_id, imageTitle } = req.body;
    const images = req.file.originalname;

    // Create event image record in the database
    eventModel.createEventImage({ category_id, imageTitle, images }, (err, result) => {
      if (err) {
        console.error("Error creating event image:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res.status(201).json({ message: "Event image created successfully", result });
    });
  } catch (error) {
    console.error("Error in createEventImage:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET route to retrieve all event images
router.get("/get", (req, res) => {
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
});

// PUT route to update an event image by ID
router.put("/:id", upload.single("image"), (req, res) => {
  try {
    const { id } = req.params;
    const { category_id, imageTitle } = req.body;
    const images = req.file.originalname;

    // Update event image record in the database
    eventModel.updateEventImage(id, { category_id, imageTitle, images }, (err, result) => {
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
});

// DELETE route to delete an event image by ID
router.delete("/:id", (req, res) => {
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
});

module.exports = router;
