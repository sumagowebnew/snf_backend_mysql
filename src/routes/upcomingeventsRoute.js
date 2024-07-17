const express = require("express");
const { body } = require("express-validator");
const {
  getupcomingeventsRecord,
  createupcomingeventsRecord,
  updateupcomingeventsRecord,
  deleteupcomingeventsRecord,
  addImagesByCategory,
  upload,
  getAllImagesData
} = require("../controllers/upcomingeventsControler");
const verifyToken = require("../JWT/auth");

const router = express.Router();

router.get("/find", verifyToken, async (req, res) => {
  try {
    await getupcomingeventsRecord(req, res);
  } catch (error) {
    console.error("Error in getupcomingeventsRecord:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/get", async (req, res) => {
  try {
    await getupcomingeventsRecord(req, res);
  } catch (error) {
    console.error("Error in getupcomingeventsRecord:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.get("/getAllImagesData", verifyToken, async (req, res) => {
  try {
    await getAllImagesData(req, res);
  } catch (error) {
    console.error("Error in getupcomingeventsRecord:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post(
  "/post",

  upload.fields([
    { name: "mainImage", maxCount: 1 },
  
  ]),
  [
    body("ProjectTitle").notEmpty().withMessage("ProjectTitle cannot be empty"),
    body("category").notEmpty().withMessage("Category cannot be empty"),
    body("Paragraph").notEmpty().withMessage("Paragraph cannot be empty"),
  ],
  async (req, res) => {
    try {
      await createupcomingeventsRecord(req, res);
    } catch (error) {
      console.error("Error in createupcomingeventsRecord:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

router.put(
  "/put/:id",
  verifyToken,
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "images", maxCount: 5 },
  ]),
  async (req, res) => {
    try {
      await updateupcomingeventsRecord(req, res);
    } catch (error) {
      console.error("Error in updateupcomingeventsRecord:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

router.delete("/delete/:id", verifyToken, async (req, res) => {
  try {
    await deleteupcomingeventsRecord(req, res);
  } catch (error) {
    console.error("Error in deleteupcomingeventsRecord:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post('/addImagesByCategory',

  [
    body("imageTitles").notEmpty().withMessage("ProjectTitle cannot be empty"),
    body("category").notEmpty().withMessage("Category cannot be empty"),
  ],
  upload.fields([
    { name: "images", maxCount: 5 },
  ]),
  async (req, res) => {
    try {
      await addImagesByCategory(req, res);
    } catch (error) {
      console.error("Error in addImagesByCategory:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);


module.exports = router;
