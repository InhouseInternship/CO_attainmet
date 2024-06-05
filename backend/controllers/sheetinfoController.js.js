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
    console.log("yes");
    const savedSheetInfo = await newSheetInfo.save();
    const savedSheetInfoId = savedSheetInfo._id;
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
exports.getSheetValueById = async (req,res) =>{
  const{id} = req.params;
  try{
    const doc = await SheetInfo.findById(id);
    if(doc){
      res.json({ Sheet_value : doc.Sheet_values});
    }
    else{
      res.status(404).json({ message: "Document not found" });
    }
  }catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
}
};
exports.updateSheetValuesById = async (req, res) => {
  const { id } = req.params;
  const { Sheet_values } = req.body;

  try {
    const updatedSheetInfo = await SheetInfo.findByIdAndUpdate(id, { Sheet_values }, { new: true });

    if (!updatedSheetInfo) {
      return res.status(404).json({ message: "Sheet info not found" });
    }

    res.status(200).json({ message: "Sheet info updated successfully", sheetInfo: updatedSheetInfo });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update sheet info" });
  }
};




