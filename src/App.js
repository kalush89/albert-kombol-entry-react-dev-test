import { Component } from 'react';
import { Routes, Route, Switch } from 'react-router-dom';

import Category from './routes/category/category.component';
import Navigation from "./routes/navigation/navigation.component";
import ProductDescription from './routes/product-description/product-description.component';
import Cart from './routes/cart/cart.component';
import CategoryTab from './components/category-tabs/category-tab/category-tab.component';

class App extends Component {

  
  render(){
      return (
        <Routes>
          <Route path='/' element={<Navigation />}>
            <Route index element={<Category />} />
            <Route path='product-description/*' element={<ProductDescription />} />
            <Route path='cart' element={<Cart />} />
            <Route path='all' element={<Category><CategoryTab category={'all'}/></Category>}/>
            <Route path='tech' element={<Category><CategoryTab category={'tech'}/></Category>}/>
            <Route path='clothes' element={<Category><CategoryTab category={'clothes'}/></Category>}/>
          </Route>
      </Routes>
      );
  }
}

export default App;
