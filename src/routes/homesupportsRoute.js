const express = require("express");
const { body } = require("express-validator");
const {
  gethomesupportsRecord,
  createhomesupportsRecord,
  updatehomesupportsRecord,
  deletehomesupportsRecord,
} = require("../controllers/homesupportsController");
const multer = require("multer");
const { upload } = require("../controllers/homesupportsController");
const verifyToken = require("../JWT/auth");

const router = express.Router();

router.get("/find", verifyToken, async (req, res) => {
    try {
        await gethomesupportsRecord(req, res);
    } catch (error) {
        console.error("Error in gethomesupportsRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
router.get("/get", async (req, res) => {
    try {
        await gethomesupportsRecord(req, res);
    } catch (error) {
        console.error("Error in gethomesupportsRecord:", error);
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
            await createhomesupportsRecord(req, res);
        } catch (error) {
            console.error("Error in createhomesupportsRecord:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
);


router.put("/put/:id", verifyToken,
    upload.fields([{ name: 'imageUrl', maxCount: 1 }]),
    async (req, res) => {
        try {
            await updatehomesupportsRecord(req, res);
        } catch (error) {
            console.error("Error in updatehomesupportsRecord:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
);

router.delete("/delete/:id", verifyToken, async (req, res) => {
    try {
        await deletehomesupportsRecord(req, res);
    } catch (error) {
        console.error("Error in deletehomesupportsRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
