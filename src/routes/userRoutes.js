const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/login", async (req, res) => {
    try {
        await userController.loginUser(req, res);
    } catch (error) {
        console.error("Error in loginUser:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
