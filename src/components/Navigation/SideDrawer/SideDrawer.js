import React from 'react';

import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../../Layout/Logo/Logo';
import styles from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Auxiliary from '../../../hoc/Auxiliary';

const sideDrawer = (props) => {
    let attachedStyles = [styles.SideDrawer, styles.Close];

    if (props.open) {
        attachedStyles = [styles.SideDrawer, styles.Open];
    }

    return (
        <Auxiliary>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedStyles.join(' ')}>
                <div className={styles.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Auxiliary>
    );
}

export default sideDrawer;