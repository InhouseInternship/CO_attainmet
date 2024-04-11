import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './HomePage'
import FirstYear from './Components/Departments/FirstYear/FirstYear'
import FirstYear_home from './Components/Departments/FirstYear/FirstYear_home'
import FirstYear_endsem from './Components/Departments/Exams/Endsem'
import FirstYear_insem from './Components/Departments/Exams/Insem'
import Computer from './Components/Departments/Computer/Computer'
import Entc from './Components/Departments/Entc/Entc'
import It from './Components/Departments/It/It'
import Exam_homepage from './Components/Departments/Exams/Exam_homepage'
import Ut1 from './Components/Departments/Exams/Ut1'
import Ut2 from './Components/Departments/Exams/Ut2'
function App() {
  return (
    <Router> {/* Wrap your Routes with Router */}
      <div>
        <Routes>
          <Route path="/" element={<HomePage/>}></Route>
          <Route path="/FirstYear" element={<FirstYear/>}></Route>
          <Route path="/FirstYear_home" element={<FirstYear_home/>}></Route>
          <Route path="/FirstYear_endsem" element={<FirstYear_endsem/>}></Route>
          <Route path="/FirstYear_insem" element={<FirstYear_insem/>}></Route>
          <Route path="/Computer" element={<Computer/>}></Route>
          <Route path="/Entc" element={<Entc/>}></Route>
          <Route path="/It" element={<It/>}></Route>
          <Route path="/Exam_homepage" element={<Exam_homepage/>}></Route>
          <Route path="/Ut1" element={<Ut1/>}></Route>
          <Route path="/Ut2" element={<Ut2/>}></Route>
      </Routes>
      </div>
    </Router>
  );
}

export default App;
