import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {  
    
    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkoutSummary/contact-data');
    }

    render() {
        let summary = <Redirect to="/" />
        if(this.porps.ings) {
            summary = <div>
            <CheckoutSummary
                ingredients={this.props.ings}
                checkoutCancelled={this.checkoutCancelledHandler}
                checkoutContinued={this.checkoutContinuedHandler}
            />
            <Route
                path={this.props.match.path + "/contact-data"}
                component={ContactData} />
        </div>
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ings: state.BurgerBuilder.ingredients
    }
}

export default connect(mapStateToProps)(Checkout);