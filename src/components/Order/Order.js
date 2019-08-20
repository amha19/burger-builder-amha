import React from 'react';

import styles from './Order.module.css';

const order = (props) => {
    let ingredients = [];

    for (let ingName in props.ingredients) {
        ingredients.push({
            name: ingName,
            price: props.ingredients[ingName]
        });
    }

    const ingOutput = ingredients.map(ing => {
        return <span 
            className={styles.IngOutput}
            key={ing.name}>{ing.name} - {ing.price}</span>;
    });

    return (        
        <div className={styles.Order}>
            <p>Ingredients: {ingOutput}</p>
            <p>Price: <strong>USD {props.price.toFixed(2)}</strong></p>
        </div>
    );
};

export default order;