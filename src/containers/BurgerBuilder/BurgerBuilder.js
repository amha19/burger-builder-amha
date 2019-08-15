import React, { Component } from 'react';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {

    //     };
    // };

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount() {
        axios.get('ingredients.json')
            .then(response => {
                this.setState({ ingredients: response.data });
            })
            .catch(error => {
                this.setState({ error: true });
            });
    }

    updatePurchaseState = (ing) => {
        const sum = Object.keys(ing).map(igKey => {
            return ing[igKey];
        }).reduce((newSum, el) => {
            return newSum + el;
        }, 0); // if the initial is zero it can be omitted.

        this.setState({
            purchasable: sum > 0
        });
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        });

        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        });

        this.updatePurchaseState(updatedIngredients);
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
        this.setState({
            loading: true
        });

        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Amha Desta',
                address: {
                    street: 'Teststreet 10',
                    zipCode: '38372',
                    country: 'Sweden'
                },
                email: 'example@test.com'
            },
            deliveryMethod: 'fastest'
        };

        axios.post('orders.json ', order)
            .then(response => {
                this.setState({
                    loading: false,
                    purchasing: false
                });
            }).catch(error => {
                this.setState({
                    loading: false,
                    purchasing: false
                });
                console.log(error);
            });
    }

    render() {

        const disabledInfo = {
            ...this.state.ingredients
        }

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let burger = this.state.error ? <p>The ingredients are not loading.</p> : <Spinner />;
        let orderSummary = null;

        if (this.state.ingredients) {
            burger = <Burger ingredients={this.state.ingredients} />;
            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}
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
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disableBtn={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    ordered={this.purchasingHandler} />
            </Auxiliary>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);