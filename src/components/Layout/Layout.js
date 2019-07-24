import React from 'react';

import Auxiliary from '../../hoc/Auxiliary';
import styles from './Layout.module.css';

const layout = (props) => (
    <Auxiliary>
        <div>Toolbar, SideDrawer, Backdrop</div>
        <main className={styles.Content}>
            {props.children}
        </main>
    </Auxiliary>
);

export default layout;