import React, { useState , useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Computer.css';
const FirstYear = () => {
  const [selectedDivision, setSelectedDivision] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { data } = location.state;
  const [selectedYear, selectedYearInCollege,selectedDepartment] = data.split('-');
  const [savedId, setSavedId] = useState('');
  // useEffect(() => {
  //   createSheetInfo();
  // }, []);
  const handleDivisionChange = (e) => {
    setSelectedDivision(e.target.value);
  };

  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
  };

  const handleNext = async () => {
    const dataToTransfer = `${selectedYear}-${selectedYearInCollege}-${selectedDepartment}-${selectedDivision}-${selectedSubject}`;
    // alert(dataToTransfer);
        // Make POST request to backend API to store data
        try {
          const response = await fetch('http://localhost:3000/api/sheetinfo', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              academicYear: parseInt(selectedYear),
              studyingYear: selectedYearInCollege,
              branch: selectedDepartment,
              division: selectedDivision,
              subject: selectedSubject,
              Sheet_values:null
            })
          });
    
          const responseData = await response.json();
          const savedId = responseData.sheetInfo._id;
          console.log(savedId);
          console.log("fsf",responseData); // Log the response from the backend
          setSavedId(savedId);
          // Redirect to the next page
          navigate('/Exam_homepage', { state: { data: dataToTransfer , savedId: savedId} });
        } catch (error) {
          console.error(error);
        }
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
      return ['DM', 'FDS', 'MP', 'PPL', 'OOP'];
    } else if (selectedYearInCollege === 'Third Year') {
      return ['AI', 'DSBDA', 'CC', 'WT'];
    } else if (selectedYearInCollege === 'Final Year') {
      return ['DAA', 'ML', 'PC', 'Elective'];
    } else {
      return [];
    }
  };

  return (
    <div className="Main_container">
      <div className='box1'>
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
    </div>
  );
};

export default FirstYear;
