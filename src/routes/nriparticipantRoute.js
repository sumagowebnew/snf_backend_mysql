const express = require("express");
const { body } = require("express-validator");
const {
  getnriparticipantRecord,
  createnriparticipantRecord,
  updatenriparticipantRecord,
  deletenriparticipantRecord,
} = require("../controllers/nriparticipantController");
const multer = require("multer");
const { upload } = require("../controllers/nriparticipantController");
const verifyToken = require("../JWT/auth");

const router = express.Router();

router.get("/find", verifyToken, async (req, res) => {
    try {
        await getnriparticipantRecord(req, res);
    } catch (error) {
        console.error("Error in getnriparticipantRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
router.get("/get", async (req, res) => {
    try {
        await getnriparticipantRecord(req, res);
    } catch (error) {
        console.error("Error in getnriparticipantRecord:", error);
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
            await createnriparticipantRecord(req, res);
        } catch (error) {
            console.error("Error in createnriparticipantRecord:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
);


router.put("/update/:id", verifyToken,
    upload.fields([{ name: 'imageUrl', maxCount: 1 }]),
    async (req, res) => {
        try {
            await updatenriparticipantRecord(req, res);
        } catch (error) {
            console.error("Error in updatenriparticipantRecord:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
);

router.delete("/delete/:id", verifyToken, async (req, res) => {
    try {
        await deletenriparticipantRecord(req, res);
    } catch (error) {
        console.error("Error in deletenriparticipantRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
