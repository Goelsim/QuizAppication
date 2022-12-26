import React from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import styles from './testElement.css';

function Testelement(props) {
  let expiry = new Date(props.expiry);
  return (
    <Fragment>
      <Link
        to={{ pathname: "/abouttest", state: { ...props } }}
        style={{ textDecoration: "none", color: "black" }}
      >
        <div className={styles.row}>
          <div className={styles.element}>
            <span className={styles.mobileinfo}>
              <strong>Pin : </strong>
            </span>
            {props.pin}
          </div>
          <div className={styles.element}>
            <span className={styles.mobileinfo}>
              <strong>Topic : </strong>
            </span>
            {props.topicname}
          </div>
          <div className={styles.element}>
            <span className={styles.mobileinfo}>
              <strong>Expiry : </strong>
            </span>
            {expiry.getDate()}-{expiry.getMonth()}-{expiry.getFullYear()}
          </div>
        </div>
      </Link>
    </Fragment>
  );
}

export default Testelement;