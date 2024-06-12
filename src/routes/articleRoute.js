const express = require("express");
const { body } = require("express-validator");
const {
  getarticleRecord,
  createarticleRecord,
  updatearticleRecord,
  deletearticleRecord,
} = require("../controllers/articleController");
const multer = require("multer");
const { upload } = require("../controllers/articleController");
const verifyToken = require("../JWT/auth");

const router = express.Router();

router.get("/find", verifyToken, async (req, res) => {
    try {
        await getarticleRecord(req, res);
    } catch (error) {
        console.error("Error in getarticleRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
router.get("/get", async (req, res) => {
    try {
        await getarticleRecord(req, res);
    } catch (error) {
        console.error("Error in getarticleRecord:", error);
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
            await createarticleRecord(req, res);
        } catch (error) {
            console.error("Error in createarticleRecord:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
);


router.put("/put/:id", verifyToken,
    upload.fields([{ name: 'imageUrl', maxCount: 1 }]),
    async (req, res) => {
        try {
            await updatearticleRecord(req, res);
        } catch (error) {
            console.error("Error in updatearticleRecord:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
);

router.delete("/delete/:id", verifyToken, async (req, res) => {
    try {
        await deletearticleRecord(req, res);
    } catch (error) {
        console.error("Error in deletearticleRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
