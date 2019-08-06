import React from 'react';

import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../../Layout/Logo/Logo';
import styles from './SideDrawer.module.css';

const sideDrawer = (props) => {
    return (
        <div className={styles.SideDrawer}>
            <div className={styles.Logo}>
                <Logo />
            </div>
            <nav>
                <NavigationItems />
            </nav>
            
        </div>
    );
}

export default sideDrawer;