import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './styles/App.css';
import { products } from './data/products';
import { category } from './data/category';
import logo from './img/admiralC-58x58.png';
import Header from './components/Header/Header';
import Cart from './components/Cart/Cart';
import Home from './components/Home/Home';
import Shop from './components/Shop/Shop';
import ListingContainer from './components/ListingContainer';
import ProductDetails from './components/ProductDetails/ProductDetails';
import NotFound from './components/NotFound/NotFound';
import Footer from './components/Footer/Footer';

const getCategoryData = (string) => products.flatMap(
  (product) => (product.category === string) ? product : []
);

export default function App() {
  const [cartItemCount, setCartItemCount] = useState(0);
  const [cartData, setCartData] = useState([]);

  return (
    <div className='App'>
      <Header 
        logoSrc={logo}
        h1String="AdmiralBulldog's Merch"
      />
      <main>
        <Routes>
          <Route index element={<Home 
            punchLine='Get the best collection here'
          />} />
          <Route path='/shop' element={<Shop />}>
            <Route 
              index
              element={
                <ListingContainer 
                  data={products.flatMap(
                    product => (product.stocks > 0) 
                      ? product : []
                  )} 
                  message="Stock will not wait for you, so hurry."
              />}
            />
            <Route 
              path='all-products'
              element={<ListingContainer data={products}/>} 
            />
            {category.map((item, index) => 
              <Route 
                path={`${item}`}
                element={<ListingContainer data={getCategoryData(item)}/>}
                key={`${item}${index}`}
              />
            )}
          </Route>
          <Route 
            path={`shop/:category/:id`} 
            element={<ProductDetails />}
          />
          <Route path='cart' element={<Cart />} />
          <Route path='*' element={<NotFound subject='page'/>} />
        </Routes>
      </main>
      <Footer
        builder='L4ck (mrjgamboa)'
        link='https://github.com/mrjgamboa'
      />
    </div>
  );
};
