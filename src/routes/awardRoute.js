const express = require("express");
const { body } = require("express-validator");
const {
  getawardRecord,
  createawardRecord,
  updateawardRecord,
  deleteawardRecord,
} = require("../controllers/awardController");
const multer = require("multer");
const { upload } = require("../controllers/awardController");
const verifyToken = require("../JWT/auth");

const router = express.Router();

router.get("/find", verifyToken, async (req, res) => {
    try {
        await getawardRecord(req, res);
    } catch (error) {
        console.error("Error in getawardRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
router.get("/get", async (req, res) => {
    try {
        await getawardRecord(req, res);
    } catch (error) {
        console.error("Error in getawardRecord:", error);
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
            await createawardRecord(req, res);
        } catch (error) {
            console.error("Error in createawardRecord:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
);


router.put("/put/:id", verifyToken,
    upload.fields([{ name: 'imageUrl', maxCount: 1 }]),
    async (req, res) => {
        try {
            await updateawardRecord(req, res);
        } catch (error) {
            console.error("Error in updateawardRecord:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
);

router.delete("/delete/:id", verifyToken, async (req, res) => {
    try {
        await deleteawardRecord(req, res);
    } catch (error) {
        console.error("Error in deleteawardRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
