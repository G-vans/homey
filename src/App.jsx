import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Properties from './components/Properties';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Item from './components/Item';
import Cart from './components/Cart';
import { useEffect, useState } from 'react';
import './App.css';
import Create from './components/Create';
import Auth from './components/Auth';

function App() {

  // current user
  const [user, setUser] = useState(null)

  // login user automatically
  useEffect(() => {
    fetch("http://localhost:3000/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  // cart state
  const [cart, setCart] = useState([])

  // add Item to Cart
  function addToCart(item) {
    const filterCart = cart.filter((property) => property.id !== item.id)
    const newCart = [...filterCart, item]
    setCart(newCart)
  }

  // remove Item From Cart
  function removeFromCart(item) {
    const newCart = cart.filter((property) => property.id !== item.id)
    setCart(newCart)
  }

  // Function that updates item quantity in cart
  const handleChange = (item, d) => {
    const ind = cart.indexOf(item);
    const arr = cart;
    arr[ind].quantity += d;

    if (arr[ind].quantity === 0) {
      arr[ind].quantity = 1;
    }
    setCart([...arr]);
  };

  return (
    <Router>
      <NavBar user={user} setUser={setUser} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='properties' element={<Properties user={user}/>} />
        <Route path='properties/:id' element={<Item addToCart={addToCart} user={user} />} />
        <Route path='cart' element={<Cart cart={cart} removeItem={removeFromCart} handleChange={handleChange} />} />
        <Route path='addproperty' element={<Create />} />
        <Route path='properties/edit/:id' element={<Create />} />
        <Route path='auth' element={<Auth onLogin={setUser} />} />
      </Routes>
    </Router>
  );
}

export default App;
