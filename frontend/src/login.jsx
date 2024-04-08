import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function YearSelector() {
  const navigate = useNavigate();
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedYearInCollege, setSelectedYearInCollege] = useState(null);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1999 }, (_, index) => 2000 + index);
  const branches = ['Computer', 'IT', 'ENTC'];
  const yearsInCollege = ['First Year', 'Second Year', 'Third Year', 'Final Year'];

  const handleYearSelection = (e) => {
    setSelectedYear(parseInt(e.target.value));
    setSelectedBranch(null);
    setSelectedYearInCollege(null);
  };

  const handleBranchSelection = (e) => {
    setSelectedBranch(e.target.value);
    setSelectedYearInCollege(null);
  };

  const handleYearInCollegeSelection = (e) => {
    setSelectedYearInCollege(e.target.value);
    // navigate("/" + e.target.value.toLowerCase().replace(" ", "-")); // Navigate to the selected year page
    if(e.target.value=='First Year')
      navigate('/Comp');
    else if(e.target.value=='Second Year')
      navigate('/It');
    else
      navigate('/Entc');
  };

  return (
    <div>
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
          <h2>Select Branch:</h2>
          <select onChange={handleBranchSelection}>
            <option value="">Select Branch</option>
            {branches.map((branch) => (
              <option key={branch} value={branch}>
                {branch}
              </option>
            ))}
          </select>
        </>
      )}

      {selectedBranch && (
        <>
          <h2>Select Year in College:</h2>
          <select onChange={handleYearInCollegeSelection}>
            <option value="">Select Year in College</option>
            {yearsInCollege.map((yearInCollege) => (
              <option key={yearInCollege} value={yearInCollege} >
                {yearInCollege}
              </option>
            ))}
          </select>
        </>
      )}
    </div>
  );
}

export default YearSelector;
