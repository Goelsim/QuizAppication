import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import teststyles from './testElement.css';
import axios from 'axios';
import Resultelement from './resultElement';
import styles from '../dashboard/dashboard.css';
import resultstyles from './testResult.css';

function Testresult(props) {
  let history = useNavigate();

  const [result, setresult] = useState([]);

  useEffect(() => {
    const options = {
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
    };
    axios
      .post("/api/test/getresults", { pin: props.location.state.pin }, options)
      .then((res) => setresult(res.data))
      .catch((err) => {
        console.log(err);
        alert("Couldn't Fetch!");
        history.push("/dashboard");
      });
  }, [history, props.location.state.pin]);
  return (
    <Fragment>
      <div>
        <h1
          className={teststyles.heading}
          style={{ background: "white", fontSize: "2em", padding: "2%" }}
        >
          Welcome {localStorage.getItem("name")}
        </h1>
      </div>
      <button
        className={styles.buttons}
        style={{ float: "left", display: "block" }}
        onClick={() => history.goBack()}
      >
        &lt;- Back
      </button>
      <br />
      <br />
      <br />
      <br />
      <div className={teststyles.container}>
        <div className={resultstyles.info}>
          <h1 style={{ textAlign: "center" }}> About Test</h1>
          <strong>Pin: </strong> {props.location.state.pin}
          <br />
          <strong>Topic: </strong> {props.location.state.topicname}
        </div>
        <div className={resultstyles.parent}>
          <div className={resultstyles.resultrow}>
            <div className={teststyles.element}>
              <strong>Name</strong>
            </div>
            <div className={teststyles.element}>
              <strong>Email</strong>
            </div>
            <div className={teststyles.element}>
              <strong>Score</strong>
            </div>
          </div>
          {result.length === 0 ? (
            <div className={resultstyles.resultrow}>
              <div
                className={teststyles.element}
                style={{ gridColumnStart: "2" }}
              >
                No result found!
              </div>
            </div>
          ) : (
            result.map((obj) => <Resultelement key={obj._id} {...obj} />)
          )}
        </div>
      </div>
    </Fragment>
  );
}

export default Testresult;