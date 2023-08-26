import React, { Component } from "react";
import Input_container from "../Input_container";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import AuthorContext, { useAuthor } from "../../contexts/AuthorContext";
import { Password, Web_Account } from "../../models";
export class Web_account_create extends Component {
  static contextType = AuthorContext;
  constructor(props) {
    super(props);
    let { data } = props;
    if (data) {
      this.state = {
        user_name: data.user_name || "",
        uid: data.uid || "",
        web_url: data.web_url || "https://www.",
        email_address: data.email
          ? data.email.email_address
          : data.email_address || "",
        phone_number: data.phone
          ? data.phone.phone_number
          : data.phone_number || "",
        password: Password.import(data.password).get_password().text,
      };
    } else {
      this.state = {
        user_name: "",
        uid: "",
        web_url: "https://www.",
        email_address: "",
        phone_number: "",
        password: "",
        re_password: "",
      };
    }
  }

  handel_input = ({ target }) => {
    let { navigator } = this.context;
    let { name, value } = target;
    if (name == "web_url") {
      if (!value.match("https://")) {
        return true;
      }
      try {
        let url = new URL(value);
        url.hostname.split(".").forEach((web_name) => {
          switch (web_name) {
            case "facebook":
              navigator("facebook");
              break;
          }
        });
      } catch (err) {
        console.log(err.message);
      }
    }
    this.setState({
      [name]: value,
    });
  };

  save_it() {
    const { navigate } = this.props;
    const { author } = this.context;
    const { web_url, user_name, phone_number, email_address, password, uid } =
      this.state;

    let web_app = new Web_Account({
      author,
      email_address,
      password,
      phone_number,
      user_name,
      web_url,
      uid,
    });
    let phone = author.phones.find_by_phone_number(phone_number);
    let email = author.accounts.find_by_email_address(email_address);

    if (phone) {
      web_app.update_phone(phone);
    }
    if (email) {
      web_app.update_email(email);
    }

    author.accounts.add(web_app);
    author
      .save()
      .then(() => {
        alert("Saved!");
        navigate("/", {
          state: {
            save: true,
          },
        });
      })
      .catch(() => {
        alert("Faild to Save!");
        navigate("/", {
          state: {
            save: false,
          },
        });
      });
  }

  update_it() {
    const { id, navigate } = this.props;
    const { author } = this.context;
    const { web_url, user_name, phone_number, email_address, password, uid } =
      this.state;
    const web_account = author.accounts.all[id];
    const email = author.accounts.find_by_email_address(email_address);
    const phone = author.phones.all[phone_number];
    web_account
      .update_web_url(web_url)
      .update_user_name(user_name)
      .update_password(password)
      .update_uid(uid);
    if (email) {
      web_account.update_email(email);
    } else {
      web_account.update_email_address(email_address);
    }
    if (phone) {
      web_account.update_phone(phone);
    } else {
      web_account.update_phone_number(phone_number);
    }
    author
      .save()
      .then(() => {
        alert("Updated");
        navigate("/");
      })
      .catch((err) => {
        alert("Failed to Update");
        console.log(err);
        navigate("/");
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

    const { user_name, web_url, email_address, phone_number, password, uid } =
      this.state;

    return (
      <>
        <Input_container
          title="User Name :"
          input_name="user_name"
          input_type="text"
          input_placeholder="Enter your Name"
          input_value={user_name}
          input_reqired={true}
          on_input={handel_input}
        />
        <Input_container
          title="User ID :"
          input_name="uid"
          input_type="text"
          input_placeholder="Enter your user ID"
          input_value={uid}
          on_input={handel_input}
        />
        <Input_container
          title="Web Address :"
          input_type="url"
          input_name="web_url"
          input_placeholder="Enter your Website Address "
          input_value={web_url}
          on_input={handel_input}
          input_reqired={true}
        />
        <Input_container
          title="Email Address :"
          input_type="email"
          input_name="email_address"
          input_placeholder="Enter your Email"
          input_value={email_address}
          on_input={handel_input}
        />
        <Input_container
          title="Phone Number :"
          input_type="tel"
          input_name="phone_number"
          input_placeholder="Enter your Phone number"
          input_value={phone_number}
          on_input={handel_input}
        />
        <Input_container
          title="Password :"
          input_type="password"
          input_name="password"
          input_placeholder="Enter Password"
          input_value={password}
          on_input={handel_input}
          button={true}
        />
      </>
    );
  }
}

export default function Create_web_account() {
  const { author } = useAuthor();
  const { state, pathname } = useLocation();
  const navigate = useNavigate();
  const mode = pathname.split("/", 2)[1];
  if (mode == "update" && !state) {
    return <Navigate to={"/"} />;
  } else {
    return (
      <Web_account_create
        author={author}
        mode={mode}
        navigate={navigate}
        data={state ? state.data : null}
        id={state ? state.id : null}
      />
    );
  }
}
