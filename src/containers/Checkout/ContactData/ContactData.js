import React, { Component } from 'react';
// import { withRouter } from 'react-router-dom';

import Button from '../../../components/UI/Button/Button';
import styles from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

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
                    maxLength: 5
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
                    placeholder: 'Your E-mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'faster', displayValue: 'Faster' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                value: 'faster',
                valid: true,
                validation: {}
            }
        },
        isAllValied: false,
        loading: false
    }

    componentDidMount() {
        console.log("ConD: ", this.props);
    }

    orderHandler = (event) => {
        event.preventDefault();

        this.setState({ loading: true });

        const formData = {};
        for (let formElemIdentifier in this.state.orderForm) {
            formData[formElemIdentifier] = this.state.orderForm[formElemIdentifier].value;
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
        }
        console.log("formData: ", formData);

        axios.post('orders.json ', order)
            .then(response => {
                this.setState({ loading: false });
                this.props.history.push("/");
            }).catch(error => {
                this.setState({ loading: false });
                console.log(error);
            });

        // console.log(this.props);
    }

    checkValidity = (value, rules) => {
        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        return isValid;
    }

    inputChangeHandler = (event, inputIdentifier) => {
        const updatedOrderForm = { ...this.state.orderForm };
        const updatedElement = { ...updatedOrderForm[inputIdentifier] };

        updatedElement.value = event.target.value;
        updatedElement.valid = this.checkValidity(updatedElement.value, updatedElement.validation);
        updatedElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedElement;

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

        if (this.state.loading) {
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

export default ContactData; 