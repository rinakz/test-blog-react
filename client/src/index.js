import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './Redux/store';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Blog from './components/Blog';
import Navbar from './components/Navbar';
import My from './components/My';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <Navbar/>
    <Routes>
        <Route path='/' element={<Blog />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Login />}/>
        <Route path='/my' element={<My/>}/>
    </Routes>
    </Provider>
  </BrowserRouter> 
);
