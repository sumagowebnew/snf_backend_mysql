const express = require("express");
const { body } = require("express-validator");
const {
  getstateparticipantRecord,
  createstateparticipantRecord,
  updatestateparticipantRecord,
  deletestateparticipantRecord,
} = require("../controllers/stateparticipantController");
const multer = require("multer");
const { upload } = require("../controllers/stateparticipantController");
const verifyToken = require("../JWT/auth");

const router = express.Router();

router.get("/find", verifyToken, async (req, res) => {
    try {
        await getstateparticipantRecord(req, res);
    } catch (error) {
        console.error("Error in getstateparticipantRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
router.get("/get", async (req, res) => {
    try {
        await getstateparticipantRecord(req, res);
    } catch (error) {
        console.error("Error in getstateparticipantRecord:", error);
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
            await createstateparticipantRecord(req, res);
        } catch (error) {
            console.error("Error in createstateparticipantRecord:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
);


router.put("/put/:id", verifyToken,
    upload.fields([{ name: 'imageUrl', maxCount: 1 }]),
    async (req, res) => {
        try {
            await updatestateparticipantRecord(req, res);
        } catch (error) {
            console.error("Error in updatestateparticipantRecord:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
);

router.delete("/delete/:id", verifyToken, async (req, res) => {
    try {
        await deletestateparticipantRecord(req, res);
    } catch (error) {
        console.error("Error in deletestateparticipantRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
