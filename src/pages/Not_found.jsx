import React from "react";
import not_found from "../images/404img.png";
import style from "../styles/pages_styles/notfound.module.css";

export default function Not_found() {
  return (
    <main className={style["main"]}>
      <div className={style["div"]}>
        <img className={style["img"]} src={not_found} alt="" />
      </div>
    </main>
  );
}
