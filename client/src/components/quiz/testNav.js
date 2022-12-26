import React from 'react';
import styles from './testNav.css';

function TestNav(props) {
  return (
    <div className={styles.header}>
      <div className={styles.navitems}>
        <div></div>
        <div className={styles.submit} onClick={props.submithandler}>
          Submit
        </div>
      </div>
    </div>
  );
}

export default TestNav;