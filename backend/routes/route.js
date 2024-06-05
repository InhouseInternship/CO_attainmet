const express = require("express");
const router = express.Router();
const sheetinfoController = require("../controllers/sheetinfoController.js");
const sheetdataController = require("../controllers/sheetdataController.js");
// const { getSheetValuesId } = require('../controllers/sheetinfoController.js');
// const app = express();
// SheetInfo Routes
router.post("/sheetinfo", sheetinfoController.createSheetInfo);
router.get("/sheetinfo/:id", sheetinfoController.getSheetValueById); 
router.get("/sheetinfo", sheetinfoController.getAllSheetInfo);
router.put("/sheetinfo/:id", sheetinfoController.updateSheetValuesById);



// SheetData Routes
router.post("/sheetdata", sheetdataController.createSheetData);
// router.get("/sheetdata", sheetdataController.getAllSheetData);
router.put("/sheetdata/:id", sheetdataController.updateSheetValuesById);
router.get("/sheetdata/:id", sheetdataController.getSheetDataById);

module.exports = router;
