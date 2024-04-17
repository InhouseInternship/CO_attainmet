const SheetInfo = require("../models/sheetinfo.js");

// Create a new sheet info entry
exports.createSheetInfo = async (req, res) => {
  try {
    const {
      academicYear,
      studyingYear,
      branch,
      division,
      subject,
      Sheet_values,
    } = req.body;

    const newSheetInfo = new SheetInfo({
      academicYear,
      studyingYear,
      branch,
      division,
      subject,
      Sheet_values,
    });

    await newSheetInfo.save();
    
    res.status(201).json({ message: "Sheet info created successfully", sheetInfo: newSheetInfo });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create sheet info" });
  }
};

// Get all sheet info entries
exports.getAllSheetInfo = async (req, res) => {
  try {
    const sheetInfo = await SheetInfo.find();
    res.status(200).json(sheetInfo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch sheet info" });
  }
};

// Get Sheet_values ObjectId based on parameters
exports.getSheetValuesId = async (req, res) => {
  console.log("hdhdjd");
  try {
    const { academicYear, studyingYear, branch, division, subject } = req.params;
    
    console.log("Params:", academicYear, studyingYear, branch, division, subject);

    // Find the sheet info with the provided parameters
    const sheetInfo = await SheetInfo.findOne({
      academicYear: academicYear,
      studyingYear: studyingYear,
      branch: branch,
      division: division,
      subject: subject
    });

    console.log("SheetInfo:", sheetInfo);

    if (!sheetInfo) {
      return res.status(404).json({ error: "Sheet_info not found" });
    }

    res.status(200).json({ Sheet_values: sheetInfo.Sheet_values });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch Sheet_values ObjectId" });
  }
};