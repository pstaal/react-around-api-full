import React from 'react';
import { Link } from "react-router-dom";

function Login(props){
   
    const [newUser, setNewUser] = React.useState({ email: '', password: ''});

    function handleChange(e) {
      const { name, value } = e.target;
      setNewUser({...newUser, [name]: value});
    }


    function handleSubmit(e) {
      e.preventDefault();
      const { email, password } = newUser
      if (!email || !password) {
        return;
      }
      props.handleLogin(password, email)
    }
    
      return (
        <div className="login">
          <p className="login__title">
            Log In
          </p>
          <form onSubmit={handleSubmit} className="login__form">
            <input className="login__input" id="username" required name="email" type="text" value={newUser.username} onChange={handleChange} placeholder="Email"
            />
            <input className="login__input" id="password" required name="password" type="password" value={newUser.password} onChange={handleChange} placeholder="Password"
            />
            <div className="login__button-container">
              <button type="submit" className="login__button">
                Log in
              </button>
            </div>
          </form>
  
          
            <Link to="/signup" className="login__signup-link">
              Not a member yet? Sign up here!
            </Link>
          
        </div>
      );
   
}

export default Login;