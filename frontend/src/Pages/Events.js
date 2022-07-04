import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import moment from "moment";
const Event = () => {
  let [data, setData] = useState(null);
  useEffect(() => {
    let postBody = {
      query: `query {
          events {
            _id
            title
            description
            price
            date
          }
      }`,
    };
    fetch("http://localhost:3000/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postBody),
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("events", JSON.stringify(data.data.events));
        setData(data.data.events);
      })
      .catch((err) => {
        console.log("errorrrr");
        let data = localStorage.getItem("events");
        if (data) {
          setData(JSON.parse(data));
        }
      });
  }, []);
  return (
    <>
      <Table striped bordered hover className={"mt-5 ml-5 mr-5"}>
        <thead>
          <tr>
            <th>title</th>
            <th>description</th>
            <th>price</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((val) => {
              return (
                <tr>
                  <td>{val.title}</td>
                  <td>{val.description}</td>
                  <td>{val.price}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </>
  );
};
export default Event;
