import React from "react";
import AuthForm from "./Form";
import FormStore from "./FormMobx";
const Auth = () => {
  let store=new FormStore()
  return (
    <>
      <AuthForm  />
    </>
  );
};
export default Auth;
