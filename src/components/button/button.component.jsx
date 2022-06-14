import { Component } from 'react';

import "./button.styles.scss";

export const BUTTON_TYPE_CLASSES = {
    primary: "primary",
    hollow: "hollow",
    tiny: "tiny",
    cart: "add-to-cart",
  };


class Button extends Component {

render(){
const { children, buttonType, ...otherProps } = this.props;
    return(
        <button className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
            {...otherProps} >
                {children}
        </button>
    );
}
}

export default Button;