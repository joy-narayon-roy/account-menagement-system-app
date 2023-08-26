import React, { useRef, useState } from "react";
import Input_container from "./Input_container";
import Button from "./Button";
import Logo_button from "./Logo_button";
import { useAuth } from "../contexts/AuthContext";

export default function Signin_Form({ title }) {
  // const location = useLocation();

  const {
    singin_with_google,
    signin_with_facebook,
    singin_with_email_password,
  } = useAuth();
  const form = useRef(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handel_input({ target }) {
    const { value, name } = target;
    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }
  }

  function handel_submit(e) {
    e.preventDefault();
    // const form = e.target;
    singin_with_email_password(email, password)
      .then((user) => {
        console.log();
        console.log(user);
        console.log("User---------");
      })
      .catch((err) => {
        console.log(err.code);
        console.log(err.message);
        console.log("_____Error_____");
      });
  }

  return (
    <form ref={form} className="login_form" onSubmit={handel_submit} action="">
      <div className="login_form-title">
        <h2>{title}</h2>
      </div>

      <div className="line"></div>

      <div className="login_form-inputs">
        <Input_container
          title="Enter Email"
          input_name="email"
          input_placeholder="Enter your email"
          input_type="email"
          input_reqired={true}
          on_input={handel_input}
          input_value={email}
        />

        <Input_container
          title="Enter Password"
          input_name="password"
          input_placeholder="Enter your password"
          input_type="password"
          input_reqired={true}
          on_input={handel_input}
          input_value={password}
        />

        <Button type="submit" text={"Login"} />
        <a href="signin?create=1">Create a New Account</a>
      </div>

      <div className="line"></div>

      <div className="others">
        <Logo_button
          onClick={singin_with_google}
          type="button"
          alt="logo"
          logo="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
          text="Signin With Google"
          class_name="google"
        />
        <Logo_button
          onClick={signin_with_facebook}
          type="button"
          alt="logo"
          logo="https://www.pngguru.in/storage/uploads/images/Facebook%20Social%20Media%20icon%20stock%20png_1657957454_2044339521.webp"
          text="Signin With Facebook"
          class_name="facebook"
          disabled
        />
      </div>
    </form>
  );
}
