import React, { useEffect } from "react";

import "../styles/pages_styles/create_account.css";

import Details_card from "../components/Details_card";
import Details_create from "../components/Details_create";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import phone_img from "../images/phone.png";
import email_img from "../images/email.png";
import web_img from "../images/web.png";
import app_img from "../images/app.png";
import { facebook_icon } from "../images/socials";

export default function Create_account() {
  let location = useLocation();
  let account_type = location.pathname.split("/").reverse()[0];
  let nav = useNavigate();

  function close_on_click() {
    nav("/");
  }

  useEffect(() => {
    const eventHanderler = (ev) => {
      if (ev.keyCode === 27) {
        close_on_click();
      }
    };
    window.addEventListener("keydown", eventHanderler);

    return () => {
      window.removeEventListener("keydown", eventHanderler);
    };
  }, []);

  function set_icon() {
    switch (account_type.toLowerCase()) {
      case "facebook":
        return facebook_icon;
      case "phone":
        return phone_img;
      case "email":
        return email_img;
      case "web":
        return web_img;
      case "app":
        return app_img;
      default:
        return false;
    }
  }

  return (
    <>
      <main>
        <Details_card
          icone={set_icon()}
          title="Create New Account"
          save_btn={true}
          close_on_click={close_on_click}
        >
          <Details_create account_type={account_type}>
            <Outlet />
          </Details_create>
        </Details_card>
      </main>
    </>
  );
}
