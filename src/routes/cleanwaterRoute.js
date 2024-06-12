const express = require("express");
const { body } = require("express-validator");
const {
  getcleanwaterRecord,
  createcleanwaterRecord,
  updatecleanwaterRecord,
  deletecleanwaterRecord,
} = require("../controllers/cleanwaterController");
const multer = require("multer");
const { upload } = require("../controllers/cleanwaterController");
const verifyToken = require("../JWT/auth");

const router = express.Router();

router.get("/find", verifyToken, async (req, res) => {
    try {
        await getcleanwaterRecord(req, res);
    } catch (error) {
        console.error("Error in getcleanwaterRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
router.get("/get", async (req, res) => {
    try {
        await getcleanwaterRecord(req, res);
    } catch (error) {
        console.error("Error in getcleanwaterRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post('/create', verifyToken,
    upload.fields([{ name: 'imageUrl', maxCount: 1 }]),
    [
        body('name').notEmpty().withMessage('Name cannot be empty'),
          ],
    async (req, res) => {
        try {
            await createcleanwaterRecord(req, res);
        } catch (error) {
            console.error("Error in createcleanwaterRecord:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
);


router.put("/update/:id", verifyToken,
    upload.fields([{ name: 'imageUrl', maxCount: 1 }]),
    async (req, res) => {
        try {
            await updatecleanwaterRecord(req, res);
        } catch (error) {
            console.error("Error in updatecleanwaterRecord:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
);

router.delete("/delete/:id", verifyToken, async (req, res) => {
    try {
        await deletecleanwaterRecord(req, res);
    } catch (error) {
        console.error("Error in deletecleanwaterRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
