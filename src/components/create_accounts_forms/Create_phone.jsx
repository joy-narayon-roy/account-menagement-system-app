import React, { Component } from "react";
import Input_container from "../Input_container";

import Radio_input from "../Radio_input";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import { Phone } from "../../models";
import AuthorContext from "../../contexts/AuthorContext";

export class Phone_Create extends Component {
  static contextType = AuthorContext;
  constructor(props) {
    super(props);
    if (props.data) {
      this.state = props.data;
    } else {
      this.state = {
        user_name: "",
        phone_number: "",
        registered_name: "",
        active: true,
      };
    }
  }

  handel_input = ({ target }) => {
    const { value, name } = target;
    if (name == "active") {
      this.setState({
        active: !this.state.active,
      });
    } else {
      this.setState({
        [name]: value,
      });
    }
  };

  save_it = () => {
    const { author } = this.context;
    let { navigate } = this.props;

    let { user_name, phone_number, registered_name } = this.state;

    let phone = new Phone({ user_name, phone_number, registered_name });
    phone.set_author(author);
    phone.update_active(this.state.active);
    author.phones.add(phone);
    author
      .save()
      .then(() => {
        alert("Phone Saved!");
        navigate("/", {
          state: {
            save: true,
          },
        });
      })
      .catch((err) => {
        alert("Failed to save Phone!");
        console.log(err);
        navigate("/", {
          state: {
            saved: false,
          },
        });
      });
  };

  update_it = () => {
    let { id, navigate } = this.props;
    let { author } = this.context;
    let { user_name, registered_name, phone_number } = this.state;

    author.phones
      .find_by_id(id)
      .update_user_name(user_name)
      .update_phone_number(phone_number)
      .update_registered_name(registered_name);

    author
      .save()
      .then(() => {
        alert("Upadated!");
        navigate("/", {
          state: {
            save: true,
          },
        });
      })
      .catch((err) => {
        alert("Failed to Update!");
        console.log(err);
        navigate("/", {
          state: {
            save: false,
          },
        });
      });
  };

  componentDidMount() {
    document.forms[0].onsubmit = ({ target }) => {
      if (target.checkValidity()) {
        switch (this.props.mode) {
          case "create":
            this.save_it();
            break;
          case "update":
            this.update_it();
            break;
          default:
            break;
        }
      }
    };
  }

  render() {
    let { handel_input } = this;
    let { user_name, phone_number, registered_name, active } = this.state;

    return (
      <>
        <Input_container
          title="User Name"
          input_type="text"
          input_name="user_name"
          input_value={user_name}
          on_input={handel_input}
          input_reqired={true}
        />
        <Input_container
          title="Phone Number"
          input_type="tel"
          input_name="phone_number"
          input_value={phone_number}
          on_input={handel_input}
          input_reqired={true}
        />
        <Input_container
          input_type="text"
          title="Registered Name"
          input_name="registered_name"
          on_input={handel_input}
          input_value={registered_name}
          input_reqired={true}
        />
        <Radio_input on_input={this.handel_input} input_value={active} />
      </>
    );
  }
}

export default function Create_phone() {
  let { state, pathname } = useLocation();
  const mode = pathname.split("/", 2)[1];
  const navigate = useNavigate();

  if (mode == "update" && !state) {
    return <Navigate replace to={"/"} />;
  } else {
    return (
      <Phone_Create
        mode={mode}
        navigate={navigate}
        data={state ? state.data : null}
        id={state ? state.id : null}
      />
    );
  }
}
