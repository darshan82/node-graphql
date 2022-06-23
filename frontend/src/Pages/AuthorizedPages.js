import React from "react";
import { Route, Switch } from "react-router-dom";

import Bookings from "./Booking";
import Events from "./Events";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  return (
    <div>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Nav className="me-auto">
            <Nav.Link href="/bookings">Bookings</Nav.Link>
            <Nav.Link href="/events">Events</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Switch>
        <Route path="/bookings" component={Bookings}></Route>
        <Route path="/events" component={Events}></Route>
      </Switch>
    </div>
  );
}

export default App;
