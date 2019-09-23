import React, { Component } from 'react';
import { connect } from 'react-redux';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as actions from '../../store/actions/index';

export class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = { };
    // };

    state = {
        purchasing: false,
    };

    componentDidMount() {
       this.props.onInitIngredients();
    }

    updatePurchaseState = (ing) => {
        const sum = Object.keys(ing).map(igKey => {
            return ing[igKey];
        }).reduce((newSum, el) => {
            return newSum + el;
        }, 0); // if the initial is zero it can be omitted.
        return sum > 0;
    }

    purchasingHandler = () => {
        if (this.props.isAuth) {
            this.setState({
                purchasing: true
            });
        } else {
            this.props.onSetAuthRedirectPath('/checkoutSummary');
            this.props.history.push('/auth');
        }
    }

    purchasCancelHandler = () => {
        this.setState({
            purchasing: false
        });
    }

    purchasContinueHandler = () => {
        this.props.onPurchaseInit();
        this.props.history.push("/checkoutSummary");
    }

    render() {
        // const sum = Object.keys(this.props.ings).some(res => this.props.ings[res] > 0); // myverion, insted of updatePurchaseState

        const disabledInfo = {
            ...this.props.ings
        }

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;

        let burger = this.props.error ? <p>The ingredients are not loading.</p> : <Spinner />;

        if (this.props.ings) {
            burger = (
                <Auxiliary>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disableBtn={disabledInfo}
                        price={this.props.price}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchasingHandler}
                        isAuth={this.props.isAuth} />
                </Auxiliary>
            );
            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                price={this.props.price}
                purchasCancelled={this.purchasCancelHandler}
                purchasContinued={this.purchasContinueHandler} />;
        }

        return (
            <Auxiliary>
                <Modal show={this.state.purchasing} modalClosed={this.purchasCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxiliary>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        purchased: state.order.purchased,
        isAuth: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onPurchaseInit: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));