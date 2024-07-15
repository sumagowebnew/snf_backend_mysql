const express = require("express");
const { body } = require("express-validator");
const {
  getEventDetails,
  createEventDetail,
  updateEventDetail,
  deleteEventDetail,
  upload
} = require("../controllers/upcomingeventsController");
const verifyToken = require("../JWT/auth");

const router = express.Router();

router.get("/get", async (req, res) => {
  try {
    await getEventDetails(req, res);
  } catch (error) {
    console.error("Error in getEventDetails:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post('/post',
  upload.fields([{ name: 'mainImage', maxCount: 1 }]),
  [
    body('category_id').notEmpty().withMessage('category_id cannot be empty'),
    body('ProjectTitle').notEmpty().withMessage('ProjectTitle cannot be empty'),
    body('Paragraph').notEmpty().withMessage('Paragraph cannot be empty'),
    body('ProjectsubTitle').notEmpty().withMessage('ProjectsubTitle cannot be empty')
  ],
  async (req, res) => {
    try {
      await createEventDetail(req, res);
    } catch (error) {
      console.error("Error in createEventDetail:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

router.put("/put/:id", verifyToken,
  upload.single('mainImage'),
  async (req, res) => {
    try {
      await updateEventDetail(req, res);
    } catch (error) {
      console.error("Error in updateEventDetail:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

router.delete("/delete/:id", verifyToken, async (req, res) => {
  try {
    await deleteEventDetail(req, res);
  } catch (error) {
    console.error("Error in deleteEventDetail:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
