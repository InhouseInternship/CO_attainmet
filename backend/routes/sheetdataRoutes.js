const express = require("express");
const router = express.Router();
const sheetdataController = require("../controllers/sheetdataController.js");

// POST - Create a new sheet data entry
router.post("/sheetdata", sheetdataController.createSheetData);

// GET - Get all sheet data entries
router.get("/sheetdata", sheetdataController.getAllSheetData);

module.exports = router;
