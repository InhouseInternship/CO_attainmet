import React, { useState, useEffect } from 'react';
import ExcelJS from 'exceljs';
import axios from 'axios';
import UT1Page from './Ut1';
import UT2Page from './Insem';
import EndsemPage from './Endsem';
import { useNavigate,useLocation } from 'react-router-dom';
import './Exam_homepage.css'
// import handleExcelDownload from './Excel_sheet'; // Importing the function from the separate file

function App() {
  const [currentPage, setCurrentPage] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { data , savedId} = location.state;
  const [InsemValue, setInsem] = useState(0);
  const [ut1Value, setUt1] = useState(0);
  const [ut2Value, setUt2] = useState(0);
  const [endsemValue, setEndsem] = useState(0);
  const [dataId,setDataId] = useState('');
  const [sheetValues, setSheetValues] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log("exam saveid : ",savedId);
  const [selectedYear, selectedYearInCollege,selectedDepartment,selectedDivision,selectedSubject] = data.split('-');
  const handleNavigation = (page) => {
    const dataToTransfer = `${selectedYear}-${selectedYearInCollege}-${selectedDepartment}-${selectedDivision}-${selectedSubject}`;
    // alert(dataToTransfer);
    navigate(page,{ state: { data:dataToTransfer , savedId: savedId } });
  };

  useEffect(() => {

    const fetchSheetValues = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/sheetinfo/${savedId}`);
        setSheetValues(response.data.Sheet_value);
        console.log(response.data.Sheet_value);
        console.log("Dataid : ",sheetValues);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching sheet values:', error);
      }
      console.log("data",dataId)
      if(dataId!=null)
      {
        try {
          console.log("rffsd",savedId);
          const response = await axios.get(`http://localhost:3000/api/sheetdata/${sheetValues}`);
          console.log("Response Data:", response.data); // Log the entire response data
          // const { UT, UT2, Insem, Endsem } = response.data;
          setInsem(response.data.Insem);
          setUt1(response.data.UT);
          setUt2(response.data.UT2);
          setEndsem(response.data.Endsem);
          console.log(response.data.Insem);
          console.log(response.data.UT);
          console.log(response.data.UT2);
          console.log(response.data.Endsem);
          console.log("Insem",InsemValue);
          console.log("ut",ut1Value);
          console.log("ut2",ut2Value);
          console.log("Endsem",endsemValue);
        } catch (error) {
          console.error('Error fetching data from the server:', error);
        } 
      }
    };
    fetchSheetValues();
  }, );

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if(dataId!=null)
  //     {
  //       try {
  //         console.log("rffsd",savedId);
  //         const response = await axios.get('http://localhost:3000/api/sheetdata/${dataId}');
  //         console.log("Response Data:", response.data); // Log the entire response data
  //         // const { UT, UT2, Insem, Endsem } = response.data;
  //         // setInsem(Insem);
  //         // setUt1(UT);
  //         // setUt2(UT2);
  //         // setEndsem(Endsem);
  //       } catch (error) {
  //         console.error('Error fetching data from the server:', error);
  //       }        
  //     }

  //   };
  
  //   fetchData();
  // }, [savedId]);
  

  const handleExcelDownload = () => {
    console.log("Download button clicked");
    const workbook = new ExcelJS.Workbook();

    const sheet = workbook.addWorksheet("My Sheet");
    sheet.properties.defaultRowHeight = 20;
    sheet.columns = [
      { header: "", key: "row_name", width: 30, height: 20, style: { font: { color: { argb: 'FF0000' }, bold: true, size: 13 } } },
      { header: "Insem Attainment", key: "Insem", width: 20, height: 30, style: { font: { color: { argb: '0000FF' }, bold: true, size: 13 } } },
      { header: "Continuous Internal Aseessment(UT)", key: "UT", width: 40, style: { font: { color: { argb: '00FF00' }, bold: true, size: 13 } } },
      { header: "CO_Midterm_Attnmt", key: "mid_term", width: 20, style: { font: { color: { argb: 'FFA500' }, bold: true, size: 13 } } },
      { header: "Endsem Attainment", key: "end_sem", width: 20, style: { font: { color: { argb: '800080' }, bold: true, size: 13 } } },
      { header: "Final Direct Attainment", key: "final_att", width: 20, style: { font: { color: { argb: 'FF00FF' }, bold: true, size: 13 } } },
      { header: "Course Exit Survey", key: "co_exit", width: 20, style: { font: { color: { argb: '008080' }, bold: true, size: 13 } } },
      { header: "Final CO attainment", key: "final_co_att", width: 20, style: { font: { color: { argb: '000000' }, bold: true, size: 13 } } },
    ];

    const row_name = "midterm";
    const Insem = InsemValue;
    const ut1 = ut1Value;
    const ut2 = ut2Value;
    const endsem = endsemValue;
    // console.log("Insem",InsemValue);
    // console.log("ut",ut1Value);
    // console.log("ut2",ut2Value);
    // console.log("Endsem",endsemValue);
    const m1 = (Insem * 0.7 + ((ut1 + ut2) / 2) * 0.3) * 0.5;

    sheet.addRows([
      { row_name: "", Insem: "", UT: "", mid_term: "", end_sem: "", final_att: "", co_exit: "", final_co_att: "" },
      { row_name: "Attainment values", Insem: Insem, UT: (ut1 + ut2) / 2, mid_term: "", end_sem: endsem, final_att: "", co_exit: "", final_co_att: "" },
      { row_name: "CO_Midterm_Attnmt", Insem: Insem * 0.5, UT: ((ut1 + ut2) / 2) * 0.3, mid_term: Insem * 0.7 + ((ut1 + ut2) / 2) * 0.3, end_sem: "", final_att: "", co_exit: "", final_co_att: "" },
      { row_name: "Final Direct Attainmen", Insem: "", UT: "", mid_term: m1, end_sem: endsem * 0.5, final_att: m1 + endsem * 0.5, co_exit: "", final_co_att: "" },
    ]);

    workbook.xlsx.writeBuffer().then(data => {
      const blob = new Blob([data], { type: "application/vnd.openxmlformats-officedocument.spreadsheet.sheet" });
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = 'download.xlsx';
      anchor.click();
      window.URL.revokeObjectURL(url);
    });
  };

  return (
    <div className="Main_container">
      <div class="title">
        <h1>Select the exam</h1>
      </div>
   
   {/* <div className="container"> */}
      <div className='box-container'>
      <div className="row">
        <div className="box" onClick={() => handleNavigation('/Ut1')}>
          <h2>UT1</h2>
        </div>
        <div className="box" onClick={() => handleNavigation('/FirstYear_insem')}>
          <h2>Insem</h2>
        </div>
      </div>
      <div className="row">
        <div className="box" onClick={() => handleNavigation('/Ut2')}>
          <h2>UT2</h2>
        </div>
        <div className="box" onClick={() => handleNavigation('/FirstYear_endsem')}>
          <h2>Endsem</h2>
        </div>
      </div>
      <div className="row">
        <div className="box" onClick={handleExcelDownload}>
          <h2>Excel sheet</h2>
        </div>
      </div>
    </div>
    {/* </div> */}
    </div>
  );
}

export default App;
