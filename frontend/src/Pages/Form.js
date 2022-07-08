import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setChangeEmail } from "../redux/action";
const OnBoarding = () => {
  let [authMode, setAuthMode] = useState("signin");

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin");
  };
  const EMAIL = useSelector((state) => state.AuthReducer.email);
  console.log("EMAIL", EMAIL);
  const dispatch = useDispatch();
  const onSubmit = (e) => {
    e.preventDefault();
    const {
      target: { password, email },
    } = e;
    // const requestBody = {
    //   query: `login(email:${email},password:${password}){}`,
    // };
    let requestBody;
    if (authMode === "signup") {
      requestBody = {
        query: `mutation{createUser(userInput:{email:"${email}",password:"${password}"}){
        _id email password
      }}`,
      };
    } else {
      requestBody = {
        query: `query{login(email:"${email}",password:"${password}"){
            userId token tokenExpiration
          }}`,
      };
    }

    fetch("http://localhost:3000/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((data) => console.log("data", data));
  };
  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={onSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="text-center">
            Not registered yet?{" "}
            <span className="link-primary" onClick={changeAuthMode}>
              {authMode.toUpperCase()}
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
              id="email"
              onChange={(e) => {
                dispatch(setChangeEmail(e.target.value));
              }}
              required
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              id="password"
              required
              className="form-control mt-1"
              placeholder="Enter password"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default OnBoarding;
