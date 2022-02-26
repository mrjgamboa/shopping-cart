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

const getObjectIndex = (source, target) => source.findIndex(
  sourceChild => ((sourceChild.id === target.id)
    && (sourceChild.category === target.category))
);

export default function App() {
  const [cartItemCount, setCartItemCount] = useState(0);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (localStorage.getItem('localCartData') === null) {
      localStorage.setItem('localCartData', JSON.stringify([]));
    } else {
      const localCartData = JSON.parse(localStorage.getItem('localCartData'));
      setCartData([...localCartData]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('localCartData', JSON.stringify(cartData));
    setCartItemCount(cartData.reduce(
      (prev, curr) => prev + curr.quantity, 0
    ));
  }, [cartData]);

  const cartModule = (() => {
    const increment = (index) => {
      const updatedCartData = cartData;
      const totalQuantity = updatedCartData[index].quantity + 1;
      if (totalQuantity <= updatedCartData[index].stocks) {
        updatedCartData[index] = {
          ...updatedCartData,
          quantity: totalQuantity
        };
        setCartData([...updatedCartData]);
      }
    };
//! resume here
    const remove = () => {};
  
    const decrement = () => {};

    const add = (object) => {
      const index = getObjectIndex(cartData, object);
      if (index >= 0) {
        increment(index)
      } else {
        setCartData([ ...cartData, object ]);
      }
    };

    const newValue = () => {};
    const clear = () => {};

    return {
      increment,
      decrement,
      add,
      remove,
      newValue,
      clear
    };
  })();

  return (
    <div className='App'>
      <Header 
        logoSrc={logo}
        h1String="AdmiralBulldog's Merch"
        cartCount={cartItemCount}
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
                element={<ListingContainer data={
                  getCategoryData(item)
                }/>}
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
