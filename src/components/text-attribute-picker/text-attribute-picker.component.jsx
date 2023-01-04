import { Component } from "react";
import { connect } from "react-redux";

import { setAttribute } from "../../store/cart/cart.action";

import './text-attribute-picker.styles.scss';

class TextAttributePicker extends Component {

    handleSelect = (product, attributeId, value) => {
        this.props.setAttribute(product, attributeId, value);
    }

    render(){
        const {theProductId, attributeId, value, uniqueAttributes, selected, normal, product } = this.props;
        const existingAttribute = uniqueAttributes.find(att => att.productId === theProductId && att.attributeItemValue === value && att.attributeId === attributeId);
    
        return(
            <div className="text-attribute-picker-container" onClick={()=> product && this.handleSelect(product, attributeId, value)}>
                 <div className={ (existingAttribute ? selected:normal)}>{this.props.value}</div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    
    return {
        setAttribute:(ownProp, ownProp1, ownProp2) => dispatch(setAttribute(ownProp, ownProp1, ownProp2)),
    }
};

const mapStateToProps = state => {
    const { selectedAttributes } = state.cart;

    return {
        selectedAttributes: selectedAttributes,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TextAttributePicker);
