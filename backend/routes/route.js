const express = require("express");
const router = express.Router();
const sheetinfoController = require("../controllers/sheetinfoController.js");
const sheetdataController = require("../controllers/sheetdataController.js");
// const { getSheetValuesId } = require('../controllers/sheetinfoController.js');
// const app = express();
// SheetInfo Routes
router.post("/sheetinfo", sheetinfoController.createSheetInfo);
router.get("/sheetinfo", sheetinfoController.getAllSheetInfo);
// Updated route for fetching Sheet_values ObjectId
router.get("/sheetinfo/:academicYear/:studyingYear/:branch/:division/:subject", sheetinfoController.getSheetValuesId);

// SheetData Routes
router.post("/sheetdata", sheetdataController.createSheetData);
router.get("/sheetdata", sheetdataController.getAllSheetData);

module.exports = router;
