import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import * as XLSX from 'xlsx';

function ExcelSum({ onFinalattChange }) {
  const [data1, setData] = useState([]);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [distinctionPercentage1, setDistinctionPercentage1] = useState(0);
  const [firstClassPercentage1, setFirstClassPercentage1] = useState(0);
  const [passPercentage1,setPassPercentage1] = useState(0);
  const [totalNoStudents1,settotalNoStudents1]=useState(0);
  const [distinctionstudents1,setDistinctionstudents1]=useState(0);
  const [firstclassstudents1,setFirstClassstudents1]=useState(0);
  const [passstudents1,setPassstudents1]=useState(0);
  const [hightlevelco1,setHighLevelco1]=useState(0);
  const [middlelevelco1,setMiddleLevelco1]=useState(0);
  const [lowlevelco1,setLowevelco1]=useState(0);
  const [UT1, setUT1] = useState(0);

  const [distinctionPercentage2, setDistinctionPercentage2] = useState(0);
  const [firstClassPercentage2, setFirstClassPercentage2] = useState(0);
  const [passPercentage2,setPassPercentage2] = useState(0);
  const [totalNoStudents2,settotalNoStudents2]=useState(0);
  const [distinctionstudents2,setDistinctionstudents2]=useState(0);
  const [firstclassstudents2,setFirstClassstudents2]=useState(0);
  const [passstudents2,setPassstudents2]=useState(0);
  const [hightlevelco2,setHighLevelco2]=useState(0);
  const [middlelevelco2,setMiddleLevelco2]=useState(0);
  const [lowlevelco2,setLowevelco2]=useState(0);
  const [finaloutput,setFinalOutput]=useState(0);
  const [UT2, setUT2] = useState(0);

  const [totalCOTarget, setTotalCOTarget] = useState(0);
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');
  const [input4, setInput4] = useState('');
  const [input5, setInput5] = useState('');
  const [input6, setInput6] = useState('');
  const [input1Error, setInput1Error] = useState(false);
  const [input2Error, setInput2Error] = useState(false);
  const [input3Error, setInput3Error] = useState(false);
  const [input4Error, setInput4Error] = useState(false);
  const [input5Error, setInput5Error] = useState(false);
  const [input6Error, setInput6Error] = useState(false);
  const location = useLocation();
  const { data } = location.state;
  const [selectedYear, selectedYearInCollege, selectedDepartment, selectedDivision, selectedSubject] = data.split('-');

  useEffect(() => {
    // Check if there is previously calculated data in local storage
    const storedData = JSON.parse(localStorage.getItem('excelData'));

    if (storedData) {
      setData(storedData.data);
      setDistinctionPercentage1(storedData.distinctionPercentage);
      setFirstClassPercentage1(storedData.firstClassPercentage);
      setPassPercentage1(storedData.passPercentage);
      setUT1(storedData.insemattenment);
      setTotalCOTarget(storedData.totalCOTarget);
      setInput1(storedData.input1);
      setInput2(storedData.input2);
      setInput3(storedData.input3);
      setInput4(storedData.input4);
      setInput5(storedData.input5);
      setInput6(storedData.input6);
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
    setInput4Error(input4 === '');
    setInput5Error(input5 === '');
    setInput6Error(input6 === '');
  }, [input1, input2, input3,input4,input5,input6]);

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

//FOR co1-----------------------------------------------------------------
      let d1 = 0;
      let f1 = 0;
      let p1 = 0;
     
      var topValue1 = data[0][1];

      var t1 = topValue1 * 0.75;
      var t2 = topValue1 * 0.60;
      var t3 = topValue1 * 0.4;
      data.forEach((row, index) => {
        if (index !== 0) { // Skip the header row
          const cellValue = parseFloat(row[1]); // Assuming the score is in the second column
          if (!isNaN(cellValue) && cellValue >= t1) d1++; // 75% threshold
          if (!isNaN(cellValue) && cellValue >= t2) f1++;
          if (!isNaN(cellValue) && cellValue >= t3) p1++;
        }
      });
      

      const totalStudents = data.length - 1; // Exclude header row
      settotalNoStudents1(totalStudents);
      setDistinctionstudents1(d1);
      setFirstClassstudents1(f1);
      setPassstudents1(p1)
    //   settotalNoStudents2(totalStudents);
      var dPercentage1 = (d1 / totalStudents) * 100;
      var fPercentage1 = (f1 / totalStudents) * 100;
      var pPercentage1 = (p1 / totalStudents) * 100;
      setDistinctionPercentage1(dPercentage1);
      setFirstClassPercentage1(fPercentage1);
      setPassPercentage1(pPercentage1);
      
      var dPercentage1 = (d1 / totalStudents) * 100;
      var fPercentage1 = (f1 / totalStudents) * 100;
      var pPercentage1 = (p1 / totalStudents) * 100;
      setDistinctionPercentage1(dPercentage1);
      setFirstClassPercentage1(fPercentage1);
      setPassPercentage1(pPercentage1);

      // Calculate finalatt
      let finalatt1 = 0;
      if (input1 > dPercentage1) {
        dPercentage1 *= 3;
      } else {
        dPercentage1 = 300;
      }
      if (input2 > fPercentage1) {
        fPercentage1 *= 2;
      } else {
        fPercentage1 = 200;
      }
      if (input3 > pPercentage1) {
        pPercentage1 *= 1;
      } else {
        pPercentage1 = 100;
      }
      finalatt1= (dPercentage1 + fPercentage1 + pPercentage1) / 600;
      setHighLevelco1(dPercentage1/100);
      setLowevelco1(pPercentage1/100);
      setMiddleLevelco1(fPercentage1/100);
      setUT1(finalatt1);

//--------------------------------------------------------------------

//for CO2-----------------------------------------------------

    let d2 = 0;
    let f2 = 0;
    let p2 = 0;
    const topValue2 = data[0][2];
    t1=topValue2*0.75;
    t2=topValue2*0.6;
    t3=topValue2*0.4;
    data.forEach((row, index) => {
    if (index !== 0) { // Skip the header row
        const cellValue = parseFloat(row[2]); // Assuming the score is in the second column
        if (!isNaN(cellValue) && cellValue >= t1) d2++; // 75% threshold
        if (!isNaN(cellValue) && cellValue >= t2) f2++;
        if (!isNaN(cellValue) && cellValue >= t3) p2++;
    }
    });
      setDistinctionstudents2(d2);
      setFirstClassstudents2(f2);
      setPassstudents2(p2);
      var dPercentage2 = (d2 / totalStudents) * 100;
      var fPercentage2 = (f2 / totalStudents) * 100;
      var pPercentage2 = (p2 / totalStudents) * 100;
      setDistinctionPercentage2(dPercentage2);
      setFirstClassPercentage2(fPercentage2);
      setPassPercentage2(pPercentage2);

      // Calculate finalatt
      let finalatt2 = 0;
      if (input4 > dPercentage2) {
        dPercentage2 *= 3;
      } else {
        dPercentage2 = 300;
      }
      if (input5 > fPercentage2) {
        fPercentage2 *= 2;
      } else {
        fPercentage2 = 200;
      }
      if (input6 > pPercentage2) {
        pPercentage2 *= 1;
      } else {
        pPercentage2 = 100;
      }
      finalatt2= (dPercentage2 + fPercentage2 + pPercentage2) / 600;
      setHighLevelco2(dPercentage2/100);
      setLowevelco2(pPercentage2/100);
      setMiddleLevelco2(fPercentage2/100);
      setUT2(finalatt2);
      setFinalOutput((finalatt2+finalatt1)/2);
      const dataToTransfer = `${selectedYear}-${selectedYearInCollege}-${selectedDepartment}-${selectedDivision}-${selectedSubject}`;
      // alert(dataToTransfer);
      // Calculate and set total CO target
    //   const totalCOTarget = calculateTotalCOTarget(data);
    //   setTotalCOTarget(totalCOTarget);

      // Save the calculated data to local storage
      const excelData = {
        data,
        distinctionPercentage1: dPercentage1,
        firstClassPercentage1: fPercentage1,
        passPercentage1: pPercentage1,
        UT1: finalatt1,
        finaloutput:(finalatt2+finalatt1)/2,
        distinctionPercentage2: dPercentage2,
        firstClassPercentage2: fPercentage2,
        passPercentage2: pPercentage2,
        UT2: finalatt2,
        totalCOTarget,
        input1,
        input2,
        input3,
        input4,
        input5,
        input6
      };
      localStorage.setItem('excelData', JSON.stringify(excelData));

      // Call the onFinalattChange function to pass the finalatt value
      if (onFinalattChange) {
        onFinalattChange(finalatt1);
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
  return (
    <div className="excel-sum">
         <h1>Ut1 attainment calculation</h1>
    <div>
        <h3>Targeted values for co1</h3>
      <div>
        <label htmlFor="input1">% of sudents expected to be in distinction:</label>
        <input type="text" id="input1" value={input1} onChange={(e) => setInput1(e.target.value)} />
        {input1Error && <span style={{ color: 'red' }}>*</span>}
      </div>
      <div>
        <label htmlFor="input2">% of sudents expected to be in First Class:</label>
        <input type="text" id="input2" value={input2} onChange={(e) => setInput2(e.target.value)} />
        {input2Error && <span style={{ color: 'red' }}>*</span>}
      </div>
      <div>
        <label htmlFor="input3">% of sudents expected to be Passed:</label>
        <input type="text" id="input3" value={input3} onChange={(e) => setInput3(e.target.value)} />
        {input3Error && <span style={{ color: 'red' }}>*</span>}
      </div>
      </div>
      <div>
        <h3>Targeted values for co2</h3>
      <div>
        <label htmlFor="input4">% of sudents expected to be in distinction:</label>
        <input type="text" id="input4" value={input4} onChange={(e) => setInput4(e.target.value)} />
        {input1Error && <span style={{ color: 'red' }}>*</span>}
      </div>
      <div>
        <label htmlFor="input5">% of sudents expected to be in First Class:</label>
        <input type="text" id="input5" value={input5} onChange={(e) => setInput5(e.target.value)} />
        {input2Error && <span style={{ color: 'red' }}>*</span>}
      </div>
      <div>
        <label htmlFor="input6">% of sudents expected to be Passed:</label>
        <input type="text" id="input6" value={input6} onChange={(e) => setInput6(e.target.value)} />
        {input3Error && <span style={{ color: 'red' }}>*</span>}
      </div>
      </div>
      <input type="file" accept='.xlsx,.xls' onChange={handleFileUpload} disabled={!input1 || !input2 || !input3||!input4 || !input5 || !input6} />
      {fileUploaded && (
        <div className="result">
        <div className="results1">
           <h3>For CO3=</h3>
          <p>Total number of students: {totalNoStudents1.toFixed(2)}</p>
          <p>Total number of students got distinction: {distinctionstudents1.toFixed(2)}</p>
          <p>Total number of students got first class: {firstclassstudents1.toFixed(2)}</p>
          <p>Total number of students pass: {passstudents1.toFixed(2)}</p>
          <p>% of students got distinction: {distinctionPercentage1.toFixed(2)}%</p>
          <p>% of students got distinction: {firstClassPercentage1.toFixed(2)}%</p>
          <p>% of students got distinction: {passPercentage1.toFixed(2)}%</p>
          <p>Attainment at high level: {hightlevelco1.toFixed(2)}</p>
          <p>Attainment at middle level: {middlelevelco1.toFixed(2)}</p>
          <p>Attainment at low level: {lowlevelco1.toFixed(2)}</p>
          {/* <p>Attainment of Insem ={insemattenment1.toFixed(2)}</p> */}
        </div>
        <div className="results2">
           <h3>For CO4</h3>
          <p>Total number of students: {totalNoStudents1.toFixed(2)}</p>
          <p>Total number of students got distinction: {distinctionstudents2.toFixed(2)}</p>
          <p>Total number of students got first class: {firstclassstudents2.toFixed(2)}</p>
          <p>Total number of students pass: {passstudents2.toFixed(2)}</p>
          <p>% of students got distinction: {distinctionPercentage2.toFixed(2)}%</p>
          <p>% of students got distinction: {firstClassPercentage2.toFixed(2)}%</p>
          <p>% of students got distinction: {passPercentage2.toFixed(2)}%</p>
          <p>Attainment at high level: {hightlevelco2.toFixed(2)}</p>
          <p>Attainment at middle level: {middlelevelco2.toFixed(2)}</p>
          <p>Attainment at low level: {lowlevelco2.toFixed(2)}</p>
          <p></p>
          <h3>Attainment of UT1 ={finaloutput.toFixed(2)}</h3>
        </div>
        </div>
      )}
    </div>
  );
  
}

export default ExcelSum;
