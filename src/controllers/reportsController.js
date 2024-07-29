// recordsController.js
const { validationResult } = require("express-validator");
const path = require("path");
const fs = require("fs");
const recordModel = require("../models/reports");
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

function getarticleRecord(req, res) {
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
          reportnme: item.reportnme,
          pdf: `${process.env.serverURL}${item.pdf}`,
        };
      });

      // Send the modified data as response
      res.json(modifiedResults);
    });
  } catch (error) {
    console.error("Error in getarticleRecord:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

function createarticleRecord(req, res) {
  try {
    const recordData = req.body;
    const imgFile = req.files["pdf"][0]; 

    recordData.pdf = imgFile.originalname;
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
    console.error("Error in createarticleRecord:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

function updatearticleRecord(req, res) {
  try {
    const { id } = req.params;
    const recordData = req.body;

    // Check if a new image file is uploaded
    if (req.files && req.files["pdf"]) {
      const imgFile = req.files["pdf"][0];
      recordData.pdf = imgFile.originalname;
    }

    recordModel.updateRecord(id, recordData, (err, result) => {
      if (err) {
        console.error("Error updating record:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res.json({ message: "Record updated successfully" });
    });
  } catch (error) {
    console.error("Error in updatearticleRecord:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

function deletearticleRecord(req, res) {
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
    console.error("Error in deletearticleRecord:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  getarticleRecord,
  createarticleRecord,
  updatearticleRecord,
  deletearticleRecord,
  upload,
};
