const express = require("express");
const { body } = require("express-validator");
const {
  getupcomingeventstitleRecord,
  createupcomingeventstitleRecord,
  updateupcomingeventstitleRecord,
  deleteupcomingeventstitleRecord,
} = require("../controllers/upcomingeventstitleController");
const { upload } = require("../controllers/upcomingeventstitleController");
const verifyToken = require("../JWT/auth");

const router = express.Router();

router.get("/find", verifyToken, async (req, res) => {
    try {
        await getupcomingeventstitleRecord(req, res);
    } catch (error) {
        console.error("Error in getupcomingeventstitleRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
router.get("/get", async (req, res) => {
    try {
        await getupcomingeventstitleRecord(req, res);
    } catch (error) {
        console.error("Error in getupcomingeventstitleRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post('/post', verifyToken,
    [
        body('name').notEmpty().withMessage('name cannot be empty'),
      
          ],
    async (req, res) => {
        try {
            await createupcomingeventstitleRecord(req, res);
        } catch (error) {
            console.error("Error in createupcomingeventstitleRecord:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
);


router.put("/put/:id", verifyToken,
    upload.fields([{ name: 'imageUrl', maxCount: 1 }]),
    async (req, res) => {
        try {
            await updateupcomingeventstitleRecord(req, res);
        } catch (error) {
            console.error("Error in updateupcomingeventstitleRecord:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
);

router.delete("/delete/:id", verifyToken, async (req, res) => {
    try {
        await deleteupcomingeventstitleRecord(req, res);
    } catch (error) {
        console.error("Error in deleteupcomingeventstitleRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
