const express = require("express");
const { body } = require("express-validator");
const {
  gethome4cardsRecord,
  createhome4cardsRecord,
  updatehome4cardsRecord,
  deletehome4cardsRecord,
} = require("../controllers/home4cardsController");
const multer = require("multer");
const { upload } = require("../controllers/home4cardsController");
const verifyToken = require("../JWT/auth");

const router = express.Router();

router.get("/find", verifyToken, async (req, res) => {
    try {
        await gethome4cardsRecord(req, res);
    } catch (error) {
        console.error("Error in gethome4cardsRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
router.get("/get", async (req, res) => {
    try {
        await gethome4cardsRecord(req, res);
    } catch (error) {
        console.error("Error in gethome4cardsRecord:", error);
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
            await createhome4cardsRecord(req, res);
        } catch (error) {
            console.error("Error in createhome4cardsRecord:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
);


router.put("/put/:id", verifyToken,
    upload.fields([{ name: 'imageUrl', maxCount: 1 }]),
    async (req, res) => {
        try {
            await updatehome4cardsRecord(req, res);
        } catch (error) {
            console.error("Error in updatehome4cardsRecord:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
);

router.delete("/delete/:id", verifyToken, async (req, res) => {
    try {
        await deletehome4cardsRecord(req, res);
    } catch (error) {
        console.error("Error in deletehome4cardsRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
