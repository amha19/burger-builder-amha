import React from 'react';

import styles from './Input.module.css'

const input = (props) => {
    let inputElement = null;
    let inputClass = [styles.InputElement];

    if(props.invalied && props.shouldValidate && props.touched) {
        inputClass.push(styles.Invalied);
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input className={inputClass.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />
            break;
        case ('textarea'):
            inputElement = <textarea className={inputClass.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />
            break;
        case ('select'):
            inputElement = (
                <select
                    className={inputClass.join(' ')}
                    value={props.value} 
                    onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>);
            break;
        default:
            inputElement = <input className={inputClass.join(' ')}
                {...props.elementConfig}
                value={props.value} />
    }

    let validationError = null;
    if(props.invalied && props.touched) {
        validationError = <p className={styles.ValidationError}>Please inster the correct {props.elementType}!</p>
    }
    return (
        <div className={styles.Input}>
            <label className={styles.Label}>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    );
}

export default input;