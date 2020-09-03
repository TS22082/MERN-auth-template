import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Register = (props) => {
  const [form, setForm] = useState();
  let history = useHistory();

  useEffect(() => {
    if (props.user.email) history.push("/");
  }, [props.user.email, history]);

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const signup = (e) => {
    e.preventDefault();
    axios.post("/api/signup", form).then((res) => {
      console.log(res.data);
      props.setUser(res.data);
    });
  };

  return (
    <form onSubmit={signup}>
      <input type="text" onChange={onChange} name="email" />
      <input type="text" onChange={onChange} name="password" />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
