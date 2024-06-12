const express = require("express");
const { body } = require("express-validator");
const {
  gethome2cardsRecord,
  createhome2cardsRecord,
  updatehome2cardsRecord,
  deletehome2cardsRecord,
} = require("../controllers/home2cardsController");
const multer = require("multer");
const { upload } = require("../controllers/home2cardsController");
const verifyToken = require("../JWT/auth");

const router = express.Router();

router.get("/find", verifyToken, async (req, res) => {
    try {
        await gethome2cardsRecord(req, res);
    } catch (error) {
        console.error("Error in gethome2cardsRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
router.get("/get", async (req, res) => {
    try {
        await gethome2cardsRecord(req, res);
    } catch (error) {
        console.error("Error in gethome2cardsRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post('/post', verifyToken,
    upload.fields([{ name: 'imageUrl', maxCount: 1 }]),
    [
        body('name').notEmpty().withMessage('Name cannot be empty'),
        body('para').notEmpty().withMessage('Name cannot be empty'),
          ],
    async (req, res) => {
        try {
            await createhome2cardsRecord(req, res);
        } catch (error) {
            console.error("Error in createhome2cardsRecord:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
);


router.put("/put/:id", verifyToken,
    upload.fields([{ name: 'imageUrl', maxCount: 1 }]),
    async (req, res) => {
        try {
            await updatehome2cardsRecord(req, res);
        } catch (error) {
            console.error("Error in updatehome2cardsRecord:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
);

router.delete("/delete/:id", verifyToken, async (req, res) => {
    try {
        await deletehome2cardsRecord(req, res);
    } catch (error) {
        console.error("Error in deletehome2cardsRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
