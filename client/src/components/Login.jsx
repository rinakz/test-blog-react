import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { actionLogin } from '../Redux/action';

const Login = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [form, setForm] = useState({});
  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const [login, setLogin] = useState(true);
  const toggle = function (e) {
    e.preventDefault();
    setLogin((prev) => !prev);
  };

  const authHeader = useRef();

  const loginSubmit = (e) => {
    e.preventDefault();
    fetch('/login', {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((res) => {
        dispatch(actionLogin(res));
        nav('/');
      })
      .catch(console.log)
      .finally(() => {
        setForm({});
        e.target.reset();
      });
  };
  const regSubmit = (e) => {
    e.preventDefault();
    fetch('/register', {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((res) => {
        dispatch(actionLogin(res));
        nav('/');
      })
      .catch(console.log)
      .finally(() => {
        setForm({});
        e.target.reset();
      });
  };
  
  return (
    <div className="loginContainer">
        {login ? (
          <form className="authForm" onSubmit={regSubmit}>
            <h1 ref={authHeader}>JOIN OUR BLOG!</h1>
            <h4>If you already have an account <a onClick={(e) => {
                  authHeader.current.classList.toggle('authtoggle');
                  toggle(e);
                }}>LOGIN</a></h4>
            <p type="Name:">
              Your Name
              <input
                type="text"
                name="name"
                value={form.name || ''}
                onChange={handleChange}
              ></input>
            </p>
            <p type="Email:">
              Your E-mail
              <input
                type="email"
                name="email"
                value={form.email || ''}
                onChange={handleChange}
              ></input>
            </p>
            <p type="Password:">
              Your Password
              <input
                type="password"
                name="password"
                value={form.password || ''}
                onChange={handleChange}
              ></input>
            </p>
            <div className="authBtns">
              <button type="submit">REGISTER</button>
            </div>
          </form>
        ) : (
          <form className="authForm" onSubmit={loginSubmit}>
            <h1 ref={authHeader}>Welcome!</h1>
            <h4>If you don't have an account <a onClick={(e) => {
                  authHeader.current.classList.toggle('authtoggle');
                  toggle(e);
                }}>REGISTER</a></h4>
            <p type="Email:">
              Your E-mail
              <input
                type="email"
                name="email"
                value={form.email || ''}
                onChange={handleChange}
              ></input>
            </p>
            <p type="Password:">
              Your Password
              <input
                type="password"
                name="password"
                value={form.password || ''}
                onChange={handleChange}
              ></input>
            </p>
            <div className="authBtns">
              <button type="submit">LOGIN</button>
            </div>
          </form>
        )}
      </div>
  );
};

export default Login;
