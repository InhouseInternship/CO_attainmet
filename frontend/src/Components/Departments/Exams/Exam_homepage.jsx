import React, { useState } from 'react';
import UT1Page from './Ut1';
import UT2Page from './Insem';
import EndsemPage from './Endsem';
import { useNavigate,useLocation } from 'react-router-dom';
import './Exam_homepage.css'
function App() {
  const [currentPage, setCurrentPage] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { data } = location.state;
  const [selectedYear, selectedYearInCollege,selectedDepartment,selectedDivision,selectedSubject] = data.split('-');
  const handleNavigation = (page) => {
    const dataToTransfer = `${selectedYear}-${selectedYearInCollege}-${selectedDepartment}-${selectedDivision}-${selectedSubject}`;
    // alert(dataToTransfer);
    navigate(page,{ state: { data:dataToTransfer } });
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
        <div className="box" onClick={() => handleNavigation('/Excelsheet')}>
          <h2>Excel sheet</h2>
        </div>
      </div>
    </div>
    {/* </div> */}
    </div>
  );
}

export default App;
