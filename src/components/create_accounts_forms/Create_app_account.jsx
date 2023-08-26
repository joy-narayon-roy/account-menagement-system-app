import React, { Component } from "react";
import Input_container from "../Input_container";
import { useAuthor } from "../../contexts/AuthorContext";
import { Navigate, useLocation } from "react-router-dom";

export class App_account_create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      app_name: "",
      user_name: "",
      email_address: "",
      phone_number: "",
      password: "",
    };
  }

  handel_input = ({ target }) => {
    let { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  save_it = () => {
    console.log("Saveing");
  };

  update_it = () => {
    console.log("Updateing");
  };

  render() {
    let { handel_input } = this;
    let { app_name, user_name, email_address, phone_number, password } =
      this.state;
    return (
      <>
        <Input_container
          title="App Name :"
          input_placeholder="Enter App Name"
          input_name="app_name"
          on_input={handel_input}
          input_value={app_name}
        />
        <Input_container
          title="User Name :"
          input_placeholder="Enter User name"
          input_name="user_name"
          on_input={handel_input}
          input_value={user_name}
        />
        <Input_container
          title="Email Aderess :"
          input_placeholder="Enter Email Adress"
          input_name="email_address"
          on_input={handel_input}
          input_value={email_address}
        />
        <Input_container
          title="Phone Number :"
          input_placeholder="Enter Phone Number"
          input_name="phone_number"
          on_input={handel_input}
          input_value={phone_number}
        />
        <Input_container
          title="Password :"
          input_placeholder="Enter Password"
          input_name="password"
          on_input={handel_input}
          input_value={password}
        />
      </>
    );
  }
}

export default function Create_app_account() {
  let { author } = useAuthor();
  let { state, pathname } = useLocation();
  const mode = pathname.split("/", 2)[1];
  if (mode == "update" && !state) {
    return <Navigate replace to={"/"} />;
  } else {
    return (
      <App_account_create
        author={author}
        mode={mode}
        data={state ? state.data : null}
        id={state ? state.id : null}
      />
    );
  }
}
