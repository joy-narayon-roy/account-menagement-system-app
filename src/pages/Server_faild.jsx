import React from "react";
import error_img from "../images/500img.png";
import style from "../styles/pages_styles/failed.module.css";

export default function Server_faild() {
  return (
    <main className={style["main"]}>
      <div className={style["div"]}>
        <img className={style["img"]} src={error_img} alt="s" />
      </div>
    </main>
  );
}
