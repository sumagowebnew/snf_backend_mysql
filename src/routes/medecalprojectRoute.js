const express = require("express");
const { body } = require("express-validator");
const {
  getmedecalprojectRecord,
  createmedecalprojectRecord,
  updatemedecalprojectRecord,
  deletemedecalprojectRecord,
} = require("../controllers/medecalprojectController");
const multer = require("multer");
const { upload } = require("../controllers/medecalprojectController");
const verifyToken = require("../JWT/auth");

const router = express.Router();

router.get("/find", verifyToken, async (req, res) => {
    try {
        await getmedecalprojectRecord(req, res);
    } catch (error) {
        console.error("Error in getmedecalprojectRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
router.get("/get", async (req, res) => {
    try {
        await getmedecalprojectRecord(req, res);
    } catch (error) {
        console.error("Error in getmedecalprojectRecord:", error);
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
            await createmedecalprojectRecord(req, res);
        } catch (error) {
            console.error("Error in createmedecalprojectRecord:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
);


router.put("/put/:id", verifyToken,
    upload.fields([{ name: 'imageUrl', maxCount: 1 }]),
    async (req, res) => {
        try {
            await updatemedecalprojectRecord(req, res);
        } catch (error) {
            console.error("Error in updatemedecalprojectRecord:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
);

router.delete("/delete/:id", verifyToken, async (req, res) => {
    try {
        await deletemedecalprojectRecord(req, res);
    } catch (error) {
        console.error("Error in deletemedecalprojectRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
