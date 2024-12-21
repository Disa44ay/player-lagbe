import React, { useContext, useState } from "react";
import "./LoginPopUp.css";
import { assets } from "../../assets/assets";
import { Storecontext } from "../../Context/StoreContext";
import axios from "axios"


const LoginPopUp = ({ setShowLogin }) => {

  const {url,setToken} = useContext(Storecontext)

  const [currentState, setCurrState] = useState("Login");
  const [data,setData] = useState({
    name:"",
    email:"",
    password:""
  })

  const onChangehandler = (event) =>{
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  }

  const onLogin = async(event) => {
    event.preventDefault();

    //api call
    let newUrl = url;
    if(currentState === 'Login'){
      newUrl += "/api/user/login"
    }else{
      newUrl += "/api/user/register"
    }
    const response = await axios.post(newUrl,data);
    
    if(response.data.success){
      setToken(response.data.token);
      localStorage.setItem("token",response.data.token);
      setShowLogin(false)
    }else{
      alert(response.data.message)
    }
  }


  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.icon_cross_white}
            alt="Close popup"
            role="button"
            aria-label="Close login popup"
          />
        </div>

        <div className="login-popup-input">
          {currentState === "Login"?<></>:
            <input name ='name' onChange={onChangehandler} value={data.name} type="text" placeholder="Your Name" required />
          }
          <input name ='email' onChange={onChangehandler} value={data.email} type="email" placeholder="Your Email" required />
          <input name ='password' onChange={onChangehandler} value={data.password} type="password" placeholder="Password" required />
        </div>

        <button type="submit">
          {currentState === "Sign Up" ? "Create Account" : "Login"}
        </button>

        <div className="login-popup-condition">
          <label>
            <input type="checkbox" required />
            By continuing, I agree to the Terms of Use & Privacy Policy
          </label>
        </div>

        <p>
          {currentState === "Login" ? (
            <>
              Create a new account?{" "}
              <span onClick={() => setCurrState("Sign Up")}>Click here</span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span onClick={() => setCurrState("Login")}>Login here</span>
            </>
          )}
        </p>
      </form>
    </div>
  );
};

export default LoginPopUp;
