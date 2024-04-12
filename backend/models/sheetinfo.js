const mongoose = require("mongoose");

const sheetinfoSchema = new mongoose.Schema(
  {
    academicYear: { 
        type: Number, 
        required: true 
    }, 
    studyingYear: { 
        type: String, 
        required: true 
    }, 
    branch: { 
        type: String ,
        required: function() {
            return this.studyingYear !== "First Year";
          }
    },
    division: { 
        type: String, 
        required: true 
    }, 
    subject: { 
        type: String, 
        required: true 
    }, 
    Sheet_values: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'sheetdata',
    } 
  },
  { timestamps: false }
); 

module.exports = mongoose.model("sheetinfo", sheetinfoSchema);
