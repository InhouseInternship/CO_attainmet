const express = require("express");
const router = express.Router();
const sheetinfoController = require("../controllers/sheetinfoController.js");
const sheetdataController = require("../controllers/sheetdataController.js");

// SheetInfo Routes
router.post("/sheetinfo", sheetinfoController.createSheetInfo);
router.get("/sheetinfo", sheetinfoController.getAllSheetInfo);

// SheetData Routes
router.post("/sheetdata", sheetdataController.createSheetData);
router.get("/sheetdata", sheetdataController.getAllSheetData);

module.exports = router;
