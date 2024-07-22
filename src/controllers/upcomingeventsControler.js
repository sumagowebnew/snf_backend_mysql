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
              subtitle:item.subtitle,
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
      subtitle:subtitle
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
          category // Add the category to the array
        ]);

        db.query('INSERT INTO event_images (event_id, images, imageTitles, category) VALUES ?', [subImagesData], (err, result) => {
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

function  getAllImagesData  (req, res)  {
  try {
    db.query('SELECT * FROM event_images', (err, results) => {
      if (err) {
        console.error("Error fetching image data:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      const imagesData = results.map(image => ({
        id: image.id,
        eventId: image.event_id,
        images: `${image.images}`,
        imageTitle: image.imageTitles,
        category:image.category
      }));

      res.json(imagesData);
    });
  } catch (error) {
    console.error("Error in getAllImagesData:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const deleteImageById = (req, res) => {
  const { id } = req.params; // Assuming the image id is passed as a URL parameter
  
  try {
    db.query('DELETE FROM event_images WHERE id = ?', [id], (err, result) => {
      if (err) {
        console.error("Error deleting image:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Image not found" });
      }

      res.status(200).json({ message: "Image deleted successfully", id: id });
    });
  } catch (error) {
    console.error("Error in deleteImageById:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const updateImageById = (req, res) => {
  const { id } = req.params; // Assuming the image id is passed as a URL parameter
  const { imageTitles } = req.body; // Assuming you receive updated image titles
  const images = req.files.images; // Accessing the 'images' property of req.files

  try {
    // Ensure images and imageTitles are provided
    if (!images || !imageTitles) {
      return res.status(400).json({ error: "Images and image titles are required" });
    }

    // Assuming images is an array of file objects, process them as needed
    const imagePaths = images.map(image => `${process.env.serverURL}${image.filename}`); // Constructing image paths

    // Update the database with new image paths and image titles
    db.query('UPDATE event_images SET images = ?, imageTitles = ? WHERE id = ?', [imagePaths, imageTitles, id], (err, result) => {
      if (err) {
        console.error("Error updating image:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Image not found" });
      }

      res.status(200).json({ message: "Image updated successfully", id: id });
    });
  } catch (error) {
    console.error("Error in updateImageById:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};





module.exports = {
  addImagesByCategory, getAllImagesData,
  getupcomingeventsRecord,
  createupcomingeventsRecord,
  updateupcomingeventsRecord,
  deleteupcomingeventsRecord,
  addImagesByCategory,deleteImageById,updateImageById,
  upload,
};
