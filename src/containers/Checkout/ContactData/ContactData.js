import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import styles from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {

    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();

        this.setState({ loading: true });

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
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
                this.setState({ loading: false });
            }).catch(error => {
                this.setState({ loading: false });
                console.log(error);
            });

        // console.log(this.props);
    }

    render() {
        let form = (
            <form >
                <input className={styles.Input} type="text" name="name" placeholder="Your Name" />
                <input className={styles.Input} type="email" name="email" placeholder="Your Email" />
                <input className={styles.Input} type="text" name="street" placeholder="Street" />
                <input className={styles.Input} type="text" name="postalCode" placeholder="Post Code" />
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