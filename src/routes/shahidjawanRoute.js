const express = require("express");
const { body } = require("express-validator");
const {
  getshahidjawanRecord,
  createshahidjawanRecord,
  updateshahidjawanRecord,
  deleteshahidjawanRecord,
} = require("../controllers/shahidjawanController");
const multer = require("multer");
const { upload } = require("../controllers/shahidjawanController");
const verifyToken = require("../JWT/auth");

const router = express.Router();

router.get("/find", verifyToken, async (req, res) => {
    try {
        await getshahidjawanRecord(req, res);
    } catch (error) {
        console.error("Error in getshahidjawanRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
router.get("/get", async (req, res) => {
    try {
        await getshahidjawanRecord(req, res);
    } catch (error) {
        console.error("Error in getshahidjawanRecord:", error);
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
            await createshahidjawanRecord(req, res);
        } catch (error) {
            console.error("Error in createshahidjawanRecord:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
);


router.put("/put/:id", verifyToken,
    upload.fields([{ name: 'imageUrl', maxCount: 1 }]),
    async (req, res) => {
        try {
            await updateshahidjawanRecord(req, res);
        } catch (error) {
            console.error("Error in updateshahidjawanRecord:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
);

router.delete("/delete/:id", verifyToken, async (req, res) => {
    try {
        await deleteshahidjawanRecord(req, res);
    } catch (error) {
        console.error("Error in deleteshahidjawanRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
