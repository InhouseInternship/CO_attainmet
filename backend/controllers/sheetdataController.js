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

    const savedSheetInfo = await newSheetData.save();
    const savedSheetInfoId = savedSheetInfo._id;
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

exports.updateSheetValuesById = async (req, res) => {
  const { id } = req.params;
  const { fieldName, fieldValue } = req.body;
  // console.log('ID:', id);
  // console.log('Field Name:', req.body.data.fieldName);
  // console.log('Field Value:', req.body.data.fieldValue);
  // console.log('Request Body:', req.body);

  // console.log('Update Fields:', updateFields);
  
  try {
    // Construct the update object dynamically based on fieldName and fieldValue
    const updateFields = {};
    updateFields[fieldName] = fieldValue;

    const updatedSheetData = await SheetData.findByIdAndUpdate(id, updateFields, { new: true });

    if (!updatedSheetData) {
      return res.status(404).json({ message: "Sheet info not found" });
    }

    res.status(200).json({ message: `Sheet info updated successfully for field ${fieldName}`, sheetdata: updatedSheetData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update sheet info" });
  }
};
exports.getSheetDataById = async (req, res) => {
  const { id } = req.params;
  try {
    console.log("in");
    const sheetData = await SheetData.findById(id);
    if (!sheetData) {
      return res.status(404).json({ message: "Sheet data not found" });
    }
    res.status(200).json(sheetData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch sheet data" });
  }
};