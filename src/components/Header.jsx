import React, { useState } from "react";
import styles from "../styles/components_styles/header.module.css";
import logo512 from "../images/logo512.png";
import { useAuth } from "../contexts/AuthContext";
// import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigator = useNavigate();
  const [show_manu, setShow_manu] = useState(false);
  let { currentUser } = useAuth();
  // console.log(currentUser)
  let { displayName, photoURL } = currentUser || {};

  function togle_manu() {
    setShow_manu(!show_manu);
  }

  function remove_manu() {
    setShow_manu(false);
  }

  function go_to_home() {
    navigator("/");
  }

  return (
    <>
      <header>
        <section onBlur={remove_manu} className={styles["container"]}>
          <section className={styles["left"]}>
            <img
              onClick={go_to_home}
              src={logo512}
              alt="logo"
              className={styles["logo"]}
            />
            <h1 onClick={go_to_home}>AMS</h1>
          </section>

          <section className={styles["right"]}>
            {currentUser && (
              <>
                <div onClick={togle_manu} className={styles["user-info"]}>
                  <img src={photoURL} alt="" />
                  <h4>{displayName}</h4>
                </div>
                <div
                  id="user_manu"
                  className={`${styles["user-manu"]} ${
                    show_manu && styles["show_manu"]
                  }`}
                >
                  <ul>
                    <Link to="/profile/update">Update</Link>
                    <a href="/signout" className="btn_pri">
                      Signout
                    </a>
                  </ul>
                </div>
              </>
            )}
            {!currentUser && (
              <Link className="btn_pri" to="/signin">
                Signin
              </Link>
            )}
          </section>
        </section>
      </header>
    </>
  );
}
