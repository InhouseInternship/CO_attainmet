import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import * as XLSX from 'xlsx';
import './Insem.css';
import axios from 'axios';

function ExcelSum({ onFinalattChange }) {
  const [data1, setData] = useState([]);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [distinctionPercentage, setDistinctionPercentage] = useState(0);
  const [firstClassPercentage, setFirstClassPercentage] = useState(0);
  const [passPercentage, setPassPercentage] = useState(0);
  const [totalNoStudents,settotalNoStudents]=useState(0);
  const [distinctionstudents,setDistinctionstudents]=useState(0);
  const [firstclassstudents,setFirstClassstudents]=useState(0);
  const [passstudents,setPassstudents]=useState(0);
  const [hightlevelco,setHighLevelco]=useState(0);
  const [middlelevelco,setMiddleLevelco]=useState(0);
  const [lowlevelco,setLowevelco]=useState(0);
  const [insemattenment, setInsemattainment] = useState(0);
  const [totalCOTarget, setTotalCOTarget] = useState(0);
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');
  const [input1Error, setInput1Error] = useState(false);
  const [input2Error, setInput2Error] = useState(false);
  const [input3Error, setInput3Error] = useState(false);
  const location = useLocation();
  const { data ,savedId} = location.state;
  const [dataId, setDataId] = useState('');
  const [selectedYear, selectedYearInCollege, selectedDepartment, selectedDivision, selectedSubject] = data.split('-');
  const [sheetValues, setSheetValues] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Check if there is previously calculated data in local storage
    const storedData = JSON.parse(localStorage.getItem('excelData'));

    if (storedData) {
      setData(storedData.data);
      setDistinctionPercentage(storedData.distinctionPercentage);
      setFirstClassPercentage(storedData.firstClassPercentage);
      setPassPercentage(storedData.passPercentage);
      setInsemattainment(storedData.insemattenment);
      setTotalCOTarget(storedData.totalCOTarget);
      setInput1(storedData.input1);
      setInput2(storedData.input2);
      setInput3(storedData.input3);
      setFileUploaded(true);
    }

    // Clear localStorage when component unmounts
    return () => {
      localStorage.removeItem('excelData');
    };
  }, []);

  useEffect(() => {
    // Check if all inputs are filled
    setInput1Error(input1 === '');
    setInput2Error(input2 === '');
    setInput3Error(input3 === '');
  }, [input1, input2, input3]);

  const handleFileUpload = (e) => {
    setFileUploaded(false); // Reset file upload state
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      // Remaining code for file upload and data processing...
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      // Get first worksheet
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      // Convert array of arrays
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      setData(data);

      let d = 0;
      let f = 0;
      let p = 0;
      const topValue = 30;
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
      settotalNoStudents(totalStudents);
      setDistinctionstudents(d);
      setFirstClassstudents(f);
      setPassstudents(p)
      var dPercentage = (d / totalStudents) * 100;
      var fPercentage = (f / totalStudents) * 100;
      var pPercentage = (p / totalStudents) * 100;
      setDistinctionPercentage(dPercentage);
      setFirstClassPercentage(fPercentage);
      setPassPercentage(pPercentage);

      // Calculate finalatt
      let finalatt = 0;
      if (input1 > dPercentage) {
        dPercentage *= 3;
      } else {
        dPercentage = 300;
      }
      if (input2 > fPercentage) {
        fPercentage *= 2;
      } else {
        fPercentage = 200;
      }
      if (input3 > pPercentage) {
        pPercentage *= 1;
      } else {
        pPercentage = 100;
      }
      finalatt = (dPercentage + fPercentage + pPercentage) / 600;
      setHighLevelco(dPercentage/100);
      setLowevelco(pPercentage/100);
      setMiddleLevelco(fPercentage/100);
      setInsemattainment(finalatt);
      const dataToTransfer = `${selectedYear}-${selectedYearInCollege}-${selectedDepartment}-${selectedDivision}-${selectedSubject}`;
      // alert(dataToTransfer);
      // Calculate and set total CO target
      const totalCOTarget = calculateTotalCOTarget(data);
      setTotalCOTarget(totalCOTarget);

      // Save the calculated data to local storage
      const excelData = {
        data,
        distinctionPercentage: dPercentage,
        firstClassPercentage: fPercentage,
        passPercentage: pPercentage,
        insemattenment: finalatt,
        totalCOTarget,
        input1,
        input2,
        input3
      };
      localStorage.setItem('excelData', JSON.stringify(excelData));

      // Call the onFinalattChange function to pass the finalatt value
      if (onFinalattChange) {
        onFinalattChange(finalatt);
      }

      setFileUploaded(true); // Set file upload state to true
    };
    reader.readAsBinaryString(file);
  };

  const handleSubmit = () => {
    // setSubmitClicked(true);
    if (input1 !== '' && input2 !== '' && input3 !== '') {
      // Perform other operations
      alert("Submit button clicked!");
    }
  };
  const calculateTotalCOTarget = (data) => {
    // Assuming CO target is specified in the first row of the second column
    const topValue = data[0][1];
    return topValue * data.length; // Multiply by the number of students
  };
  useEffect(() => {

    const fetchSheetValues = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/sheetinfo/${savedId}`);
        setSheetValues(response.data.Sheet_value);
        console.log("sheetvalues : ",sheetValues);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching sheet values:', error);
      }
    };
  
    fetchSheetValues();
  }, [savedId]);
  const navigate = useNavigate(); 
  const navigateToExamHome = async () => {
  const dataToTransfer = `${selectedYear}-${selectedYearInCollege}-${selectedDepartment}-${selectedDivision}-${selectedSubject}`;
    
    // Execute fetchDataAndUpdateSheetData only when sheetValues is null
    if (sheetValues === null) {
      try {
        const response = await fetch('http://localhost:3000/api/sheetdata', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            UT: null,
            UT2: null,
            Insem: insemattenment.toFixed(2),
            Endsem: null,
            midterm_att: null,
            direct_att: null,
            final_att: null
          })
        });
  
        const responseData = await response.json();
        const dataId = responseData.sheetData._id;
        setDataId(dataId);
        try {
          await axios.put(`http://localhost:3000/api/sheetinfo/${savedId}`, { Sheet_values:dataId });
          console.log('Sheet_values updated successfully');
        } catch (error) {
          console.error('Error updating sheetValues:', error);
        }
        console.log('Sheet_values is null');
      } catch (error) {
        console.error(error);
      }
    } 
    else 
    {
      // console.log("not null",finaloutput);
      try {
        const response = await axios.put(`http://localhost:3000/api/sheetdata/${sheetValues}`, { fieldName: 'Insem', fieldValue: insemattenment.toFixed(2) });
        if (response.status === 200) {
          console.log('Sheet_values is updated successfully');
          // Handle success, if needed
        } else {
          console.error('Error updating sheetValues: Unexpected status code', response.status);
          // Handle unexpected status code
        }
      } catch (error) {
        console.error('Error updating sheetValues:', error);
      }
      console.log("Sheet_values is not null");
    }
  
    // Navigate to the exam homepage
    navigate('/Exam_homepage', { state: { data: dataToTransfer, savedId: savedId } });
  };
  return (
    <div className="excel-sum">
      <div>
         <h1>Insem attainment calculation</h1>
        <label htmlFor="input1">% of sudents expected to be in distinction:</label>
        <input type="text" id="input1" value={input1} onChange={(e) => setInput1(e.target.value)} />
        {input1Error && <span style={{ color: 'red' }}>*</span>}
      </div>
      <div>
        <label htmlFor="input2">% of sudents expected to be in First Class:</label>
        <input type="text" id="inputnput 22" value={input2} onChange={(e) => setInput2(e.target.value)} />
        {input2Error && <span style={{ color: 'red' }}>*</span>}
      </div>
      <div>
        <label htmlFor="input3">% of sudents expected to be Passed:</label>
        <input type="text" id="input3" value={input3} onChange={(e) => setInput3(e.target.value)} />
        {input3Error && <span style={{ color: 'red' }}>*</span>}
      </div>
      <input type="file" accept='.xlsx,.xls' onChange={handleFileUpload} disabled={!input1 || !input2 || !input3} />
      {fileUploaded && (
        <div className="results">
          <p>Total number of students: {totalNoStudents.toFixed(2)}</p>
          <p>Total number of students got distinction: {distinctionstudents.toFixed(2)}</p>
          <p>Total number of students got first class: {firstclassstudents.toFixed(2)}</p>
          <p>Total number of students pass: {passstudents.toFixed(2)}</p>
          <p>% of students got distinction: {distinctionPercentage.toFixed(2)}%</p>
          <p>% of students got distinction: {firstClassPercentage.toFixed(2)}%</p>
          <p>% of students got distinction: {passPercentage.toFixed(2)}%</p>
          <p>Attainment at high level: {hightlevelco.toFixed(2)}</p>
          <p>Attainment at middle level: {middlelevelco.toFixed(2)}</p>
          <p>Attainment at low level: {lowlevelco.toFixed(2)}</p>
          <h3>Attainment of Insem ={insemattenment.toFixed(2)}</h3>
        </div>
      )}
            {fileUploaded && (
    <button onClick={navigateToExamHome}>Back to Exam_home</button>
  )}
    </div>
  );
  
}

export default ExcelSum;
