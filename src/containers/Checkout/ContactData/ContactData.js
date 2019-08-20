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
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-mail'
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'faster', displayValue: 'Faster'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: ''
            }
        },
        loading: false
    }

    componentDidMount() {
        console.log("ConD: ", this.props);
    }

    orderHandler = (event) => {
        event.preventDefault();

        this.setState({ loading: true });

        
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

    render() {
        const formElement = [];
        
        let form = (
            <form >
                <Input elementType="..." elementConfig="..." value="..." />
                <Button
                    btnType="Success"
                    clicked={this.orderHandler}>Order</Button>
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