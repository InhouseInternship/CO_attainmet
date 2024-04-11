import React, { useState } from 'react';
import { useNavigate,useParams,useLocation  } from 'react-router-dom';

// import './Comp.css'

const FirstYear = () => {
  const [selectedDivision, setSelectedDivision] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { data } = location.state;

  const [selectedYear, selectedYearInCollege] = data.split('-');

  // console.log('Selected Year:', selectedYear);
  // console.log('Selected Year in College:', selectedYearInCollege);
  // alert(selectedYear)
   
  const divisions = ['fe 1', 'fe 2', 'fe 3', 'fe 4', 'fe 5', 'fe 6', 'fe 7', 'fe 8', 'fe 9', 'fe 10', 'fe 11'];
  const subjects = ['Subject 1', 'Subject 2', 'Subject 3', 'Subject 4', 'Subject 5', 'Subject 6', 'Subject 7', 'Subject 8', 'Subject 9', 'Subject 10'];

  const handleDivisionChange = (e) => {
    setSelectedDivision(e.target.value);
  };
  
  
  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
  };

  const handleNext = () => {
    // console.log('Selected Division:', selectedDivision);
    // console.log('Selected Subject:', selectedSubject);
    // alert(selectedYear)
    // console.log('Selected Year in College:', selectedYearInCollege);

    // Navigate to the FirstYear page
    const dataToTransfer = `${selectedYear}-${selectedYearInCollege}-${selectedDivision}-${selectedSubject}`;
    // alert(dataToTransfer)
    navigate('/Exam_homepage',{ state: { data:dataToTransfer } });
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
            {divisions.map((division, index) => (
              <option key={index} value={division}>{division}</option>
            ))}
          </select>
        </div>
        {selectedDivision && (
          <div>
            <label htmlFor="subjectSelect">Select Subject:</label>
            <select id="subjectSelect" value={selectedSubject} onChange={handleSubjectChange}>
              <option value="">Select Subject</option>
              {subjects.map((subject, index) => (
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
// import React from 'react';
// import { useLocation } from 'react-router-dom';

// const FirstYear = () => {

//   // Rest of your component code...
// };

// export default FirstYear;
