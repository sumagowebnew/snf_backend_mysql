const express = require("express");
const { body } = require("express-validator");
const {
  getwellwisherRecord,
  createwellwisherRecord,
  updatewellwisherRecord,
  deletewellwisherRecord,
} = require("../controllers/nationwidesupport");
const multer = require("multer");
const { upload } = require("../controllers/nationwidesupport");
const verifyToken = require("../JWT/auth");

const router = express.Router();

router.get("/find", verifyToken, async (req, res) => {
    try {
        await getwellwisherRecord(req, res);
    } catch (error) {
        console.error("Error in getwellwisherRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
router.get("/get", async (req, res) => {
    try {
        await getwellwisherRecord(req, res);
    } catch (error) {
        console.error("Error in getwellwisherRecord:", error);
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
            await createwellwisherRecord(req, res);
        } catch (error) {
            console.error("Error in createwellwisherRecord:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
);


router.put("/put/:id", verifyToken,
    upload.fields([{ name: 'imageUrl', maxCount: 1 }]),
    async (req, res) => {
        try {
            await updatewellwisherRecord(req, res);
        } catch (error) {
            console.error("Error in updatewellwisherRecord:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
);

router.delete("/delete/:id", verifyToken, async (req, res) => {
    try {
        await deletewellwisherRecord(req, res);
    } catch (error) {
        console.error("Error in deletewellwisherRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
