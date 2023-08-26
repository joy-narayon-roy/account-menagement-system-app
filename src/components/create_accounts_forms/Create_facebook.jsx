import React, { Component } from "react";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import Input_container from "../Input_container";
import AuthorContext, { useAuthor } from "../../contexts/AuthorContext";
import { Facebook, Password } from "../../models";

export class Facebook_create extends Component {
  static contextType = AuthorContext;
  constructor(props) {
    super(props);
    let { data } = props;
    if (data) {
      this.state = {
        ...data,
        profile_link: data.profile_url || "",
        phone_number: data.phone ? data.phone.phone_number : data.phone_number,
        email_address: data.email
          ? data.email.email_address
          : data.email_address,
        password: Password.import(data.password).get_password().text,
      };
    } else {
      this.state = {
        user_name: "",
        profile_link: "https://",
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
    const { user_name, profile_link, email_address, phone_number, password } =
      this.state;

    let phone = null,
      email = null;
    let fb_account = new Facebook({
      author,
      password,
      user_name,
      email_address,
      email: undefined,
      phone: undefined,
      phone_number,
      profile_url: profile_link,
    });

    phone = author.phones.all[phone_number];
    email = author.accounts.find_by_email_address(email_address);

    if (phone) {
      fb_account.update_phone(phone);
      fb_account.update_phone_number(" ");
    }
    if (email) {
      fb_account.update_email(email);
      fb_account.update_email_address(" ");
    }

    // console.log(fb_account);
    author.accounts.add(fb_account);
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
      .catch((err) => {
        alert("Failed To Saved!");
        console.log(err);
        navigate("/", {
          state: {
            save: false,
          },
        });
      });
  }

  update_it() {
    let { author } = this.context;
    const { id, navigate } = this.props;
    const { user_name, email_address, phone_number, profile_link, password } =
      this.state;

    let fb_account = author.accounts.find_by_id(id);
    let phone = author.phones.find_by_phone_number(phone_number);
    let email = author.accounts.find_by_email_address(email_address);

    if (phone) {
      fb_account.update_phone(phone);
    } else {
      fb_account.update_phone_number(phone_number);
    }

    if (email) {
      fb_account.update_email(email);
    } else {
      fb_account.update_email_address(email_address);
    }

    fb_account
      .update_user_name(user_name)
      .update_password(password)
      .update_profile_url(profile_link);

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

    let { user_name, profile_link, email_address, phone_number, password } =
      this.state;
    return (
      <>
        <Input_container
          title="User Name :"
          input_type="text"
          input_placeholder="Enter your Facebook Name"
          input_name="user_name"
          input_value={user_name}
          input_reqired={true}
          on_input={handel_input}
        />
        <Input_container
          title="Your Account Link :"
          input_type="text"
          input_placeholder="Enter your Profile Link"
          input_name="profile_link"
          input_value={profile_link}
          on_input={handel_input}
        />
        <Input_container
          title="Email address :"
          input_type="email"
          input_placeholder="Enter your Email :"
          input_name="email_address"
          input_value={email_address}
          on_input={handel_input}
        />
        <Input_container
          title="Phone Number :"
          input_type="tel"
          input_placeholder="Enter Phone :"
          input_name="phone_number"
          input_value={phone_number}
          on_input={handel_input}
        />
        <Input_container
          title="Enter Password :"
          input_type="password"
          input_placeholder="Enter Account Password :"
          input_name="password"
          input_value={password}
          on_input={handel_input}
          button={true}
        />
      </>
    );
  }
}

export default function Create_facebook() {
  const { author } = useAuthor();
  const { state, pathname } = useLocation();
  const navigate = useNavigate();
  const mode = pathname.split("/", 2)[1];
  if (mode == "update" && !state) {
    return <Navigate replace to={"/"} />;
  } else {
    return (
      <Facebook_create
        author={author}
        mode={mode}
        navigate={navigate}
        data={state ? state.data : null}
        id={state ? state.id : null}
      />
    );
  }
}
