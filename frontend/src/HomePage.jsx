import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

function YearSelector() {
  const navigate = useNavigate();
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedYearInCollege, setSelectedYearInCollege] = useState(null);
  const currentYear = new Date().getFullYear();
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const years = Array.from({ length: currentYear - 1999 }, (_, index) => 2000 + index);
  const yearsInCollege = ['First Year', 'Second Year', 'Third Year', 'Final Year'];
  const departments = ['Computer', 'ENTC', 'IT'];
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      slideDepartments(1);
    }, 3000); // Adjust the interval time as needed (in milliseconds)
   
    return () => clearInterval(interval);
  }, [slideIndex]);
  const slideDepartments = (direction) => {
    const totalDepartments = document.querySelectorAll('.co-department').length;
    let newIndex = slideIndex + direction;

    if (newIndex < 0) {
      newIndex = totalDepartments - 1;
    } else if (newIndex >= totalDepartments) {
      newIndex = 0;
    }

    setSlideIndex(newIndex);

    const translateValue = `translateX(-${newIndex * 100}%)`;
    document.querySelector('.co-list').style.transform = translateValue;
  };
  const handleYearSelection = (e) => {
    setSelectedYear(parseInt(e.target.value));
  };

  const handleYearInCollegeSelection = (e) => {
    setSelectedYearInCollege(e.target.value);
  };
  const handleDepartmentSelection = (e) => {
    setSelectedDepartment(e.target.value);
  };
  const handleSubmit = () => {
    if(selectedYear && selectedYearInCollege)
    {
      if (selectedYearInCollege === 'First Year') {
        const dataToTransfer = `${selectedYear}-${selectedYearInCollege}`;
        alert(dataToTransfer)
        navigate('FirstYear', { state: { data:dataToTransfer } })
      } 
      // else if (selectedYearInCollege === 'Second Year') {
        
      //   navigate('/SecondYear');
      // } else if (selectedYearInCollege === 'Third Year') {
      //   navigate('/ThirdYear');
      // } else if (selectedYearInCollege === 'Final Year') {
      //   navigate('/FinalYear');
      // }
      else
      {
        if(selectedDepartment==='Computer')
        {
          const dataToTransfer = `${selectedYear}-${selectedYearInCollege}-${selectedDepartment}`;
        alert(dataToTransfer)
        navigate('Computer', { state: { data:dataToTransfer } })
        }
        else if(selectedDepartment==='IT')
        {
          const dataToTransfer = `${selectedYear}-${selectedYearInCollege}-${selectedDepartment}`;
          alert(dataToTransfer)
          navigate('It', { state: { data:dataToTransfer } })
        }
        else if(selectedDepartment==='ENTC')
        {
          const dataToTransfer = `${selectedYear}-${selectedYearInCollege}-${selectedDepartment}`;
          alert(dataToTransfer)
          navigate('Entc', { state: { data:dataToTransfer } })
        }
      }
    }
    else
    {
      alert('Please select both year and year in college.');
    }
  };

  return (
    <div className="year-selector-container">
      <div className="left-part">
        <h1>Welcome to the PICT CO-Attainment System</h1>
        <h2>Select Year:</h2>
        <select onChange={handleYearSelection}>
          <option value="">Select Year</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        {selectedYear && (
          <>
            <h2>Select Year in College:</h2>
            <select onChange={handleYearInCollegeSelection}>
              <option value="">Select Year in College</option>
              {yearsInCollege.map((yearInCollege) => (
                <option key={yearInCollege} value={yearInCollege}>
                  {yearInCollege}
                </option>
              ))}
            </select>
            {selectedYearInCollege !== 'First Year' && (
              <>
                <h2>Select Department:</h2>
                <select onChange={handleDepartmentSelection}>
                  <option value="">Select Department</option>
                  {departments.map((department) => (
                    <option key={department} value={department}>
                      {department}
                    </option>
                  ))}
                </select>
              </>
            )}
            <button onClick={handleSubmit}>Submit</button>
          </>
        )}
      </div>
      <div className="right-part">
        {/* Horizontal scrolling list of COs */}
        <div className="co-list">
          {/* COs of all three departments */}
          <div className="co-department">
            <h2>Department A COs</h2>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
              Magnam eius, laborum velit quas neque tempora culpa corporis
               provident optio quae explicabo ex iure voluptates amet vel 
               adipisci tenetur laudantium. Iste?</p>
          </div>
          <div className="co-department">
            <h2>Department B COs</h2>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
              Magnam eius, laborum velit quas neque tempora culpa corporis
               provident optio quae explicabo ex iure voluptates amet vel 
               adipisci tenetur laudantium. Iste?</p>
          </div>
          <div className="co-department">
            <h2>Department C COs</h2>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
              Magnam eius, laborum velit quas neque tempora culpa corporis
               provident optio quae explicabo ex iure voluptates amet vel 
               adipisci tenetur laudantium. Iste?</p>
          </div>
        </div>
      </div>
      <div className="slide-buttons">
        <button onClick={() => slideDepartments(-1)}>Previous</button>
        <button onClick={() => slideDepartments(1)}>Next</button>
      </div>
    </div>
  );
}

export default YearSelector;
