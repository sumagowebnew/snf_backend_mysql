const express = require("express");
const { body } = require("express-validator");
const {
  getcontactRecord,
  createcontactRecord,
  updatecontactRecord,
  deletecontactRecord,
} = require("../controllers/contactController");
const { upload } = require("../controllers/contactController");
const verifyToken = require("../JWT/auth");

const router = express.Router();

router.get("/find", verifyToken, async (req, res) => {
    try {
        await getcontactRecord(req, res);
    } catch (error) {
        console.error("Error in getcontactRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
router.get("/get", async (req, res) => {
    try {
        await getcontactRecord(req, res);
    } catch (error) {
        console.error("Error in getcontactRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post('/create', verifyToken,
    [
        body('name').notEmpty().withMessage('Name cannot be empty'),
        body('email').notEmpty().withMessage('email cannot be empty'),
        body('contact').notEmpty().withMessage('contact cannot be empty'),
        body('subject').notEmpty().withMessage('subject cannot be empty'),
        body('message').notEmpty().withMessage('message cannot be empty'),
          ],
    async (req, res) => {
        try {
            await createcontactRecord(req, res);
        } catch (error) {
            console.error("Error in createcontactRecord:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
);


router.put("/update/:id", verifyToken,
    upload.fields([{ name: 'imageUrl', maxCount: 1 }]),
    async (req, res) => {
        try {
            await updatecontactRecord(req, res);
        } catch (error) {
            console.error("Error in updatecontactRecord:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
);

router.delete("/delete/:id", verifyToken, async (req, res) => {
    try {
        await deletecontactRecord(req, res);
    } catch (error) {
        console.error("Error in deletecontactRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
