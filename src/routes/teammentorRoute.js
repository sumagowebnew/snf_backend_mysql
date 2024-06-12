const express = require("express");
const { body } = require("express-validator");
const {
  getteammentorRecord,
  createteammentorRecord,
  updateteammentorRecord,
  deleteteammentorRecord,
} = require("../controllers/teammentorController");
const multer = require("multer");
const { upload } = require("../controllers/teammentorController");
const verifyToken = require("../JWT/auth");

const router = express.Router();

router.get("/find", verifyToken, async (req, res) => {
    try {
        await getteammentorRecord(req, res);
    } catch (error) {
        console.error("Error in getteammentorRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
router.get("/get", async (req, res) => {
    try {
        await getteammentorRecord(req, res);
    } catch (error) {
        console.error("Error in getteammentorRecord:", error);
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
            await createteammentorRecord(req, res);
        } catch (error) {
            console.error("Error in createteammentorRecord:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
);


router.put("/put/:id", verifyToken,
    upload.fields([{ name: 'imageUrl', maxCount: 1 }]),
    async (req, res) => {
        try {
            await updateteammentorRecord(req, res);
        } catch (error) {
            console.error("Error in updateteammentorRecord:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
);

router.delete("/delete/:id", verifyToken, async (req, res) => {
    try {
        await deleteteammentorRecord(req, res);
    } catch (error) {
        console.error("Error in deleteteammentorRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
