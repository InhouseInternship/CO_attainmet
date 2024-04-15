import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './It.css';
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
      return ['SE9', 'SE10', 'SE11'];
    } else if (selectedYearInCollege === 'Third Year') {
      return ['TE9', 'TE10', 'TE11'];
    } else if (selectedYearInCollege === 'Final Year') {
      return ['BE9', 'BE10', 'BE11'];
    } else {
      return [];
    }
  };

  const getSubjects = () => {
    if (selectedYearInCollege === 'Second Year') {
      return ['DM', 'LDCO', 'BCN', 'OOP', 'DSA'];
    } else if (selectedYearInCollege === 'Third Year') {
      return ['TOC', 'DBMS', 'SE&PM', 'OS', 'HCI'];
    } else if (selectedYearInCollege === 'Final Year') {
      return ['SPM', 'ISR', 'Deep Learning', 'Elective'];
    } else {
      return [];
    }
  };

  return (
//     <div className="Main_container">
//       <div className="title">
//         <h1>Select Division and Subject</h1>
//       </div>
//       <div className="container">
//         <div className='division'>
//           <label htmlFor="divisionSelect">Select Division:</label>
//           <select id="divisionSelect" value={selectedDivision} onChange={handleDivisionChange}>
//             <option value="">Select Division</option>
//             {getDivisions().map((division, index) => (
//               <option key={index} value={division}>{division}</option>
//             ))}
//           </select>
//         </div>
//         </div>
//         {selectedDivision && (
//           <div>
//             <label htmlFor="subjectSelect">Select Subject:</label>
//             <select id="subjectSelect" value={selectedSubject} onChange={handleSubjectChange}>
//               <option value="">Select Subject</option>
//               {getSubjects().map((subject, index) => (
//                 <option key={index} value={subject}>{subject}</option>
//               ))}
//             </select>
//           </div>
//         )}
//         {selectedSubject && (
//           <button onClick={handleNext}>Next</button>
//         )}
//       </div>
//     </div>
//   );
// };
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
