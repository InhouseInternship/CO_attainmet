const SheetData = require("../models/sheetdata.js");

// Create a new sheet data entry
exports.createSheetData = async (req, res) => {
  try {
    const {
      UT,
      UT2,
      Insem,
      Endsem,
      midterm_att,
      direct_att,
      final_att,
    } = req.body;

    const newSheetData = new SheetData({
      UT,
      UT2,
      Insem,
      Endsem,
      midterm_att,
      direct_att,
      final_att,
    });

    await newSheetData.save();

    res.status(201).json({ message: "Sheet data created successfully", sheetData: newSheetData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create sheet data" });
  }
};

// Get all sheet data entries
exports.getAllSheetData = async (req, res) => {
  try {
    const sheetData = await SheetData.find();
    res.status(200).json(sheetData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch sheet data" });
  }
};
