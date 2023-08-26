import React, { useEffect } from "react";
import Details_card from "../components/Details_card";
import Details_table from "../components/Details_table";

import { useLocation, useNavigate } from "react-router-dom";
import icones from "../images/apps";

import getOperator from "../hooks/getOperator.js";
import { useAuthor } from "../contexts/AuthorContext";
import { Email, Phone } from "../models";

function getIcone(name) {
  return icones[name.toLowerCase()];
}

export default function Details_page() {
  const navigator = useNavigate();
  const { state } = useLocation();
  let { type: account_type, id, data } = state;
  const { author } = useAuthor();
  let icon = false;

  if (data.phone && !(data.phone instanceof Phone)) {
    data.phone = author.phones.find_by_id(data.phone);
  }

  if (data.email && !(data.email instanceof Email)) {
    data.email = author.accounts.all[data.email];
  }

  if (account_type == "Phone") {
    let { src } = getOperator(data.phone_number);
    icon = src;
  } else {
    icon = getIcone(account_type);
  }

  const edit_handel = () => {
    navigator("/update/" + account_type.toLowerCase(), {
      state: state,
    });
  };
  const on_close = () => {
    navigator("/");
  };

  useEffect(() => {
    const eventHanderler = (ev) => {
      if (ev.keyCode === 27) {
        on_close();
      }
    };
    window.addEventListener("keydown", eventHanderler);

    return () => {
      window.removeEventListener("keydown", eventHanderler);
    };
  }, []);

  return (
    <main>
      <Details_card
        icone={icon}
        title={
          account_type.replace(account_type[0], account_type[0].toUpperCase()) +
          " Details"
        }
        close_on_click={on_close}
        edit_btn={true}
        edit_btn_click={edit_handel}
      >
        <Details_table id={id} data={data} data_type={account_type} />
      </Details_card>
    </main>
  );
}
