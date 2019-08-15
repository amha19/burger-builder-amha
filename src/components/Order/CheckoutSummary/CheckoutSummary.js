import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import styles from './CheckoutSummary.module.css';

const checkoutSummary = (props) => {
    return (
        <div className={styles.CheckoutSummary}>
            <h1>We hope it tastes good!</h1>
            <div style={{ width: '100%', magrin: 'auto' }}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button
                btnType="Danger"
            >CANCEL</Button>
            <Button
                btnType="Success"
            >CONTINUE</Button>
        </div>
    );
}

export default checkoutSummary;