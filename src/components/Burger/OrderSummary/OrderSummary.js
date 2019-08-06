import React, { Component } from 'react';

import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    // The can be functional component, dosen't have to be class component.
    componentWillUpdate() {
        console.log("[OrderSummary] WillUpdate");
    }

    render() {

        const ingredientSummary = Object.keys(this.props.ingredients).map(igKey => {
            return <li key={igKey}>
                <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {this.props.ingredients[igKey]}
            </li>
        });

        return (
            <Auxiliary>
                <h3>Your order: </h3>
                <p>A delicious burger with the following ingredients: </p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkpoint?</p>
                <Button btnType="Danger" clicked={this.props.purchasCancelled}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchasContinued}>CONTINUE</Button>
            </Auxiliary>);
    }
}

export default OrderSummary;