import React from "react";

import styles from "../styles/components_styles/button.module.css";

export default function Button({
  text = "Btn",
  class_name = "btn_pri",
  type = "button",
  on_click,
  disabled = false,
}) {
  return (
    <button
      onClick={on_click}
      className={styles[class_name]}
      disabled={disabled}
      type={type}
    >
      {text}
    </button>
  );
}
