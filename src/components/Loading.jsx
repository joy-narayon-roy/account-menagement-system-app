import React from "react";
import style from "../styles/components_styles/loading.module.css";
import loading from "../images/loading.svg";

export function Loading_Page() {
  return (
    <main className={style["main"]} >
    <div className={style["container"]}>
      <div className={style["loading"]}>
        <img className={style["loading_img"]} src={loading} alt="" />
      </div>
    </div>
    </main>
  );
}
export default function Loading() {
  return (
    <div className={style["container"]}>
      <div className={style["loading"]}>
        <img className={style["loading_img"]} src={loading} alt="" />
      </div>
    </div>
  );
}
