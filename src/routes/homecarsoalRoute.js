const express = require("express");
const { body } = require("express-validator");
const {
  gethomecarsoalRecord,
  createhomecarsoalRecord,
  updatehomecarsoalRecord,
  deletehomecarsoalRecord,
} = require("../controllers/homecarsoalController");
const multer = require("multer");
const { upload } = require("../controllers/homecarsoalController");
const verifyToken = require("../JWT/auth");

const router = express.Router();

router.get("/find", verifyToken, async (req, res) => {
    try {
        await gethomecarsoalRecord(req, res);
    } catch (error) {
        console.error("Error in gethomecarsoalRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
router.get("/get", async (req, res) => {
    try {
        await gethomecarsoalRecord(req, res);
    } catch (error) {
        console.error("Error in gethomecarsoalRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post('/create',verifyToken,
    upload.fields([{ name: 'imageUrl', maxCount: 1 }]),
    [
        body('name').notEmpty().withMessage('Name cannot be empty'),
          ],
    async (req, res) => {
        try {
            await createhomecarsoalRecord(req, res);
        } catch (error) {
            console.error("Error in createhomecarsoalRecord:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
);


router.put("/update/:id", verifyToken,
    upload.fields([{ name: 'imageUrl', maxCount: 1 }]),
    async (req, res) => {
        try {
            await updatehomecarsoalRecord(req, res);
        } catch (error) {
            console.error("Error in updatehomecarsoalRecord:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
);

router.delete("/delete/:id", verifyToken, async (req, res) => {
    try {
        await deletehomecarsoalRecord(req, res);
    } catch (error) {
        console.error("Error in deletehomecarsoalRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
