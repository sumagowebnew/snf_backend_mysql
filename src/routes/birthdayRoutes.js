const express = require("express");
const { body } = require("express-validator");
const {
  getbirthdayRecord,
  createbirthdayRecord,
  updatebirthdayRecord,
  deletebirthdayRecord,
} = require("../controllers/birthdayController");
const multer = require("multer");
const { upload } = require("../controllers/birthdayController");
const verifyToken = require("../JWT/auth");

const router = express.Router();

router.get("/find", verifyToken, async (req, res) => {
    try {
        await getbirthdayRecord(req, res);
    } catch (error) {
        console.error("Error in getbirthdayRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
router.get("/get", async (req, res) => {
    try {
        await getbirthdayRecord(req, res);
    } catch (error) {
        console.error("Error in getbirthdayRecord:", error);
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
            await createbirthdayRecord(req, res);
        } catch (error) {
            console.error("Error in createbirthdayRecord:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
);


router.put("/update/:id", verifyToken,
    upload.fields([{ name: 'imageUrl', maxCount: 1 }]),
    async (req, res) => {
        try {
            await updatebirthdayRecord(req, res);
        } catch (error) {
            console.error("Error in updatebirthdayRecord:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
);

router.delete("/delete/:id", verifyToken, async (req, res) => {
    try {
        await deletebirthdayRecord(req, res);
    } catch (error) {
        console.error("Error in deletebirthdayRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
