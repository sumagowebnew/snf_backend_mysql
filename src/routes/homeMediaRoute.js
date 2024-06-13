const express = require("express");
const { body } = require("express-validator");
const {
  gethomeMediaRecord,
  createhomeMediaRecord,
  updatehomeMediaRecord,
  deletehomeMediaRecord,
} = require("../controllers/homeMediaController");
const multer = require("multer");
const { upload } = require("../controllers/homeMediaController");
const verifyToken = require("../JWT/auth");

const router = express.Router();

router.get("/find", verifyToken, async (req, res) => {
    try {
        await gethomeMediaRecord(req, res);
    } catch (error) {
        console.error("Error in gethomeMediaRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
router.get("/get", async (req, res) => {
    try {
        await gethomeMediaRecord(req, res);
    } catch (error) {
        console.error("Error in gethomeMediaRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post('/post', verifyToken,
    upload.fields([{ name: 'imageUrl', maxCount: 1 }]),
    [
        body('name').notEmpty().withMessage('Name cannot be empty'),
          ],
    async (req, res) => {
        try {
            await createhomeMediaRecord(req, res);
        } catch (error) {
            console.error("Error in createhomeMediaRecord:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
);


router.put("/put/:id", verifyToken,
    upload.fields([{ name: 'imageUrl', maxCount: 1 }]),
    async (req, res) => {
        try {
            await updatehomeMediaRecord(req, res);
        } catch (error) {
            console.error("Error in updatehomeMediaRecord:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
);

router.delete("/delete/:id", verifyToken, async (req, res) => {
    try {
        await deletehomeMediaRecord(req, res);
    } catch (error) {
        console.error("Error in deletehomeMediaRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
