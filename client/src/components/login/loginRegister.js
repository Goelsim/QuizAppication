import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './login.css';
import Login from './login';
import Register from './register';

function LoginRegister(props) {
  let history = useNavigate();
  if (localStorage.getItem("loggedin")) history.push("/");
  return (
    <div className={styles.container}>
      <Login {...props} />
      <br></br>
      OR
      <Register />
    </div>
  );
}

export default LoginRegister;