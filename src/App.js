import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './styles/App.css';
import { products } from './data/products';
import logo from './img/admiralC-58x58.png';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Shop from './components/Shop/Shop';
import ListingContainer from './components/ListingContainer/ListingContainer';
import NotFound from './components/NotFound/NotFound';
import Footer from './components/Footer/Footer';

export default function App() {
  return (
    <div className='App'>
      <Header 
        logoSrc={logo}
        h1String="AdmiralBulldog's Merch"
      />
      <main>
        <Routes>
          <Route path='/' element={<Home 
            punchLine='Get the best collection here'
          />} />
          <Route path='/shop' element={<Shop />}>
            <Route 
              path='all' element={<ListingContainer />} 
            />
            <Route path='art-prints'/>
            <Route path='stickers'/>
            <Route path='mugs'/>
            <Route path='mouse-pads'/>
          </Route>
          <Route path='/shop:category:id' /> {/* route for single item */}
          {/* cart route here */}
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>
      <Footer
        builder='L4ck (mrjgamboa)'
        link='https://github.com/mrjgamboa'
      />
    </div>
  );
};
