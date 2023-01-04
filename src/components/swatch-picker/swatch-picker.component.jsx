import { Component } from "react";
import { connect } from "react-redux";

import { setAttribute } from "../../store/cart/cart.action";

import './swatch-picker.styles.scss';

class SwatchPicker extends Component {

    handleSelect = (product, attributeId, value) => {
        this.props.setAttribute(product, attributeId, value);
    };

    render(){
        const { theProductId, attributeId, value, selected, normal, product, uniqueAttributes } = this.props;
        
        const existingAttribute = uniqueAttributes.find(att => att.productId === theProductId && att.attributeItemValue === value && att.attributeId === attributeId);
    
        return(
            <div className="swatch-picker-container" onClick={()=> product && this.handleSelect(product, attributeId, value)}>
            <div className='item-frame'>
                    <div className={ existingAttribute ? selected : normal} style={{backgroundColor:value, borderColor: 'white'}}></div>
                </div>
                
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

export default connect(mapStateToProps, mapDispatchToProps)(SwatchPicker);