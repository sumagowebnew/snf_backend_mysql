const express = require("express");
const { body } = require("express-validator");
const {
  getsportprojectRecord,
  createsportprojectRecord,
  updatesportprojectRecord,
  deletesportprojectRecord,
} = require("../controllers/sportprojectController");
const multer = require("multer");
const { upload } = require("../controllers/sportprojectController");
const verifyToken = require("../JWT/auth");

const router = express.Router();

router.get("/find", verifyToken, async (req, res) => {
    try {
        await getsportprojectRecord(req, res);
    } catch (error) {
        console.error("Error in getsportprojectRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
router.get("/get", async (req, res) => {
    try {
        await getsportprojectRecord(req, res);
    } catch (error) {
        console.error("Error in getsportprojectRecord:", error);
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
            await createsportprojectRecord(req, res);
        } catch (error) {
            console.error("Error in createsportprojectRecord:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
);


router.put("/put/:id", verifyToken,
    upload.fields([{ name: 'imageUrl', maxCount: 1 }]),
    async (req, res) => {
        try {
            await updatesportprojectRecord(req, res);
        } catch (error) {
            console.error("Error in updatesportprojectRecord:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
);

router.delete("/delete/:id", verifyToken, async (req, res) => {
    try {
        await deletesportprojectRecord(req, res);
    } catch (error) {
        console.error("Error in deletesportprojectRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
