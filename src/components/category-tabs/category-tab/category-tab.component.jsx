import React, { Component } from "react";
import { connect } from 'react-redux';


import { Link } from "react-router-dom";

import { getProducts } from "../../../utils/tilework.utils";
import { getCategories } from "../../../utils/tilework.utils";
import { setAllProducts, setTechProducts, setClothProducts } from "../../../store/products/products.action";
import { setCategories } from "../../../store/categories/categories.action";



import Card from "../../card/card.component";

import './category-tab.styles.scss';


class CategoryTab extends Component {
   
async componentDidMount(){
    const categories = await getCategories();

    const all = await getProducts('all');
    const tech = await getProducts('tech');
    const clothes = await getProducts('clothes');
    
    this.props.setAllProducts(all.category.products);
    this.props.setTechProducts(tech.category.products);
    this.props.setClothProducts(clothes.category.products);
    this.props.setCategories(categories);
    
}

selectCategory = (category) => {

    if(category === 'all'){
        return this.props.all;
          
       }else if(category === 'tech'){
        return this.props.tech;
         
       }else if(category ==='clothes'){
        return this.props.clothes;
       }
  }

    render(){
        const { category } = this.props;
        const products = this.selectCategory(category);
       
        return(
            <div className="cat-tab-container">
                <span className="cat-tab-title">{category}</span>
                <div className="cat-products">
                    
                    {products.map((product, index)=>(
                        
                         <Link key={index} to="/product-description" className="link" state={{product:product}}>
                                <Card key={index} product={product} index={index}/>
                            </Link>
                        ))   
                    }
                    
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    const { allProducts } = state.products;
    const { techProducts } = state.products;
    const { clothProducts } = state.products;
    const { categories } = state.categories;
    return {
        all: allProducts,
        tech: techProducts,
        clothes: clothProducts,
        categories: categories,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        setAllProducts:(ownProps)=> dispatch(setAllProducts(ownProps)),
        setTechProducts:(ownProps)=> dispatch(setTechProducts(ownProps)),
        setClothProducts:(ownProps)=> dispatch(setClothProducts(ownProps)),
        setCategories:(ownProps)=> dispatch(setCategories(ownProps)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryTab);