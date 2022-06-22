import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Bookings from "./Pages/Booking";
import Events from "./Pages/Events";
import Auth from "./Pages/Auth";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Redirect from="/" to="/auth" exact></Redirect>
        <Route path="/auth" component={Auth}></Route>
        <Route path="/bookings" component={Bookings}></Route>
        <Route path="/events" component={Events}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
