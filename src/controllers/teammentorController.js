// recordsController.js
const { validationResult } = require("express-validator");
const path = require("path");
const fs = require("fs");
const recordModel = require("../models/teammentorModel");
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
    cb(
      null,
      // file.fieldname + "_" + Date.now() + path.extname(file.originalname)
      file.originalname
    );
  },
});

const upload = multer({ storage: storage });

function getteammentorRecord(req, res) {
  try {
    recordModel.getAllRecords((err, results) => {
      if (err) {
        console.error("Error fetching records:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      const modifiedResults = results.map((item) => {
        // Add a new property called 'modified' with value true
        return {
          id: item.id,
          name: item.name,
          position:item.position,
          imageUrl: `${process.env.serverURL}${item.imageUrl}`,
        };
      });

      // Send the modified data as response
      res.json(modifiedResults);
    });
  } catch (error) {
    console.error("Error in getteammentorRecord:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

function createteammentorRecord(req, res) {
  try {
    const recordData = req.body;
    const imgFile = req.files["imageUrl"][0]; 

    recordData.imageUrl = imgFile.originalname;
    recordModel.createRecord(recordData, (err, result) => {
      if (err) {
        console.error("Error creating record:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res
        .status(201)
        .json({ message: "Record created successfully", result: recordData });
    });
  } catch (error) {
    console.error("Error in createteammentorRecord:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

function updateteammentorRecord(req, res) {
  try {
    const { id } = req.params;
    const recordData = req.body;

    // Check if a new image file is uploaded
    if (req.files && req.files["imageUrl"]) {
      const imgFile = req.files["imageUrl"][0];
      recordData.imageUrl = imgFile.originalname;
    }

    recordModel.updateRecord(id, recordData, (err, result) => {
      if (err) {
        console.error("Error updating record:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res.json({ message: "Record updated successfully" });
    });
  } catch (error) {
    console.error("Error in updateteammentorRecord:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

function deleteteammentorRecord(req, res) {
  try {
    const { id } = req.params;
    recordModel.deleteRecord(id, (err, result) => {
      if (err) {
        console.error("Error deleting record:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res.send("Record deleted successfully");
    });
  } catch (error) {
    console.error("Error in deleteteammentorRecord:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  getteammentorRecord,
  createteammentorRecord,
  updateteammentorRecord,
  deleteteammentorRecord,
  upload,
};
