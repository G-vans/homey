import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Properties from './components/Properties';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Item from './components/Item';
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



  return (
    <Router>
      <NavBar user={user} setUser={setUser} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='properties' element={<Properties user={user}/>} />
        
        <Route path='addproperty' element={<Create />} />
        <Route path='properties/edit/:id' element={<Create />} />
        <Route path='auth' element={<Auth onLogin={setUser} />} />
      </Routes>
    </Router>
  );
}

export default App;
