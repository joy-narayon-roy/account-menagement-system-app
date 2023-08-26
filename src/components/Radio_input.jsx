import React from "react";
import styles from "../styles/components_styles/radio_input.module.css";

export default function Radio_input({ on_input, input_value=true }) {
  return (
    <div className={styles["input_container"]}>
      <label className={styles["input_container-label"]}>Active</label>
      <input
        className={styles["input_container-input"]}
        type="checkbox"
        name="active"
        checked={Boolean(input_value) }
        onChange={on_input}
        value={Boolean(input_value)}
      />
    </div>
  );
}
