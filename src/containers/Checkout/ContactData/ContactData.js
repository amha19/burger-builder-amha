import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import styles from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as orderActions from '../../../store/actions/index';
import { updateObject, checkValidity } from '../../../shared/utility';

class ContactData extends Component {

    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5,
                    isNumeric: true
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true
            }
        },
        isAllValied: false
    }
    
    orderHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (let formElemIdentifier in this.state.orderForm) {
            formData[formElemIdentifier] = this.state.orderForm[formElemIdentifier].value;
        }

        const order = {
            ingredients: this.props.ings,
            price: this.props.price.toFixed(2),
            orderData: formData,
            userId: this.props.userId
        }
        
        this.props.onOrderBurger(order, this.props.token);
        // setTimeout(() => {
        //     this.props.history.push("/");
        // }, 900);
       
    }    

    inputChangeHandler = (event, inputIdentifier) => {
        /** if i choose not to use the utility function.    */
        // const updatedOrderForm = { ...this.state.orderForm };
        // const updatedElement = { ...updatedOrderForm[inputIdentifier] };
        // updatedElement.value = event.target.value;
        // updatedElement.valid = this.checkValidity(updatedElement.value, updatedElement.validation);
        // updatedElement.touched = true;
        // updatedOrderForm[inputIdentifier] = updatedElement;
        
        const updatedElement = updateObject(this.state.orderForm[inputIdentifier], {
           value:  event.target.value,
           valid: checkValidity(event.target.value, this.state.orderForm[inputIdentifier].validation),
           touched: true
        });

        const updatedOrderForm = updateObject(this.state.orderForm, {
            [inputIdentifier]: updatedElement
        });

       let isValid = true;
        for(let inIdentifier in updatedOrderForm) {
            isValid = updatedOrderForm[inIdentifier].valid && isValid;
        }

        this.setState({ orderForm: updatedOrderForm, isAllValied: isValid });
    }

    render() {
        const formElementArray = [];
        for (let key in this.state.orderForm) {
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = (
            <form >
                {formElementArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalied={!formElement.config.valid}
                        touched={formElement.config.touched}
                        shouldValidate={formElement.config.validation}
                        changed={(event) => this.inputChangeHandler(event, formElement.id)} />
                ))}
                <Button                    
                    btnType="Success"
                    clicked={this.orderHandler}
                    disabled={!this.state.isAllValied}>Order</Button>
            </form>
        );

        if (this.props.loading) {
            form = <Spinner />
        }
        
        return (
            <div className={styles.ContactData}>
                <h3>Enter your Contact Data</h3>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        purchased: state.order.purchased,
        token: state.auth.token,
        userId: state.auth.userId
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(orderActions.purchaseBurger(orderData, token)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios)); 