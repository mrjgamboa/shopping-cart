import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './styles/App.css';
import { products } from './data/products';
import { category } from './data/category';
import getObjectIndex from './utils/getObjectIndex';
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
  const [isUpdating, setIsUpdating] = useState(false);
  
  const updateLocalAndCart = (array) => {
    localStorage.setItem('localCartData', JSON.stringify(array));
    setCartData(array);
    setIsUpdating(true);
  };

  useEffect(() => {
    if (localStorage.getItem('localCartData') === null) {
      localStorage.setItem('localCartData', JSON.stringify([]));
    } else {
      const localCartData = JSON.parse(localStorage.getItem('localCartData'));
      setCartData(localCartData);
      setCartItemCount(
        localCartData.reduce(
          (prev, curr) => prev + curr.quantity, 0
      ));
    }
  }, []);

  useEffect(() => {
    if (isUpdating === true) {
      setCartItemCount(cartData.reduce(
        (prev, curr) => prev + curr.quantity, 0
      ));
      setIsUpdating(false);
    }
  }, [isUpdating, cartData]);

  const cartModule = (() => {
    const increment = index => {
      const data = cartData;
      const advanceQuantity = data[index].quantity + 1;
      const productIndex = getObjectIndex(products, data[index]);

      if(advanceQuantity <= products[productIndex].stocks) {
        data[index] = {
          ...data[index],
          quantity: advanceQuantity
        };
      }
      updateLocalAndCart(data);
    };

    const remove = index => {
      const updatedCartData = cartData;
      updatedCartData.splice(index, 1);
      updateLocalAndCart(updatedCartData);
    };
  
    const decrement = index => {
      const data = cartData;
      const totalQuantity = data[index].quantity - 1;
      if (totalQuantity > 0) {
        data[index] = {
          ...data[index], 
          quantity: totalQuantity
        };
        updateLocalAndCart(data);
      } else {
        remove(index);
      }
    };

    const add = object => {
      const index = getObjectIndex(cartData, object);
      if (index >= 0) {
        increment(index);
      } else {
        updateLocalAndCart([ ...cartData, object ]);
      }
    };

    const clear = () => updateLocalAndCart([]);

    return {
      increment,
      decrement,
      add,
      remove,
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
            element={<ProductDetails 
              module={cartModule} 
            />}
          />
          <Route path='cart' element={<Cart 
            data={cartData}
            module={cartModule}
          />} />
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
