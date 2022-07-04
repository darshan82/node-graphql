import React from "react";
import { Route, Switch } from "react-router-dom";

import Bookings from "./Booking";
import Events from "./Events";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { useHistory } from "react-router-dom";
function App() {
  let history = useHistory();
  return (
    <div>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Nav className="me-auto">
            <span
              onClick={() => {
                history.push("/bookings");
              }}
              style={{
                fontSize: 20,
                color: "white",
                marginRight: 15,
                cursor: "pointer",
              }}
            >
              Bookings
            </span>
            <span
              style={{
                cursor: "pointer",
                fontSize: 20,
                color: "white",
                marginRight: 15,
              }}
              onClick={() => {
                history.push("/events");
              }}
            >
              Events
            </span>
          </Nav>
        </Container>
      </Navbar>
      <Switch>
        <Route path="/bookings" exact component={Bookings}></Route>
        <Route path="/events" exact component={Events}></Route>
      </Switch>
    </div>
  );
}

export default App;
