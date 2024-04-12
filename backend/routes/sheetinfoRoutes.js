const express = require("express");
const router = express.Router();
const sheetinfoController = require("../controllers/sheetinfoController.js");

// POST - Create a new sheet info entry
router.post("/sheetinfo", sheetinfoController.createSheetInfo);

// GET - Get all sheet info entries
router.get("/sheetinfo", sheetinfoController.getAllSheetInfo);

module.exports = router;
