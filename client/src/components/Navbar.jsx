import React, {useState} from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { actionLogin, actionLogout } from '../Redux/action';


function Navbar() {
  
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('/check').then((res) => res.json()).then((res) => dispatch(actionLogin(res)));
  }, []);
  

  const nav = useNavigate()

  const { authuser } = useSelector(s=>s)

  const handleLogout = () => {
    fetch('/logout')
      .then(() => {
        dispatch(actionLogout());
				nav('/')
      })
      .catch(console.log);
    };


  return (
    <div className='nav'>
      <div className='home'>
        <Link to='/'>BLOG</Link>
      </div>
      <div className='auth'>
        {!authuser && <Link to='/register'>AUTHORIZATION</Link>}
        {authuser && <Link to='/' onClick={handleLogout}>LOGOUT</Link>}          
        {authuser && <a>/</a>}
        {authuser && <Link to='/my'>{authuser.name}</Link>}
      </div>
    </div>
  )
}

export default Navbar
