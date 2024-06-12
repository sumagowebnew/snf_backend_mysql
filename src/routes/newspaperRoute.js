const express = require("express");
const { body } = require("express-validator");
const {
  getnewspaperRecord,
  createnewspaperRecord,
  updatenewspaperRecord,
  deletenewspaperRecord,
} = require("../controllers/newspaperController");
const multer = require("multer");
const { upload } = require("../controllers/newspaperController");
const verifyToken = require("../JWT/auth");

const router = express.Router();

router.get("/find", verifyToken, async (req, res) => {
    try {
        await getnewspaperRecord(req, res);
    } catch (error) {
        console.error("Error in getnewspaperRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
router.get("/get", async (req, res) => {
    try {
        await getnewspaperRecord(req, res);
    } catch (error) {
        console.error("Error in getnewspaperRecord:", error);
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
            await createnewspaperRecord(req, res);
        } catch (error) {
            console.error("Error in createnewspaperRecord:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
);


router.put("/update/:id", verifyToken,
    upload.fields([{ name: 'imageUrl', maxCount: 1 }]),
    async (req, res) => {
        try {
            await updatenewspaperRecord(req, res);
        } catch (error) {
            console.error("Error in updatenewspaperRecord:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
);

router.delete("/delete/:id", verifyToken, async (req, res) => {
    try {
        await deletenewspaperRecord(req, res);
    } catch (error) {
        console.error("Error in deletenewspaperRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
