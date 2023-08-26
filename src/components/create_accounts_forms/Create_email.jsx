import React, { Component } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Input_container from "../Input_container";
import { Email, Password } from "../../models";
import AuthorContext from "../../contexts/AuthorContext";

class Email_create extends Component {
  static contextType = AuthorContext;
  constructor(props) {
    super(props);
    const { data } = props;
    if (data) {
      this.state = {
        ...data,
        phone_number: data.phone ? data.phone.phone_number : data.phone_number,
        password: Password.import(data.password).get_password().text,
      };
    } else {
      this.state = {
        user_name: "",
        email_address: "",
        phone_number: "",
        password: "",
      };
    }
  }

  handel_input = ({ target }) => {
    let { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  save_it() {
    const { navigate } = this.props;
    const { author } = this.context;
    const { user_name, email_address, phone_number, password } = this.state;
    if (author.accounts.find_by_email_address(email_address)) {
      alert(`${email_address} Exist`);
      return 0;
    }
    let email = new Email({ author, email_address, password, user_name });
    email.update_phone_number(phone_number);
    email.update_phone(author.phones.all[phone_number]);
    author.accounts.add(email);
    author
      .save()
      .then(() => {
        alert("Saved");
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to save!");
        navigate("/");
      });
  }

  update_it() {
    const { id, navigate } = this.props;

    const { author } = this.context;
    const { user_name, email_address, password, phone_number } = this.state;
    const exist_email = author.accounts.find_by_email_address(email_address);
    const exist_phone = author.phones.all[phone_number];
    if (exist_email && exist_email.id != id) {
      alert(`${email_address} Exist`);
      return 0;
    }
    exist_email.update_phone_number(phone_number);
    exist_email.update_phone(exist_phone);
    exist_email.update_user_name(user_name).update_password(password);

    exist_email.author
      .save()
      .then(() => {
        alert("Saved!");
        navigate("/", {
          state: {
            save: true,
          },
        });
      })
      .catch((err) => {
        alert("Failed to Save!");
        console.log(err);
        navigate("/", {
          state: {
            save: false,
          },
        });
      });
  }

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

    let { user_name, email_address, phone_number, password } = this.state;
    return (
      <>
        <Input_container
          title="User Name :"
          input_type="text"
          input_name="user_name"
          input_reqired={true}
          input_placeholder="Enter your user name"
          on_input={handel_input}
          input_value={user_name}
        />
        <Input_container
          title="Email Address :"
          input_type="email"
          input_name="email_address"
          input_reqired={true}
          input_placeholder="Enter your email address"
          on_input={handel_input}
          input_value={email_address}
        />
        <Input_container
          title="Enter Phone Number :"
          input_type="tel"
          input_name="phone_number"
          input_placeholder="Enter your Phone Number"
          on_input={handel_input}
          input_value={phone_number}
        />
        <Input_container
          title="Password :"
          input_type="password"
          input_name="password"
          input_placeholder="Enter your password"
          input_reqired={true}
          button={true}
          on_input={handel_input}
          input_value={password}
        />
      </>
    );
  }
}

export default function Create_email() {
  let { state, pathname } = useLocation();
  const mode = pathname.split("/", 2)[1];
  const navigate = useNavigate();

  if (mode == "update" && !state) {
    return <Navigate to={"/"} />;
  } else {
    return (
      <Email_create
        mode={mode}
        navigate={navigate}
        data={state ? state.data : null}
        id={state ? state.id : null}
      />
    );
  }
}
