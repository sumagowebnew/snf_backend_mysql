const { validationResult } = require("express-validator");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const env = require("dotenv").config();
const db = require("../../db");  // Ensure you require your db module
const recordModel = require("../models/upcomingevents");

// Multer storage configuration
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

      const modifiedResults = results.map((item) => {
        return {
          id: item.id,
          name: item.name,
          category: item.category,
          ProjectTitle: item.ProjectTitle,
          Paragraph: item.Paragraph,
          mainImageUrl: `${process.env.serverURL}${item.mainImage}`,
          images: [],
        };
      });

      const promises = modifiedResults.map((result) => {
        return new Promise((resolve, reject) => {
          db.query('SELECT * FROM event_images WHERE event_id = ?', [result.id], (err, images) => {
            if (err) return reject(err);

            result.images = images.map(image => ({
              imageUrl: `${process.env.serverURL}${image.images}`,
              imageTitle: image.imageTitles,
            }));
            resolve(result);
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
    const { ProjectTitle, Paragraph, category } = req.body;
    const mainImage = req.files["mainImage"][0];
    const subImages = req.files["images"];
    const imageTitles = req.body.imageTitles ? req.body.imageTitles.split(',') : [];

    db.query(
      'INSERT INTO upcomingevents (ProjectTitle, Paragraph, category, mainImage) VALUES (?, ?, ?, ?)',
      [ProjectTitle, Paragraph, category, mainImage.filename],
      (err, result) => {
        if (err) {
          console.error("Error creating record:", err);
          return res.status(500).json({ error: "Internal Server Error" });
        }

        const eventId = result.insertId;

        if (subImages && subImages.length > 0) {
          const subImagesData = subImages.map((image, index) => [
            eventId,
            image.filename,
            imageTitles[index] || null,
          ]);

          db.query(
            'INSERT INTO event_images (event_id, images, imageTitles) VALUES ?',
            [subImagesData],
            (err, result) => {
              if (err) {
                console.error("Error inserting images:", err);
                return res.status(500).json({ error: "Internal Server Error" });
              }

              res.status(201).json({
                message: 'Record created successfully',
                result: {
                  ProjectTitle,
                  Paragraph,
                  category,
                  mainImage: mainImage.filename,
                  imageTitles: imageTitles.join(','),
                },
              });
            }
          );
        } else {
          res.status(201).json({
            message: 'Record created successfully',
            result: {
              ProjectTitle,
              Paragraph,
              category,
              mainImage: mainImage.filename,
              imageTitles: '',
            },
          });
        }
      }
    );
  } catch (error) {
    console.error("Error in createupcomingeventsRecord:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

function updateupcomingeventsRecord(req, res) {
  try {
    const { id } = req.params;
    const { ProjectTitle, Paragraph, category } = req.body;
    const mainImage = req.files["mainImage"][0];
    const subImages = req.files["images"];
    const imageTitles = req.body.imageTitles ? req.body.imageTitles.split(',') : [];

    db.query(
      'UPDATE upcomingevents SET ProjectTitle = ?, Paragraph = ?, category = ?, mainImage = ? WHERE id = ?',
      [ProjectTitle, Paragraph, category, mainImage.filename, id],
      (err, result) => {
        if (err) {
          console.error("Error updating record:", err);
          return res.status(500).json({ error: "Internal Server Error" });
        }

        if (subImages && subImages.length > 0) {
          const subImagesData = subImages.map((image, index) => [
            id,
            image.filename,
            imageTitles[index] || null,
          ]);

          db.query(
            'INSERT INTO event_images (event_id, images, imageTitles) VALUES ?',
            [subImagesData],
            (err, result) => {
              if (err) {
                console.error("Error inserting images:", err);
                return res.status(500).json({ error: "Internal Server Error" });
              }

              res.json({ message: "Record updated successfully" });
            }
          );
        } else {
          res.json({ message: "Record updated successfully" });
        }
      }
    );
  } catch (error) {
    console.error("Error in updateupcomingeventsRecord:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

function deleteupcomingeventsRecord(req, res) {
  try {
    const { id } = req.params;
    db.query('DELETE FROM upcomingevents WHERE id = ?', [id], (err, result) => {
      if (err) {
        console.error("Error deleting record:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res.send("Record deleted successfully");
    });
  } catch (error) {
    console.error("Error in deleteupcomingeventsRecord:", error);
    res.status(500).json// upcomingeventsControler.js

    const { validationResult } = require("express-validator");
    const path = require("path");
    const fs = require("fs");
    const recordModel = require("../models/upcomingevents");
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
    
    function getupcomingeventsRecord(req, res) {
      try {
        recordModel.getAllRecords((err, results) => {
          if (err) {
            console.error("Error fetching records:", err);
            return res.status(500).json({ error: "Internal Server Error" });
          }
          const modifiedResults = results.map((item) => {
            return {
              id: item.id,
              name: item.name,
              category: item.category,
              ProjectTitle: item.ProjectTitle,
              Paragraph: item.Paragraph,
              mainImageUrl: `${process.env.serverURL}${item.mainImage}`,
              images: [], // Initialize an empty array for images
            };
          });
          
          // Fetch associated images for each event
          const promises = modifiedResults.map((result) => {
            return new Promise((resolve, reject) => {
              db.query('SELECT * FROM event_images WHERE event_id = ?', result.id, (err, images) => {
                if (err) return reject(err);
                
                result.images = images.map(image => ({
                  imageUrl: `${process.env.serverURL}${image.images}`,
                  imageTitle: image.imageTitles,
                }));
                resolve(result);
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
        const images = req.files["images"];
    
        recordModel.createRecord({ ...recordData, mainImage, images }, (err, result) => {
          if (err) {
            console.error("Error creating record:", err);
            return res.status(500).json({ error: "Internal Server Error" });
          }
          res.status(201).json({ message: "Record created successfully", result: recordData });
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
    
    module.exports = {
      getupcomingeventsRecord,
      createupcomingeventsRecord,
      updateupcomingeventsRecord,
      deleteupcomingeventsRecord,
      upload,
    };
    ({ error: "Internal Server Error" });
  }
}

module.exports = {
  getupcomingeventsRecord,
  createupcomingeventsRecord,
  updateupcomingeventsRecord,
  deleteupcomingeventsRecord,
  upload,
};
