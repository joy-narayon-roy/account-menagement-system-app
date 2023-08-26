import React, { useState } from "react";
import unlock from "../images/unlock_icon.png";
import styles from "../styles/components_styles/unlock.module.css";

export default function Pin({ author, set_permition }) {
  const [pin, setPin] = useState("");

  function set_input({ target }) {
    setPin(target.value);
  }
  function match_pin() {
    let password = author.password;
    if (password.is_match(pin)) {
      set_permition(true);
    } else {
      alert("Wrong Pin");
    }
  }

  function handel_submit(ev) {
    ev.preventDefault();
    match_pin();
  }

  return (
    <main className={styles["main"]}>
      <form onSubmit={handel_submit} className={styles["unlockfield"]}>
        <div className={styles["unlockfield-icon"]}>
          <img className={styles["unlockfield-icon-img"]} src={unlock} alt="" />
        </div>

        <div className={styles["unlockfield-title"]}>
          <h2>Create a PIN</h2>
        </div>

        <div className={["form-inputs"]}>
          <div className={["form-input_container"]}>
            <label>Enter your PIN :</label>
            <input
              type="password"
              placeholder="Enter your PIN"
              name="pin"
              value={pin}
              onInput={set_input}
              autoComplete="off"
              autoFocus
              required
            />
          </div>
          <button type="submit" className={"btn_pri"} onClick={match_pin}>
            Enter
          </button>
        </div>
      </form>
    </main>
  );
}
