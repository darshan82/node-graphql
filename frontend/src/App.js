import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import AuthorizedPages from "./Pages/AuthorizedPages";
import Auth from "./Pages/Auth";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Redirect from="/" to="/auth" exact></Redirect>
        <Route path="/auth" component={Auth}></Route>

        <Route path="/" component={AuthorizedPages}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
