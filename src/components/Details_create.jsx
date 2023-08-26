import React from "react";
import { useNavigate } from "react-router-dom";

import Option_input from "./Option_input";

export default function Details({
  account_type,
  change_type = true,
  children,
}) {
  const navigator = useNavigate();
  function handel_input({ target }) {
    let path = target.value.toLowerCase();
    navigator(path);
  }

  return (
    <section className="details">
      {change_type && (
        <Option_input
          title="Account type :"
          input_name="account_type"
          input_placeholder="Enter Account Type"
          on_input={handel_input}
          input_value={account_type}
          datas={["phone", "email", "facebook", "web", "app"]}
        />
      )}
      {children}
    </section>
  );
}
