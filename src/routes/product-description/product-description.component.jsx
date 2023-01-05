import React, { Component } from "react";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";

import { addToCart, updateCartTotal, updateCartCount, setAttribute, setTax, toggleFlash } from "../../store/cart/cart.action";
import { setProductDetailImg } from "../../store/products/products.action";

import SwatchPicker from "../../components/swatch-picker/swatch-picker.component";
import TextAttributePicker from "../../components/text-attribute-picker/text-attribute-picker.component";
import Button from "../../components/button/button.component";
import Modal from "../../components/modal/modal.component";

import { getCurrencyDetails, compare } from "../../utils/util";


import "./product-description.styles.scss";


class ProductDescription extends Component {
    constructor(props){
        super(props);
        this.state = {
            showModal: false
          };
    }
  

    componentDidMount(){
        window.scrollTo(0, 0)
        
       // pick default selected product image
        this.handleImgSelect(this.props.state.product.gallery[0]);
        
         //fill selectedAttributes object with default product attributes on component mount
         if(this.props.selectedAttributes.some(attribute => this.hasValue(attribute,'productId',this.props.state.product.id )) === false){
            this.props.setAttribute(this.props.state.product);
          }  
    }

    toggleModal =()=>{
        this.setState({
            showModal: !this.state.showModal
          });
    }

    hasValue = (obj, key, value) => {
        return obj.hasOwnProperty(key) && obj[key] === value;
       }

    
     selectedCurrency = getCurrencyDetails(this.props.state.product.prices, this.props.theCurrency[1]);

    handleAddToCart = () =>{
       
        this.props.addToCart(this.props.state.product);
        this.props.updateCartTotal(this.selectedCurrency[0].currency.symbol);
        this.props.setTax();
        this.props.updateCartCount();
        this.props.toggleFlash();
        setTimeout(this.props.toggleFlash, 500);
     }

     handleImgSelect = (img) => {
        this.props.setProductDetailImg(img);
     }

     handleAttributeSelect = (value) => {
        this.props.setAttribute(this.props.state.product, value);
     }

    render() {
       const {id, attributes, name, brand, description, gallery, inStock} = this.props.state.product;
       const selectedCurrency = getCurrencyDetails(this.props.state.product.prices, this.props.theCurrency[1]);
     
        return(
            <div className="product-description-container">
                <Modal 
                    title={"Not available"}
                    message={"Product not available at the moment"} 
                    isActive={this.state.showModal} 
                    toggleModal={this.toggleModal} 
                    handleRemoval=""
                    type="notify"
                />
                
            <aside className="thumbnails" >
                {gallery.map(image => {
                    return <div key={image} className="thumbnail" onClick={()=>this.handleImgSelect(image)}>
                        <div className="thumbnail-image" style={{
                            backgroundImage: `url(${image})`,
                        }}></div>
                    </div>
                })}
            </aside>
 
            <main className="large-image" style={{
                            backgroundImage: `url(${this.props.selectedImage})`,
                        }} ></main>
  
                
                <div className="description">
                
                    <div className="product-name">
                        <span className="brand">{brand}</span>
                        <span className="name">{name}</span>
                    </div>
                   
                    { attributes.slice(0).sort(compare).map(attribute =>(
                        <div key={attribute.id} className={`product-${attribute.id.toLowerCase()}`}>
                             <div className={`${attribute.id.toLowerCase()}-label`}>{attribute.id}</div>
                             <div className={`${attribute.id.toLowerCase()}-picker`}>
                                {attribute.items.map(item => (
                                    attribute.type === 'swatch'?
                                        <SwatchPicker key={item.id} theProductId={id} attributeId={attribute.id} 
                                        value={item.value} uniqueAttributes={this.props.selectedAttributes} selected={'large-selected'} normal={'large-normal'} product={this.props.state.product} />
                                        : 
                                        <TextAttributePicker key={item.id} theProductId={id} attributeId={attribute.id}
                                         value={item.value} uniqueAttributes={this.props.selectedAttributes} selected={'large-selected'} normal={'large-normal'} product={this.props.state.product} />     
                                ))}
                             </div> 
                        </div>
                    ))}
                    <div className="product-price">
                        <div className="price-label">price</div>
                        <div className="price-value">
                            <span className="cur-symbol">{selectedCurrency[0].currency.symbol}</span>
                            <span className="cur-amount">{selectedCurrency[0].amount}</span>
                        </div>
                    </div>
                    <div className="add-product-to-cart">
                     <Button buttonType={'Big'} type='button' onClick={()=>inStock === true ? this.handleAddToCart() : this.toggleModal()}>Add to cart</Button>
                    </div>
                    
                    <div className="product-description" dangerouslySetInnerHTML={{__html: description}}/>
                </div>
            </div>
        );
    }
}


const mapDispatchToProps = (dispatch) => {
    
    return {
        addToCart:(ownProps) => dispatch(addToCart(ownProps)),
        updateCartTotal:(ownProps) => dispatch(updateCartTotal(ownProps)),
        updateCartCount:(ownProps) => dispatch(updateCartCount(ownProps)),
        setAttribute:(ownProps) => dispatch(setAttribute(ownProps)),
        setProductDetailImg:(ownProps) => dispatch(setProductDetailImg(ownProps)),
        setTax:() => dispatch(setTax()),
        toggleFlash:() => dispatch(toggleFlash()),
    }
};

const mapStateToProps = (state) => {
    const { currencies } = state.currencies;
    const { theCurrency } = state.currencies;
    const { selectedImage } = state.products;
    const { selectedAttributes } = state.cart;
    

    return {
        currencies: currencies,
        theCurrency: theCurrency,
        selectedImage: selectedImage,
        selectedAttributes: selectedAttributes,
        //cartItems: items,
    }
}

const wrapClassInHook=(Component)=>{
    return function WrappedComponent(){
        const {state } = useLocation();
        return <Component state={state}/>;
    }
}

export default wrapClassInHook(connect(mapStateToProps, mapDispatchToProps)(ProductDescription));