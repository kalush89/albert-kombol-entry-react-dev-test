import { Component } from 'react';
import { Routes, Route } from 'react-router-dom';

import Category from './routes/category/category.component';
import Navigation from "./routes/navigation/navigation.component";
import ProductDesc from './routes/product-desc/product-desc.component';
import Cart from './routes/cart/cart.component';

class App extends Component {

  
  render(){
      return (
        <Routes>
          <Route path='/' element={<Navigation />}>
            <Route index element={<Category />} />
            <Route path='product-desc/*' element={<ProductDesc />} />
            <Route path='cart' element={<Cart />} />
          </Route>
      </Routes>
      );
  }
}

export default App;
