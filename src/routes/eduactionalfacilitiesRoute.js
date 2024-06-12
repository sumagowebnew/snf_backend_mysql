const express = require("express");
const { body } = require("express-validator");
const {
  geteduactionalfacilitiesRecord,
  createeduactionalfacilitiesRecord,
  updateeduactionalfacilitiesRecord,
  deleteeduactionalfacilitiesRecord,
} = require("../controllers/eduactionalfacilitiesController");
const multer = require("multer");
const { upload } = require("../controllers/eduactionalfacilitiesController");
const verifyToken = require("../JWT/auth");

const router = express.Router();

router.get("/find", verifyToken, async (req, res) => {
    try {
        await geteduactionalfacilitiesRecord(req, res);
    } catch (error) {
        console.error("Error in geteduactionalfacilitiesRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
router.get("/get", async (req, res) => {
    try {
        await geteduactionalfacilitiesRecord(req, res);
    } catch (error) {
        console.error("Error in geteduactionalfacilitiesRecord:", error);
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
            await createeduactionalfacilitiesRecord(req, res);
        } catch (error) {
            console.error("Error in createeduactionalfacilitiesRecord:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
);


router.put("/update/:id", verifyToken,
    upload.fields([{ name: 'imageUrl', maxCount: 1 }]),
    async (req, res) => {
        try {
            await updateeduactionalfacilitiesRecord(req, res);
        } catch (error) {
            console.error("Error in updateeduactionalfacilitiesRecord:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
);

router.delete("/delete/:id", verifyToken, async (req, res) => {
    try {
        await deleteeduactionalfacilitiesRecord(req, res);
    } catch (error) {
        console.error("Error in deleteeduactionalfacilitiesRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
