import React from 'react';
import { Link } from "react-router-dom";

function Register(props){
    const [newUser, setNewUser] = React.useState({ email: '', password: ''});
 
    function handleChange(e) {
      const { name, value } = e.target;
      setNewUser({...newUser, [name]: value});
    }


    function handleSubmit(e) {
      e.preventDefault();
        const { email, password } = newUser
        props.handleRegister(password, email);
    }
    
      return (
        <div className="login">
          <p className="login__title">
            Sign up
          </p>
          <form onSubmit={handleSubmit} className="login__form">
            <input className="login__input" id="username" required name="email" type="text" value={newUser.email} onChange={handleChange} placeholder="Email"
            />
            <input className="login__input" id="password" required name="password" type="password" value={newUser.password} onChange={handleChange} placeholder="Password"
            />
            <div className="login__button-container">
              <button type="submit" className="login__button">
                Sign up
              </button>
            </div>
          </form>
  
          
            <Link to="/signin" className="login__signup-link">
              Already a member? Log in here!
            </Link>
          
        </div>
      );
}

export default Register; 