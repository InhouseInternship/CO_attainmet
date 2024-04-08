import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import YearSelector from './login';
// import CalcComponent from './calc';
import Comp from './Components/Departments/Comp/Comp'
import IT from './Components/Departments/It'
import Entc from './Components/Departments/Entc'
import Ut1 from './Components/Departments/Comp/Ut1'
import Ut2 from './Components/Departments/Comp/Ut2'
import Insem from './Components/Departments/Comp/Insem'
import Endsem from './Components/Departments/Comp/Endsem'
import Excelsheet from './Components/Departments/Comp/Excelsheet'
function App() {
  return (
    <Router> {/* Wrap your Routes with Router */}
      <div>
        <Routes>
          <Route path="/" element={<YearSelector/>}></Route>
          {/* <Route path="/calc" element={<CalcComponent />} ></Route> */}
          <Route path="/Comp" element={<Comp/>} ></Route>
          <Route path="/It" element={<IT/>} ></Route>
          <Route path="/Entc" element={<Entc/>} ></Route>
          <Route path="/Ut1" element={<Ut1/>} ></Route>
          <Route path="/Ut2" element={<Ut2/>} ></Route>
          <Route path="/Insem" element={<Insem/>} ></Route>
          <Route path="/Endsem" element={<Endsem/>} ></Route>
          <Route path="/Excelsheet" element={<Excelsheet/>} ></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
