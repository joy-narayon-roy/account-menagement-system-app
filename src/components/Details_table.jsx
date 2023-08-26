/* eslint-disable no-unused-vars */
import React, { Fragment, useEffect, useState } from "react";
import style from "../styles/components_styles/details_table.module.css";
import copy from "../images/copying.png";
import eye from "../images/eye.png";
import { Password } from "../models";

function Copy_btn({ on_click }) {
  return (
    <button
      onClick={on_click}
      className={style["details_card-body_table_tr_td_button"]}
    >
      <img src={copy} alt="" />
    </button>
  );
}
function Show_btn({ on_click }) {
  return (
    <button
      onClick={on_click}
      className={style["details_card-body_table_tr_td_button"]}
    >
      <img src={eye} alt="" />
    </button>
  );
}

function change_case(text, number_of_word = false) {
  let str = text.split("_");
  if (number_of_word) {
    str = text.split("_", number_of_word);
  }

  str = str
    .map((word) => word.replace(word[0], word[0].toUpperCase()))
    .toLocaleString()
    .replace(",", " ");
  return str;
}

export default function Details({ data }) {
  const [show, setShow] = useState(false);
  let { email, phone, password } = data;
  delete data.id;
  if (email) {
    delete data.email_address;
  }
  let keys = Object.keys(data);

  let strings_key = keys.filter((key) => typeof data[key] == "string");

  const show_btn_click = () => {
    setShow(true);
  };
  function copy_btn_click({ target }) {
    let cells = target.offsetParent.parentElement.cells;
    let text = cells[1].innerHTML;
    navigator.clipboard.writeText(text).then(() => {
      alert("Copied!");
    });
  }
  useEffect(() => {
    if (show) {
      let time = setTimeout(() => {
        setShow(false);
      }, 1000);

      return () => {
        clearTimeout(time);
      };
    }
  }, [show]);

  return (
    <table className={style["details_card-body_table"]}>
      <tbody>
        {strings_key.map((key, index) => {
          if (data[key] && data[key].length && data[key] != "password") {
            return (
              <Fragment key={index}>
                <tr className={style["details_card-body_table_tr"]}>
                  <td className={style["details_card-body_table_tr_td"]}>
                    {change_case(key, 1)} :
                  </td>
                  <td className={style["details_card-body_table_tr_td"]}>
                    {data[key]}
                  </td>
                  <td className={style["details_card-body_table_tr_td"]}>
                    <button
                      onClick={copy_btn_click}
                      className={style["details_card-body_table_tr_td_button"]}
                    >
                      <img src={copy} alt="" />
                    </button>
                  </td>
                </tr>
              </Fragment>
            );
          }
        })}

        {email && (
          <tr className={style["details_card-body_table_tr"]}>
            <td className={style["details_card-body_table_tr_td"]}>Email : </td>
            <td className={style["details_card-body_table_tr_td"]}>
              {email.email_address}
            </td>
            <td className={style["details_card-body_table_tr_td"]}>
              {<Copy_btn on_click={copy_btn_click} />}
            </td>
          </tr>
        )}

        {phone && typeof phone != "string" && (
          <tr className={style["details_card-body_table_tr"]}>
            <td className={style["details_card-body_table_tr_td"]}>Phone : </td>
            <td className={style["details_card-body_table_tr_td"]}>
              {phone.phone_number}
            </td>
            <td className={style["details_card-body_table_tr_td"]}>
              {<Copy_btn on_click={copy_btn_click} />}
            </td>
          </tr>
        )}
        {password && (
          <tr className={style["details_card-body_table_tr"]}>
            <td className={style["details_card-body_table_tr_td"]}>
              Password :{" "}
            </td>
            <td className={style["details_card-body_table_tr_td"]}>
              {show ? Password.decrypt_password(password).text : "**********"}
            </td>
            <td className={style["details_card-body_table_tr_td"]}>
              {show ? (
                <Copy_btn on_click={copy_btn_click} />
              ) : (
                <Show_btn on_click={show_btn_click} />
              )}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
