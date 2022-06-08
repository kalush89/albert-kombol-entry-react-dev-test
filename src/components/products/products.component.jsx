import { Component } from "react";

import { runQuery, GET_ALL_PRODUCTS, GET_TECH_PRODUCTS, GET_CLOTH_PRODUCTS } from "../../utils/apollo/apollo.utils";

class Products extends Component {
    constructor(){
        super();
        this.state = {
            allProducts: [],
            techProducts: [],
            clothProducts: [],
            loadStatus: false,
        }
    }

componentDidMount() {
    const response = runQuery(GET_ALL_PRODUCTS);
    if(response){
        response.then(res => this.setState(()=>{
            return {
                allProducts: res.data.category.products
            }
        })).catch(error => {
            console.log(error);
          });; 
    }     
}

render(){
 const { allProducts } = this.state;
        return(
            <div>
               
                {allProducts.map(({id, name}) => (
                    <div key={id}>{name}</div>
        ))}
            </div>
        );
    }
}
export default Products;