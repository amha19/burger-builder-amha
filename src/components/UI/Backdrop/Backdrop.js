import React from 'react';

import styles from './Backdrop.module.css';
// import Modal from '../Modal/Modal';
// import Auxiliary from '../../../hoc/Auxiliary';

const backdrop = (props) => (
    props.show ? <div className={styles.Backdrop} onClick={props.clicked}></div> : null
);

export default backdrop;