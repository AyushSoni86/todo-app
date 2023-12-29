import { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

const authRequest = async (endpoint, data) => {
  try {
    const response = await axios.post(
      `http://localhost:5248/api/Authentication/${endpoint}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error(`Error in ${endpoint} request:`, error);
    throw error;
  }
};

const Auth = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [error, setError] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [isLogin, setIsLogin] = useState(true);

  const viewLogin = (status) => {
    setError(null);
    setIsLogin(status);
  };

  const handleSubmit = async (e, endpoint) => {
    e.preventDefault();
    if (!isLogin && password !== confirmPassword) {
      setError("Password is not Matching");
      return;
    }
    const authData = {
      username: isLogin ? null : name,
      email,
      password,
    };
    try {
      const data = await authRequest(endpoint, authData);
      console.log(`Successful ${isLogin ? "login" : "registration"}`, data);
      if(isLogin){

        setCookie("Email", data.email);
        setCookie("Name", data.name);
        setCookie("AuthToken", data.token);
        
        setTimeout(() => window.location.reload(), 5000);
      }

    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-container-box">
        <form>
          <h2>{isLogin ? "Please log in" : "Please sign up!"}</h2>
          {!isLogin && (
            <input
              type="text"
              placeholder="name"
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <input
            type="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {!isLogin && (
            <input
              type="password"
              placeholder="confirm password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          )}
          <input
            type="submit"
            className="create"
            onClick={(e) => handleSubmit(e, isLogin ? "login" : "register")}
          />
          {error && <p>{error}</p>}
        </form>
        <div className="auth-options">
          <button
            onClick={() => viewLogin(false)}
            style={{
              backgroundColor: !isLogin
                ? "rgb(255,255,255)"
                : "rgb(188,188,188)",
            }}
          >
            Sign Up
          </button>
          <button
            onClick={() => viewLogin(true)}
            style={{
              backgroundColor: isLogin
                ? "rgb(255,255,255)"
                : "rgb(188,188,188)",
            }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
