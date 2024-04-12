import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

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
    alert(dataToTransfer);
    navigate('/Exam_homepage', { state: { data:dataToTransfer } });
  };

  const getDivisions = () => {
    if (selectedYearInCollege === 'Second Year') {
      return ['SE1', 'SE2', 'SE3', 'SE4'];
    } else if (selectedYearInCollege === 'Third Year') {
      return ['TE1', 'TE2', 'TE3', 'TE4'];
    } else if (selectedYearInCollege === 'Final Year') {
      return ['BE1', 'BE2', 'BE3', 'BE4'];
    } else {
      return [];
    }
  };

  const getSubjects = () => {
    if (selectedYearInCollege === 'Second Year') {
      return ['p1', 'p2', 'p3', 'p4', 'p5'];
    } else if (selectedYearInCollege === 'Third Year') {
      return ['s1', 's2', 's3', 's4'];
    } else if (selectedYearInCollege === 'Final Year') {
      return ['b1', 'b2', 'b3', 'b4'];
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
        <div>
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
            <label htmlFor="subjectSelect">Select Subject:</label>
            <select id="subjectSelect" value={selectedSubject} onChange={handleSubjectChange}>
              <option value="">Select Subject</option>
              {getSubjects().map((subject, index) => (
                <option key={index} value={subject}>{subject}</option>
              ))}
            </select>
          </div>
        )}
        {selectedSubject && (
          <button onClick={handleNext}>Next</button>
        )}
      </div>
    </div>
  );
};

export default FirstYear;