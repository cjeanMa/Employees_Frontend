import React, { useEffect, useState } from 'react';
import EmployeeMain from './modules/employees/EmployeeMain';
import Navbar from './modules/general/Navbar';
import { getEmployees } from './services/employees.service';

function App() {

  return (
    <>
      <Navbar />
      <div className="container">
      <EmployeeMain></EmployeeMain>
      </div>
    </>
  );
}

export default App;
