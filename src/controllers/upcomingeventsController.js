const { validationResult } = require("express-validator");
const path = require("path");
const fs = require("fs");
const eventModel = require("../models/upcomingeventsModel");
const multer = require("multer");
const env = require("dotenv").config();

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

function getEventDetails(req, res) {
  try {
    eventModel.getAllEventDetails((err, results) => {
      if (err) {
        console.error("Error fetching event details:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res.json(results);
    });
  } catch (error) {
    console.error("Error in getEventDetails:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

function createEventDetail(req, res) {
    try {
      const eventData = req.body;
      const imgFile = req.files["mainImage"][0]; // Access the uploaded file
  
      eventData.mainImage = imgFile ? imgFile.originalname : null; // Set imageUrl in eventData
  
      eventModel.createEventDetail(eventData, (err, result) => {
        if (err) {
          console.error("Error creating event detail:", err);
          return res.status(500).json({ error: "Internal Server Error" });
        }
        res.status(201).json({ message: "Event detail created successfully", result: eventData });
      });
    } catch (error) {
      console.error("Error in createEventDetail:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  
  function updateEventDetail(req, res) {
    try {
      const { id } = req.params;
      const eventData = req.body;
  
      // Check if a new image file is uploaded
      if (req.files && req.files["mainImage"]) {
        const imgFile = req.files["mainImage"][0];
        eventData.mainImage = imgFile ? imgFile.originalname : null; // Update imageUrl in eventData
      }
  
      eventModel.updateEventDetail(id, eventData, (err, result) => {
        if (err) {
          console.error("Error updating event detail:", err);
          return res.status(500).json({ error: "Internal Server Error" });
        }
        res.json({ message: "Event detail updated successfully" });
      });
    } catch (error) {
      console.error("Error in updateEventDetail:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  



function deleteEventDetail(req, res) {
  try {
    const { id } = req.params;
    eventModel.deleteEventDetail(id, (err, result) => {
      if (err) {
        console.error("Error deleting event detail:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res.send("Event detail deleted successfully");
    });
  } catch (error) {
    console.error("Error in deleteEventDetail:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  getEventDetails,
  createEventDetail,
  updateEventDetail,
  deleteEventDetail,
  upload,
};
