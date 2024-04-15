import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Entc.css';
const FirstYear = () => {
  const [selectedDivision, setSelectedDivision] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { data } = location.state;
  const [selectedYear, selectedYearInCollege,selectedDepartment] = data.split('-');

  const handleDivisionChange = (e) => {
    setSelectedDivision(e.target.value);
  };

  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
  };

  const handleNext = () => {
    const dataToTransfer = `${selectedYear}-${selectedYearInCollege}-${selectedDepartment}-${selectedDivision}-${selectedSubject}`;
    // alert(dataToTransfer);
    navigate('/Exam_homepage', { state: { data:dataToTransfer } });
  };

  const getDivisions = () => {
    if (selectedYearInCollege === 'Second Year') {
      return ['SE5', 'SE6', 'SE7', 'SE8'];
    } else if (selectedYearInCollege === 'Third Year') {
      return ['TE5', 'TE6', 'TE7', 'TE8'];
    } else if (selectedYearInCollege === 'Final Year') {
      return ['BE5', 'BE6', 'BE7', 'BE8'];
    } else {
      return [];
    }
  };

  const getSubjects = () => {
    if (selectedYearInCollege === 'Second Year') {
      return ['EXE', 'ELC', 'M3', 'DSA', 'DS'];
    } else if (selectedYearInCollege === 'Third Year') {
      return ['EFT', 'FJP', 'MC', 'DC'];
    } else if (selectedYearInCollege === 'Final Year') {
      return ['CC', 'JS', 'VLSI', 'Elective'];
    } else {
      return [];
    }
  };

  return (
    <div className="Main_container">
      <div className="title">
        <h1>Select Division and Subject</h1>
      </div>
      <div className="container">
      <div className='select-container'>
        <div className='division'>
      
        
          <label htmlFor="divisionSelect">Select Division:</label>
          <select id="divisionSelect" value={selectedDivision} onChange={handleDivisionChange}>
            <option value="">Select Division</option>
            {getDivisions().map((division, index) => (
              <option key={index} value={division}>{division}</option>
            ))}
          </select>
        </div>
        {selectedDivision && (
          <div>
            <div className='subject' >
            <label htmlFor="subjectSelect">Select Subject:</label>
            <select id="subjectSelect" value={selectedSubject} onChange={handleSubjectChange}>
              <option value="">Select Subject</option>
              {getSubjects().map((subject, index) => (
                <option key={index} value={subject}>{subject}</option>
              ))}
            </select>
          </div>
          </div>
        )}
         </div>
        <div className='nxtbtn'>
        {selectedSubject && (
          <button onClick={handleNext}>Next</button>
        )}
      </div>
    </div>
    </div>
  );
};

export default FirstYear;
