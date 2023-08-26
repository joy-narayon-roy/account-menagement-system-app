import React from "react";
import app_logo from "../images/app_logo.png";
import close from "../images/close.png";
import Button from "./Button";

export default function Details_card({
  icone = false,
  title = "Set it",
  close_btn = true,
  close_on_click,
  save_btn,
  save_btn_click = null,

  edit_btn,
  edit_btn_click = null,
  delete_btn,
  delete_btn_click = null,
  children,
}) {
  function handel_save(e) {
    e.preventDefault();
  }

  return (
    <form onSubmit={handel_save} className="details_card">
      <div className="details_card-top">
        <div className="card_logo">
          <img src={icone || app_logo} alt="" />
        </div>

        <div className="card_name">
          <h3>{title}</h3>
        </div>

        <div className="card_close">
          {close_btn && (
            <button type="button" onClick={close_on_click}>
              <img src={close} alt="" />
            </button>
          )}
        </div>
      </div>

      <div className="details_card-body">{children}</div>

      <div className="details_card-bottom">
        {delete_btn ? (
          <Button
            on_click={delete_btn_click}
            text={"Delete"}
            class_name={"btn_alert"}
          />
        ) : (
          <div></div>
        )}

        {edit_btn ? (
          <Button on_click={edit_btn_click} text="Edit" />
        ) : (
          <div></div>
        )}
        {save_btn ? (
          <Button type="submit" on_click={save_btn_click} text={"Save"} />
        ) : (
          <div></div>
        )}
      </div>
    </form>
  );
}
