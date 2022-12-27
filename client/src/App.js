import React, { Fragment, useState } from "react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import './App.css';
import Homenav from './components/homeHeader/homeHeader';
import Loginnav from './components/login/loginNav';
import Taketest from './components/quiz/takeTest';
import Login from './components/login/loginRegister';
import Dashboard from './components/dashboard/dashboard';
import Testresult from './components/quiz/testResult';
import Ques from './components/quiz/question';
import Register from "./components/login/register";

function App() {
  const [loggedin, setloggedin] = useState(false);

  let location = useLocation();
  return (
    <React.Fragment>
      <nav>
        {location.pathname !== "/test" ? (
          loggedin ? (
            <Loginnav setloggedin={setloggedin} />
          ) : (
            <Homenav setloggedin={setloggedin} />
          )
        ) : (
          <Fragment></Fragment>
        )}
      </nav>
      <main>
        <Routes>
          <Route exact path="/" element={<Taketest />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/abouttest" element={<Testresult />} />
          <Route exact path="/test" element={<Ques />} />
          <Route render={() => <Navigate to="/" />} />
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
