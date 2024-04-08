import React, { useState } from 'react';
import * as XLSX from 'xlsx';

function ExcelSum() {
  const [sum, setSum] = useState(0);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      // Parse data
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      // Get first worksheet
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      // Convert array of arrays
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      // Sum the second column (index 1)
      const sum = data.reduce((acc, row) => acc + (parseFloat(row[1]) || 0), 0);
      setSum(sum);
    };
    reader.readAsBinaryString(file);
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      <div>Sum of second column of entc: {sum}</div>
    </div>
  );
}

export default ExcelSum;
