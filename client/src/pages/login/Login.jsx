import { useRef } from "react";
import "./login.css"
import {Link} from "react-router-dom";
import { Context } from "../../context/Context";
import { useContext } from "react";
import axios from "axios";
export default function Login() {
  const userRef=useRef();
  const passwordRef=useRef();
  const {dispatch,isFetching}=useContext(Context)
 


  const handleSubmit=async(e)=>{
    e.preventDefault()
    dispatch({type:"LOGIN_START"})
    try{
        const res=await axios.post("/auth/login",{
          //passing data in post
          username:userRef.current.value,
          password:passwordRef.current.value,
        });
        dispatch({type:"LOGIN_SUCCESS",payload:res.data});
    }catch(err){
      dispatch({type:"LOGIN_FAILURE"});
    }
  };

  return (
    <div className="login">
        <span className="loginTitle">Login</span>
        <form className="loginForm" onSubmit={handleSubmit}>
            <label className="loginLabel">Username</label>
            <input 
            type="text" 
            className="loginInput" 
            placeholder="Enter your Username..."
            ref={userRef}
            />
            <label className="loginLabel">Password</label>
            <input 
            type="password" 
            placeholder="Enter your password..."
            ref={passwordRef}
            />
            <button className="loginButton" type="submit" disabled={isFetching}>Login</button>
        </form>
        <span className="b3">New user?
        <button className="loginRegisterButton">
        <Link className="link" to="/register">Register</Link>
        </button>
        </span>
    </div>
  )
}
