import React, { useReducer, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Details_card from "../components/Details_card";
import Input_container from "../components/Input_container";

import { useAuth } from "../contexts/AuthContext";
import { useAuthor } from "../contexts/AuthorContext";
// import { Password, User } from "../ams";
import { Password, User } from "../models";

export default function Profile() {
  const navigator = useNavigate();
  let { type } = useParams();

  const form_ref = useRef(null);
  let { author, set_author } = useAuthor();
  let { currentUser } = useAuth();

  if (!type) {
    navigator("/");
  } else if (type == "create") {
    if (author && author.id) {
      navigator("/profile/update");
    }
  } else if (type == "update") {
    if (!author && currentUser) {
      navigator("profile/create");
    }
  } else {
    navigator("/");
  }

  function save_it(state) {
    if (type == "create") {
      let user = new User({ ...state, password: state.pin });
      user.save().then(() => {
        set_author(user);
        navigator("/", {
          state: user,
        });
      });
      // console.log(user.to_json());
      return false;
    } else if (type == "update") {
      let { name, email, phone, pin } = state;
      let password = new Password(pin);
      author
        .updata_name(name)
        .updata_email(email)
        .updata_phone_number(phone)
        .updata_password(password);

      author
        .save()
        .then(() => {
          alert("Saved!");
          navigator("/", {
            state: {
              save: true,
            },
          });
        })
        .catch(() => {
          alert("Failed To Save!");
          navigator("/", {
            state: {
              save: false,
            },
          });
        });
    }
  }

  const data = {
    uid: currentUser.uid,
    name: currentUser.displayName,
    email: currentUser.email,
    phone_number:
      author && author.phone_number ? author.phone_number : currentUser.phone,
    pin: author && author.pin ? author.pin : "",
    r_pin: "",
  };

  function reducer(state, action) {
    let { type, value } = action;
    switch (type) {
      case "user_name":
        return { ...state, name: value };
      case "phone_number":
        return { ...state, phone_number: value };
      case "email":
        return { ...state, email: value };
      case "pin":
        return { ...state, pin: value };
      case "r_pin":
        return { ...state, r_pin: value };

      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, data);

  function on_save({ target }) {
    target.disabled = true;
    target.innerHTML = "Loading";
    let form = form_ref.current;
    if (form.checkValidity()) {
      if (state.pin === state.r_pin) {
        delete state.phone;
        delete state.r_pin;
        save_it(state);
      } else {
        let pin2 = form.getElementsByTagName("input").r_pin;
        alert("Pin Are Not Equal!");
        pin2.setCustomValidity("PINs ara not Equal");
        pin2.reportValidity();
        target.disabled = false;
        target.innerHTML = "Save";
      }
    } else {
      target.disabled = false;
      target.innerHTML = "Save";
    }
  }

  function on_input({ target }) {
    let { name, value } = target;

    dispatch({
      type: name,
      value,
    });
  }

  function on_close() {
    if (currentUser && currentUser.uid) {
      navigator("/");
    }
  }

  return (
    <main>
      <Details_card
        icone={currentUser.photoURL}
        title="Update your Profile"
        save_btn={true}
        save_btn_click={on_save}
        close_btn={author && true}
        close_on_click={on_close}
      >
        <form ref={form_ref} className="details">
          <Input_container
            title="Your Name :"
            input_name="user_name"
            input_value={state.name}
            on_input={on_input}
            input_reqired={true}
          />
          <Input_container
            title="Your Email :"
            input_name="email"
            input_type="email"
            input_value={state.email}
            on_input={on_input}
            input_reqired={true}
          />
          <Input_container
            title="Your Phone :"
            input_name="phone_number"
            input_type="tel"
            input_value={state.phone_number}
            input_placeholder="Enter your Phone number :"
            on_input={on_input}
          />
          <Input_container
            title="Enter your PIN"
            input_name="pin"
            input_placeholder="Enter yor PIN"
            input_type="password"
            input_value={state.pin}
            on_input={on_input}
            input_reqired={true}
            button
          />
          <Input_container
            title="Re-enter your PIN"
            input_name="r_pin"
            input_placeholder="Re-enter yor PIN"
            input_type="password"
            input_value={state.r_pin}
            on_input={on_input}
            input_reqired={true}
            button
          />
        </form>
      </Details_card>
    </main>
  );
}
