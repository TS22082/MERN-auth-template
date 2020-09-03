import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

const Home = (props) => {
  let history = useHistory();

  useEffect(() => {
    props.user.email ? console.log("logged in") : history.push("/login");
  }, [props.user.email, history]);

  return (
    <div>
      <h1>User email: {props.user.email}</h1>
      <h1>User id: {props.user.id}</h1>
    </div>
  );
};

export default Home;
