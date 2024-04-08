import React, { useState } from 'react';
import * as XLSX from 'xlsx';

function ExcelSum() {
  const [data, setData] = useState([]);
  const [sum, setSum] = useState(0);
  const [fileUploaded, setFileUploaded] = useState(false); // State to track file upload
  const [userInput, setUserInput] = useState({ c1: 0, c2: 0, c3: 0 });
  const [comparisonResult, setComparisonResult] = useState({ d: false, p: false, f: false });
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
      setFileUploaded(true); // Set file upload state to true
    };
    reader.readAsBinaryString(file);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInput(prevInputs => ({
      ...prevInputs,
      [name]: parseInt(value, 10)
    }));
  };
  const compareInputs = () => {
    // Assuming you have the percentages calculated somewhere in your component
    // const percentages = { greaterThan20: 30, greaterThan15: 50, greaterThan10: 70 }; // Example percentages
    // const comparisonResults = Object.keys(userInput).map(key => {
    //   return userInput[key] > percentages[key];
    // }
    // );
    let d=0;
    let p=0;
    let f=0;
    for (let i = 0; i < data.length; i++) {
      const cellValue = data[i][2];
      if (cellValue >= (30*75)/100) {
        d++;
      } else if (cellValue >=(30*60)/100) {
        p++;
      } else if(cellValue >=(30*40)/100){
        f++;
      }
    }

    d = d * 100 / data.length;
    p = p * 100 / data.length;
    f = f * 100 / data.length;

    setComparisonResult({
      d: d > userInput.c1,
      p: p > userInput.c2,
      f: f > userInput.c3
    });

      
    // Do something with comparisonResults, like setting state or displaying them
  };
  return (
    <div className='abc'>
      <input type="file" accept='.xlsx,.xls' onChange={handleFileUpload} />
      {/* Conditionally render the sum line based on file upload */}
      {fileUploaded && (
        <>
        <div>Sum of second column: {sum}</div>
        <div>
          <h3>CO1</h3>
          <label htmlFor="c1">Enter value for c1:</label>
          <input id="c1" name="c1" type="number" onChange={handleInputChange} ></input>
        </div>
        <div>
            <label htmlFor="c2">Enter value for c2:</label>
            <input id="c2" name="c2" type="number" onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="c3">Enter value for c3:</label>
            <input id="c3" name="c3" type="number" onChange={handleInputChange} />
          </div>
          <button onClick={compareInputs}>Compare</button>
          <div>Comparison Results:</div>
          <div>D &gt C1: {comparisonResult.d ? 'Yes' : 'No'}</div>
          <div>P &gt C2: {comparisonResult.p ? 'Yes' : 'No'}</div>
          <div>F &gt C3: {comparisonResult.f ? 'Yes' : 'No'}</div>
          
        </>
      )}
    </div>
  );
}

export default ExcelSum;
