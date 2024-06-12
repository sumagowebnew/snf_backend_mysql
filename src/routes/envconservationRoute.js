const express = require("express");
const { body } = require("express-validator");
const {
  getenvconservationRecord,
  createenvconservationRecord,
  updateenvconservationRecord,
  deleteenvconservationRecord,
} = require("../controllers/envconservationController");
const multer = require("multer");
const { upload } = require("../controllers/envconservationController");
const verifyToken = require("../JWT/auth");

const router = express.Router();

router.get("/find", verifyToken, async (req, res) => {
    try {
        await getenvconservationRecord(req, res);
    } catch (error) {
        console.error("Error in getenvconservationRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
router.get("/get", async (req, res) => {
    try {
        await getenvconservationRecord(req, res);
    } catch (error) {
        console.error("Error in getenvconservationRecord:", error);
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
            await createenvconservationRecord(req, res);
        } catch (error) {
            console.error("Error in createenvconservationRecord:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
);


router.put("/put/:id", verifyToken,
    upload.fields([{ name: 'imageUrl', maxCount: 1 }]),
    async (req, res) => {
        try {
            await updateenvconservationRecord(req, res);
        } catch (error) {
            console.error("Error in updateenvconservationRecord:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
);

router.delete("/delete/:id", verifyToken, async (req, res) => {
    try {
        await deleteenvconservationRecord(req, res);
    } catch (error) {
        console.error("Error in deleteenvconservationRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
