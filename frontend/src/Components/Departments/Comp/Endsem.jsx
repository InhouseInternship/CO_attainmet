import React, { useState, useEffect } from 'react';
import './Comp.css'; // Make sure to create an ExcelSum.css file for styling
import * as XLSX from 'xlsx';
import Excelsheet from './Excelsheet'

function ExcelSum() {
  const [data, setData] = useState([]);
  const [sum, setSum] = useState(0);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [distinctionPercentage, setDistinctionPercentage] = useState(0);
  const [firstClassPercentage, setFirstClassPercentage] = useState(0);
  const [passPercentage, setPassPercentage] = useState(0);
  const [columnName, setColumnName] = useState("");
  const [insemattenment, setInsemattainment] = useState(0);

  useEffect(() => {
    // Check if there is previously calculated data in local storage
    const storedData = JSON.parse(localStorage.getItem('excelData'));

    if (storedData) {
      setData(storedData.data);
      setSum(storedData.sum);
      setDistinctionPercentage(storedData.distinctionPercentage);
      setFirstClassPercentage(storedData.firstClassPercentage);
      setPassPercentage(storedData.passPercentage);
      setColumnName(storedData.columnName);
      setInsemattainment(storedData.insemattenment);
      setFileUploaded(true);
    }
  }, []);

  const handleFileUpload = (e) => {
    setFileUploaded(false); // Reset file upload state
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
      setData(data);
      // Calculate sum of the second column (index 1)
      const sum = data.reduce((acc, row) => acc + (parseFloat(row[1]) || 0), 0);
      setSum(sum);

      let d = 0;
      let f = 0;
      let p = 0;
      const topValue = data[0][1];
      setColumnName(topValue);
      const t1 = topValue * 0.75;
      const t2 = topValue * 0.6;
      const t3 = topValue * 0.4;
      data.forEach((row, index) => {
        if (index !== 0) { // Skip the header row
          const cellValue = parseFloat(row[1]); // Assuming the score is in the second column
          if (!isNaN(cellValue) && cellValue >= t1) d++; // 75% threshold
          if (!isNaN(cellValue) && cellValue >= t2) f++;
          if (!isNaN(cellValue) && cellValue >= t3) p++;
        }
      });

      const totalStudents = data.length - 1; // Exclude header row
      const dPercentage = (d / totalStudents) * 100;
      const fPercentage = (f / totalStudents) * 100;
      const pPercentage = (p / totalStudents) * 100;
      setDistinctionPercentage(dPercentage);
      setFirstClassPercentage(fPercentage);
      setPassPercentage(pPercentage);
      const finalatt = ((dPercentage * 1 + fPercentage * 2 + pPercentage * 3) / 600) * 0.3;
    //   <Excelsheet data={finalatt !== null ? finalatt : 10} />
    <Excelsheet data={"hi"}></Excelsheet>
      setInsemattainment(finalatt);

      // Save the calculated data to local storage
      const excelData = {
        data,
        sum,
        distinctionPercentage,
        firstClassPercentage,
        passPercentage,
        columnName,
        insemattenment: finalatt
      };
      localStorage.setItem('excelData', JSON.stringify(excelData));

      setFileUploaded(true); // Set file upload state to true
    };
    reader.readAsBinaryString(file);
  };

  return (
    <div className="excel-sum">
      <input type="file" accept='.xlsx,.xls' onChange={handleFileUpload} />
      <div>Sum of scores: {sum}</div>
      {fileUploaded && (
        <div className="results">
          <p>Percentage of students with scores above 75%: {distinctionPercentage.toFixed(2)}%</p>
          <p>Percentage of students with scores above 60%: {firstClassPercentage.toFixed(2)}%</p>
          <p>Percentage of students with scores above 40%: {passPercentage.toFixed(2)}%</p>
          {/* <p>Value at the top of the column: {columnName}</p> */}
          <p>points obtained for insem out of 0.3: {insemattenment.toFixed(2)}</p>
         
        </div>
      )}
    </div>
  );
}

export default ExcelSum;
