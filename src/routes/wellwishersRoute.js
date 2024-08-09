const express = require("express");
const { body } = require("express-validator");
const {
  getwellwishersRecord,
  createwellwishersRecord,
  updatewellwishersRecord,
  deletewellwishersRecord,
} = require("../controllers/wellwishersController");
const multer = require("multer");
const { upload } = require("../controllers/wellwishersController");
const verifyToken = require("../JWT/auth");

const router = express.Router();

router.get("/find", verifyToken, async (req, res) => {
    try {
        await getwellwishersRecord(req, res);
    } catch (error) {
        console.error("Error in getwellwishersRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
router.get("/get", async (req, res) => {
    try {
        await getwellwishersRecord(req, res);
    } catch (error) {
        console.error("Error in getwellwishersRecord:", error);
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
            await createwellwishersRecord(req, res);
        } catch (error) {
            console.error("Error in createwellwishersRecord:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
);


router.put("/put/:id", verifyToken,
    upload.fields([{ name: 'imageUrl', maxCount: 1 }]),
    async (req, res) => {
        try {
            await updatewellwishersRecord(req, res);
        } catch (error) {
            console.error("Error in updatewellwishersRecord:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
);

router.delete("/delete/:id", verifyToken, async (req, res) => {
    try {
        await deletewellwishersRecord(req, res);
    } catch (error) {
        console.error("Error in deletewellwishersRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
