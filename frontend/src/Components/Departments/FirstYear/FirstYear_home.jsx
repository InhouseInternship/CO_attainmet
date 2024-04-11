import React, { useState } from 'react';
import UT1Page from '../Exams/Ut1';
import UT2Page from '../Exams/Insem';
import EndsemPage from '../Exams/Endsem';
import { useNavigate } from 'react-router-dom';
import './FirstYear_home.css'
function App() {
  const [currentPage, setCurrentPage] = useState(null);
  const navigate = useNavigate();
  const handleNavigation = (page) => {
    navigate(page);
  };

  return (
    <div className="Main_container">
      <div class="title">
        <h1>Select the exam</h1>
      </div>
   
    <div className="container">
      
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
    </div>
  );
}

export default App;
