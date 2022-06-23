import React, { useState, createRef } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import gql from "graphql-tag";

const Form = (props) => {
  const radios = [
    { name: "Sign in", value: "1" },
    { name: "Sign up", value: "2" },
  ];
  const [radioValue, setRadioValue] = useState("1");

  const onSignup = (e) => {
    e.preventDefault();
    if (email.current.value && password.current.value) {
      let emailTemp = email.current.value;
      let passwordTemp = password.current.value;

      let requestBody = {
        "query": `mutation{createUser(userInput:{email:"${emailTemp}",password:"${passwordTemp}"}){_id email}}`,
      };

      fetch("http://localhost:3000/graphql", {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: { "Content-Type": "application/json" },
      });
    }
  };
  const email = createRef();
  const password = createRef();

  const onSignIn = (e) => {
    e.preventDefault();
    console.log(email.current.value);
    if (email.current.value && password.current.value)
      fetch("http://localhost:3000/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: {
          first_name: this.firstName.value,
        },
      });
  };
  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <ButtonGroup>
            {radios.map((radio, idx) => (
              <ToggleButton
                key={idx}
                id={`radio-${idx}`}
                type="radio"
                variant="outline-primary"
                name="radio"
                value={radio.value}
                checked={radioValue === radio.value}
                onChange={(e) => setRadioValue(e.currentTarget.value)}
              >
                {radio.name}
              </ToggleButton>
            ))}
          </ButtonGroup>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
              ref={email}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              ref={password}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button
              type="submit"
              onClick={(e) => (radioValue === "1" ? onSignIn(e) : onSignup(e))}
              className="btn btn-primary"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default Form;
