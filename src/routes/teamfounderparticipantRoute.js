const express = require("express");
const { body } = require("express-validator");
const {
  getteamfounderparticipantRecord,
  createteamfounderparticipantRecord,
  updateteamfounderparticipantRecord,
  deleteteamfounderparticipantRecord,
} = require("../controllers/teamfounderparticipantController");
const multer = require("multer");
const { upload } = require("../controllers/teamfounderparticipantController");
const verifyToken = require("../JWT/auth");

const router = express.Router();

router.get("/find", verifyToken, async (req, res) => {
    try {
        await getteamfounderparticipantRecord(req, res);
    } catch (error) {
        console.error("Error in getteamfounderparticipantRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
router.get("/get", async (req, res) => {
    try {
        await getteamfounderparticipantRecord(req, res);
    } catch (error) {
        console.error("Error in getteamfounderparticipantRecord:", error);
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
            await createteamfounderparticipantRecord(req, res);
        } catch (error) {
            console.error("Error in createteamfounderparticipantRecord:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
);


router.put("/update/:id", verifyToken,
    upload.fields([{ name: 'imageUrl', maxCount: 1 }]),
    async (req, res) => {
        try {
            await updateteamfounderparticipantRecord(req, res);
        } catch (error) {
            console.error("Error in updateteamfounderparticipantRecord:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
);

router.delete("/delete/:id", verifyToken, async (req, res) => {
    try {
        await deleteteamfounderparticipantRecord(req, res);
    } catch (error) {
        console.error("Error in deleteteamfounderparticipantRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
