const express = require("express");
const { body } = require("express-validator");
const {
  getupcomingeventsRecord,
  createupcomingeventsRecord,
  updateupcomingeventsRecord,
  deleteupcomingeventsRecord,
} = require("../controllers/upcomingeventsControler");
const multer = require("multer");
const { upload } = require("../controllers/upcomingeventsControler");
const verifyToken = require("../JWT/auth");

const router = express.Router();

router.get("/find", verifyToken, async (req, res) => {
    try {
        await getupcomingeventsRecord(req, res);
    } catch (error) {
        console.error("Error in getupcomingeventsRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
router.get("/get", async (req, res) => {
    try {
        await getupcomingeventsRecord(req, res);
    } catch (error) {
        console.error("Error in getupcomingeventsRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post('/post', verifyToken,
    upload.fields([{ name: 'imageUrl', maxCount: 1 }]),
    [
        body('ProjectTitle').notEmpty().withMessage('Name cannot be empty'),
        body('Paragraph	').notEmpty().withMessage('Name cannot be empty'),
          ],
    async (req, res) => {
        try {
            await createupcomingeventsRecord(req, res);
        } catch (error) {
            console.error("Error in createupcomingeventsRecord:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
);


router.put("/put/:id", verifyToken,
    upload.fields([{ name: 'imageUrl', maxCount: 1 }]),
    async (req, res) => {
        try {
            await updateupcomingeventsRecord(req, res);
        } catch (error) {
            console.error("Error in updateupcomingeventsRecord:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
);

router.delete("/delete/:id", verifyToken, async (req, res) => {
    try {
        await deleteupcomingeventsRecord(req, res);
    } catch (error) {
        console.error("Error in deleteupcomingeventsRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
