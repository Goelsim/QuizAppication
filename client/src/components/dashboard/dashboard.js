import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import styles from './dashboard.css';
import Test from '../quiz/testElement';
import modalstyles from '../quiz/modal.css';
import teststyles from '../quiz/testElement.css';
import resultstyles from '../quiz/testResult.css';

const topics = [
  { id: 1, name: "<--select category-->" },
  { id: 18, name: "Science: Computers" },
  { id: 30, name: "Science: Gadgets" },
];

Modal.setAppElement("#root");
function Dashboard() {
  let history = useNavigate();
  if (!localStorage.getItem("auth-token")) {
    localStorage.clear();
    history.push("/");
  }
  const [tests, setTests] = useState([]);
  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const [topic, settopic] = useState("");
  const [expiry, setexpiry] = useState(new Date());

  const options = {
    headers: {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("auth-token"),
    },
  };

  useEffect(() => {
    axios
      .post("/api/test/gettests", {}, options)
      .then((res) => {
        for (let x of res.data) {
          for (let y of topics) {
            if (y["id"] === x["topic"]) x.topicname = y["name"];
          }
        }
        setTests(res.data);
      })
      .catch((err) => {
        if (!localStorage.getItem("auth-token")) history.push("/");
        else alert("couldn't fetch please reload");
      });
  }, [modalIsOpen, history, options]);

  const onSubmit = (event) => {
    event.preventDefault();
    axios
      .post(
        "/api/test/addtest",
        { topic, expiry, created: new Date() },
        options
      )
      .then((res) => {
        console.log("added");

        setmodalIsOpen(false);
      })
      .catch((err) => {
        console.log(err);
        alert("error!");
      });
  };

  return (
    <React.Fragment>
      <div>
        <h1
          className={styles.heading}
          style={{ background: "white", fontSize: "2em", padding: "2%" }}
        >
          Welcome {localStorage.getItem("name")}
        </h1>
      </div>
      <button
        className={styles.buttons}
        style={{ float: "left", display: "block" }}
        onClick={() => setmodalIsOpen(true)}
      >
        + Add Test
      </button>

      <br />
      <br />
      <br />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setmodalIsOpen(false)}
        className={modalstyles.modal}
        overlayClassName={modalstyles.overlay}
      >
        <Fragment>
          <h1 className={modalstyles.heading}>Create Test</h1>
          <form onSubmit={onSubmit}>
            <label className={modalstyles.labels} htmlFor="topic">
              Topic:
            </label>
            <select
              id="topic"
              name="topic"
              className={modalstyles.inputs}
              onChange={(e) => settopic(e.target.value.toString())}
            >
              {topics.map((obj) => (
                <option key={obj.id} value={obj.id}>
                  {obj.name}
                </option>
              ))}
            </select>
            <br />
            <label className={modalstyles.labels} htmlFor="expiry">
              Expiry:
            </label>
            <input
              type="date"
              id="expiry"
              name="expiry"
              className={modalstyles.inputs}
              onChange={(e) => setexpiry(e.target.value)}
            />
            <br />
            <button className={modalstyles.buttons} type="submit">
              Submit
            </button>
            <br />
          </form>
        </Fragment>
      </Modal>
      <div className={teststyles.parent}>
        <div className={resultstyles.row}>
          <div className={teststyles.element}>
            <strong>Pin</strong>
          </div>
          <div className={teststyles.element}>
            <strong>Topic</strong>
          </div>
          <div className={teststyles.element}>
            <strong>No. of Ques</strong>
          </div>
          <div className={teststyles.element}>
            <strong>Expiry</strong>
          </div>
        </div>
        <div className={styles.testcontainer}>
          {tests.map((obj) => (
            <Test key={obj._id} {...obj} />
          ))}
        </div>
      </div>
      <br />
      <br />
    </React.Fragment>
  );
}

export default Dashboard;