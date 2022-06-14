import { Component, Fragment } from "react";

import ProductContext from "../../../contexts/product.context";

import Card from "../../card/card.component";

import './category-tab.styles.scss';

class CategoryTab extends Component {
    static contextType = ProductContext;

    selectCategory = (category) => {
        if(category === 'all'){
            return this.context.allProducts;
        }else if(category === 'tech'){
            return this.context.techProducts;
        }else if(category ==='clothes'){
            return this.context.clothesProducts;
        }
    }

    render(){
        const { category } = this.props;
        console.log(category);
       
        const categorySelected = this.selectCategory(category);
        return(
            <div className="cat-tab-container">
                <span className="cat-tab-title">{category}</span>
                <div className="cat-products">
                    {categorySelected.map((product, index)=>(
                        <Card key={product.id} product={product} index={index}/>
                    ))}
                </div>
            </div>
        );
    }
}

export default CategoryTab;