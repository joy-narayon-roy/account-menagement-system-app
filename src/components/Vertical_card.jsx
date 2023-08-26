import React, { Component } from "react";
import styles from "../styles/components_styles/vertial_card.module.css";
import app from "../images/app.png";
import getOperator from "../hooks/getOperator.js";
import getEmailProvider from "../hooks/getEmailProvider";
import logos from "../images/apps";
import web from "../images/web.png";
// import change_case from "../hooks/changeCase";
const { facebook } = logos;

export default class Vertical_card extends Component {
  constructor(props) {
    super(props);
    this.state = props.data;
  }
  defaul_card() {
    // console.log(this.props.data.type_of())
    return (
      <div onClick={this.props.on_click} className={styles["vertical_card"]}>
        <div className={styles["vertical_card-icon"]}>
          <img src={app} alt="" />
        </div>
        <div className={styles["vertical_card-text"]}>{"App Name"}</div>
      </div>
    );
  }
  phone_card() {
    let { phone_number } = this.state;
    let { src } = getOperator(phone_number);
    return (
      <div
        onClick={() => {
          this.props.on_click(this.props);
        }}
        className={styles["vertical_card"]}
      >
        <div className={styles["vertical_card-icon"]}>
          <img src={src} alt="" />
        </div>
        <div className={styles["vertical_card-text"]}>{phone_number}</div>
      </div>
    );
  }
  email_card() {
    const { email_address } = this.props.data;
    const { src } = getEmailProvider(email_address);
    return (
      <div
        onClick={() => this.props.on_click(this.props)}
        className={styles["vertical_card"]}
      >
        <div className={styles["vertical_card-icon"]}>
          <img src={src} alt="" />
        </div>
        <div className={styles["vertical_card-text"]}>{email_address}</div>
      </div>
    );
  }
  facebook_card() {
    const { user_name } = this.props.data;
    return (
      <div
        onClick={() => this.props.on_click(this.props)}
        className={styles["vertical_card"]}
      >
        <div className={styles["vertical_card-icon"]}>
          <img src={facebook} alt="" />
        </div>
        <div className={styles["vertical_card-text"]}>{user_name}</div>
      </div>
    );
  }
  web_account_card() {
    let { user_name } = this.props.data;
    return (
      <div
        onClick={() => this.props.on_click(this.props)}
        className={styles["vertical_card"]}
      >
        <div className={styles["vertical_card-icon"]}>
          <img src={web} alt="" />
        </div>
        <div className={styles["vertical_card-text"]}>{user_name}</div>
      </div>
    );
  }

  vertical_cards() {
    switch (this.props.data.type) {
      case "phone":
        return this.phone_card();
      case "email":
        return this.email_card();
      case "facebook":
        return this.facebook_card();
      case "web":
        return this.web_account_card();
      default:
        return this.defaul_card();
    }
  }
  render() {
    return <>{this.vertical_cards()}</>;
  }
}
