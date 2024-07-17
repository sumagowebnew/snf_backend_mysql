const { validationResult } = require("express-validator");
const path = require("path");
const fs = require("fs");
const recordModel = require("../models/upcomingevents");
const multer = require("multer");
const env = require("dotenv").config();
const db = require("../../db");  // Assuming you have a db module to handle database connections

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

function getupcomingeventsRecord(req, res) {
  try {
    recordModel.getAllRecords((err, results) => {
      if (err) {
        console.error("Error fetching records:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      const promises = results.map((item) => {
        return new Promise((resolve, reject) => {
          db.query('SELECT * FROM event_images WHERE event_id = ?', item.id, (err, images) => {
            if (err) return reject(err);

            const modifiedItem = {
              id: item.id,
              name: item.name,
              category: item.category,
              ProjectTitle: item.ProjectTitle,
              Paragraph: item.Paragraph,
              mainImageUrl: `${process.env.serverURL}${item.mainImage}`,
              images: images.map(image => ({
                imageUrl: `${image.images}`,
                imageTitle: image.imageTitles,
              })),
            };

            resolve(modifiedItem);
          });
        });
      });

      Promise.all(promises)
        .then((modifiedResultsWithImages) => {
          res.json(modifiedResultsWithImages);
        })
        .catch((err) => {
          console.error("Error fetching images:", err);
          res.status(500).json({ error: "Internal Server Error" });
        });
    });
  } catch (error) {
    console.error("Error in getupcomingeventsRecord:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}


function createupcomingeventsRecord(req, res) {
  try {
    const recordData = req.body;
    const mainImage = req.files["mainImage"];
    const images = req.files["images"] || [];
    const imageTitles = req.body.imageTitles ? req.body.imageTitles.split(',') : [];

    const newRecord = {
      ProjectTitle: recordData.ProjectTitle,
      Paragraph: recordData.Paragraph,
      category: recordData.category,
      mainImage: mainImage,
    };

    recordModel.createRecord(newRecord, (err, result) => {
      if (err) {
        console.error("Error creating record:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      const eventId = result.insertId;

      if (images.length > 0) {
        const subImagesData = images.map((image, index) => [
          eventId,
          `${process.env.serverURL}${image.filename}`, // Assuming 'filename' is correct
          imageTitles[index] || null,
        ]);

        db.query('INSERT INTO event_images (event_id, images, imageTitles) VALUES ?', [subImagesData], (err, result) => {
          if (err) {
            console.error("Error inserting images:", err);
            return res.status(500).json({ error: "Internal Server Error" });
          }
          res.status(201).json({ message: "Record created successfully with images", recordData });
        });
      } else {
        res.status(201).json({ message: "Record created successfully", recordData });
      }
    });
  } catch (error) {
    console.error("Error in createupcomingeventsRecord:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}



function updateupcomingeventsRecord(req, res) {
  try {
    const { id } = req.params;
    const recordData = req.body;
    const mainImage = req.files["mainImage"];
    const images = req.files["images"];

    recordModel.updateRecord(id, { ...recordData, mainImage, images }, (err, result) => {
      if (err) {
        console.error("Error updating record:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res.json({ message: "Record updated successfully" });
    });
  } catch (error) {
    console.error("Error in updateupcomingeventsRecord:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

function deleteupcomingeventsRecord(req, res) {
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
    console.error("Error in deleteupcomingeventsRecord:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// New API to add images and image titles by category
const addImagesByCategory = (req, res) => {
  try {
    const { category } = req.body;
    const images = req.files.images; // Accessing the 'images' property of req.files
    const imageTitles = req.body.imageTitles ? req.body.imageTitles.split(',') : [];

    if (!category) {
      return res.status(400).json({ error: "Category is required" });
    }

    db.query('SELECT id FROM upcomingevents WHERE category = ?', [category], (err, results) => {
      if (err) {
        console.error("Error fetching event ID:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      if (results.length === 0) {
        return res.status(404).json({ error: "Event not found" });
      }

      const eventId = results[0].id;

      if (images && images.length > 0) {
        const subImagesData = images.map((image, index) => [
          eventId,
          `${process.env.serverURL}${image.filename}`, // Adjusted to correctly form the image URL
          imageTitles[index] || null,
        ]);

        db.query('INSERT INTO event_images (event_id, images, imageTitles) VALUES ?', [subImagesData], (err, result) => {
          if (err) {
            console.error("Error inserting images:", err);
            return res.status(500).json({ error: "Internal Server Error" });
          }
          res.status(201).json({ message: "Images added successfully", eventId: eventId });
        });
      } else {
        res.status(400).json({ error: "No images provided" });
      }
    });
  } catch (error) {
    console.error("Error in addImagesByCategory:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const updateImagesByCategory = async (req, res) => {
  const { id } = req.params;
  const { imageTitles, category } = req.body;
  const images = req.files ? req.files.images : null;

  // Update images and other details in the database (replace with actual DB logic)
  try {
    // Example: Update in database
    await ImageModel.findByIdAndUpdate(id, { imageTitles, category, images });

    res.status(200).json({ message: 'Images updated successfully' });
  } catch (error) {
    console.error("Error in updateImagesByCategory:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteImagesByCategory = async (req, res) => {
  const { id } = req.params;

  // Delete images from the database (replace with actual DB logic)
  try {
    // Example: Delete from database
    await ImageModel.findByIdAndDelete(id);

    res.status(200).json({ message: 'Images deleted successfully' });
  } catch (error) {
    console.error("Error in deleteImagesByCategory:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getImagesByCategory = async (req, res) => {

  // Retrieve images from the database (replace with actual DB logic)
  try {
    const images = await ImageModel.find();

    res.status(200).json({ message: 'Images retrieved successfully', images });
  } catch (error) {
    console.error("Error in getImagesByCategory:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


module.exports = {
  getupcomingeventsRecord,
  createupcomingeventsRecord,
  updateupcomingeventsRecord,
  deleteupcomingeventsRecord,
  addImagesByCategory,
  upload,
};
module.exports = { addImagesByCategory,updateImagesByCategory,deleteImagesByCategory,getImagesByCategory };

