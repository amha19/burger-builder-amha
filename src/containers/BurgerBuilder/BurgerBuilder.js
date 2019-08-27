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
import * as actionTypes from '../../store/actions';


class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {

    //     };
    // };

    state = {
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount() {
        console.log("burgerBuil: ", this.props.ings);

        // axios.get('ingredients.json')
        //     .then(response => {
        //         this.setState({ ingredients: response.data });
        //     })
        //     .catch(error => {
        //         this.setState({ error: true });
        //     });

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
        this.setState({
            purchasing: true
        });
    }

    purchasCancelHandler = () => {
        this.setState({
            purchasing: false
        });
    }

    purchasContinueHandler = () => {
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

        let burger = this.state.error ? <p>The ingredients are not loading.</p> : <Spinner />;
        let orderSummary = null;

        if (this.props.ings) {
            burger = <Burger ingredients={this.props.ings} />;
            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                price={this.props.price}
                purchasCancelled={this.purchasCancelHandler}
                purchasContinued={this.purchasContinueHandler} />;
            if (this.state.loading) {
                orderSummary = <Spinner />;
            }
        }

        return (
            <Auxiliary>
                <Modal show={this.state.purchasing} modalClosed={this.purchasCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
                <BuildControls
                    ingredientAdded={this.props.onIngredientAdded}
                    ingredientRemoved={this.props.onIngredientRemoved}
                    disableBtn={disabledInfo}
                    price={this.props.price}
                    purchasable={this.updatePurchaseState(this.props.ings)}
                    ordered={this.purchasingHandler} />
            </Auxiliary>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
        onIngredientRemoved: (ingName) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));