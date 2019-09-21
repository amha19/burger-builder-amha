import React from 'react';

import styles from './NavigationItems.module.css';
import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={styles.NavigationItems}>
        <NavigationItem link="/" exact>Burger Builder</NavigationItem>
        {props.isAuth ? <NavigationItem link="/orders">Orders</NavigationItem> : null}
        {
            props.isAuth ? <NavigationItem link="/logout">Logout</NavigationItem> :
                <NavigationItem link="/auth">Authentication</NavigationItem>
        }

    </ul>
);

export default navigationItems;