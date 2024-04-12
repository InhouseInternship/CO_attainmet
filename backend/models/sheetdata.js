const mongoose = require("mongoose");

const sheetDataSchema = new mongoose.Schema({
  UT: {
    type: Number,
  },
  UT2: {
    type: Number,
  },
  Insem: {
    type: Number,
  },
  Endsem: {
    type: Number,
  },
  midterm_att: {
    type: Number,
  },
  direct_att: {
    type: Number,
  },
  final_att: {
    type: Number,
  },
});

const SheetData = mongoose.model("SheetData", sheetDataSchema);

module.exports = SheetData;
