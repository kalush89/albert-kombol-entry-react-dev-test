import { Component } from "react";
import { connect } from "react-redux";
import { setMainImage, toggleFlash } from "../../store/cart/cart.action";

import Modal from "../modal/modal.component";

import AppIcons from "../../assets/app-icons/app-icons";


import "./cart-item-right.styles.scss";

class CartItemRight extends Component {
    constructor(props){
        super(props);
        this.state={
            showModal: false,
        }
    }

    toggleModal = () => {
        this.setState({
           showModal: !this.state.showModal
        })
    }

    handleIncrease = () =>{
        this.props.theProps.increaseItemCount(this.props.theProps.cartItem);
        this.props.theProps.updateCartTotal(this.props.selectedCurrency[0].currency.symbol);
        this.props.theProps.setTax();
        this.props.theProps.updateCartCount();
        this.props.toggleFlash();
       
        setTimeout(this.props.toggleFlash, 500);
     }

     handleDecrease = () =>{
        const item = this.props.theProps.cartItem;
        if(item.count === 1){
            this.toggleModal();
        }else{
            this.props.theProps.decreaseItemCount(item);
            this.props.theProps.updateCartTotal(this.props.selectedCurrency[0].currency.symbol);
            this.props.theProps.setTax();
            this.props.theProps.updateCartCount();
        }
     }

     handleRemoval = () =>{
        
            this.props.theProps.decreaseItemCount(this.props.theProps.cartItem);
            this.props.theProps.updateCartTotal(this.props.selectedCurrency[0].currency.symbol);
            this.props.theProps.setTax();
            this.props.theProps.updateCartCount();
            this.toggleModal();
    
     }

     index = 1;
     nextSlide = (images, uniqueAttributes) => {
        const imageCount = images.length;
        
        this.props.setMainImage(images[this.index], uniqueAttributes);
        this.index++;
        
        if(this.index === imageCount){
            this.index = 0;
        }
        
     }

     prevSlide = (images, uniqueAttributes) => {
        const imageCount = images.length;
        
        this.props.setMainImage(images[this.index], uniqueAttributes);
        
       if(this.index === 0) {
        this.index = imageCount -1;
      } else {
        this.index--;
      }
       
     }
     
    render(){
        const { count, gallery, uniqueAttributes } = this.props.theProps.cartItem;
        const { rightCartItemStyle, sliderMainImages} = this.props;
        const theImage = sliderMainImages.find(mainImage => mainImage.id === JSON.stringify(uniqueAttributes))?.image;
        
        return(
            
            <div className={rightCartItemStyle}>
                <Modal 
                    title={"Remove item"}
                    message={"Remove this item from the cart?"} 
                    isActive={this.state.showModal} 
                    toggleModal={this.toggleModal} 
                    handleRemoval={this.handleRemoval}
                    type="confirm"
                    />

                <div className="add-reduce">
                    <span className='add-quantity' onClick={() =>this.handleIncrease()}><AppIcons type={'plusIcon'} /></span>
                    <span className='item-count'>{count}</span>
                    <span className='reduce-quantity'  onClick={() =>this.handleDecrease()}><AppIcons type={'minusIcon'} /></span>
                    
                </div>
                <div className="image-slider">
                    <div className='item-image'
                  
                                style={{
                                    backgroundImage:`url(${theImage ?? gallery[0]})`,
                                }}
                            />
                   {
                    gallery.length > 1 ?
                        <div className="slider-nav">
                            <div className="nav-prev" onClick={() => this.prevSlide(gallery, JSON.stringify(uniqueAttributes))} ><AppIcons type={'arrowIcon'} /></div>
                            <div className="nav-next" onClick={() => this.nextSlide(gallery, JSON.stringify(uniqueAttributes))} ><AppIcons type={'arrowIcon'} /></div>
                        </div>
                    :''
                }
                </div>
                
            </div>

           
                    
            
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    
    return {
        setMainImage:(ownProps, ownProps1) => dispatch(setMainImage(ownProps, ownProps1)), 
        toggleFlash:() => dispatch(toggleFlash()),
    }
};

const mapStateToProps = (state) => {
    const { sliderMainImages } = state.cart;

    return {
        sliderMainImages: sliderMainImages,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartItemRight);