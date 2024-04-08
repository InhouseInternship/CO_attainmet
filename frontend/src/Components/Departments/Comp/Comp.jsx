import React, { useState } from 'react';
import UT1Page from './Ut1';
import UT2Page from './Insem';
import EndsemPage from './Endsem';
import { useNavigate } from 'react-router-dom';
function App() {
  const [currentPage, setCurrentPage] = useState(null);
  const navigate = useNavigate();
  const handleNavigation = (page) => {
    navigate(page);
  };

  return (
    <div>
      <nav>
        <ul>
          <li onClick={() => handleNavigation('/Ut1')}>
            UT1
          </li>
          <li onClick={() => handleNavigation('/Insem')}>
            Insem
          </li>
          <li onClick={() => handleNavigation('/Ut2')}>
            UT1
          </li>
          <li onClick={() => handleNavigation('/Endsem')}>
            Endsem
          </li>
          <li onClick={() => handleNavigation('/Excelsheet')}>
            Excel sheet
          </li>
        </ul>
      </nav>

      {/* {currentPage === 'UT1' && <UT1Page />}
      {currentPage === 'Insem' && <UT2Page />}
      {currentPage === 'endsem' && <EndsemPage />} */}
    </div>
  );
}

export default App;
