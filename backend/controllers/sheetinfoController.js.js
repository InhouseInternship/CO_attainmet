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
      examType,
      excelData,
    } = req.body;

    const newSheetInfo = new SheetInfo({
      academicYear,
      studyingYear,
      branch,
      division,
      subject,
      examType,
      excelData,
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
