import React from "react";

// import styles from "../styles/pages_styles/deshboard.module.css";

import add_icon from "../images/add.png";
import pdf_downlaod from "../images/pdf_download.png";
import Vertical_card from "./Vertical_card";
import { useNavigate } from "react-router-dom";
import Empty from "./Empty";

export default function Accounts({
  title,
  styles,
  datas = {},
  data_type = false,
}) {
  let nav = useNavigate();

  function goto_details({ data }) {
    nav("/details", {
      state: {
        id: data.id,
        type: data.type,
        data: data.to_json(),
      },
    });
  }

  function goto_create() {
    nav("/create/" + data_type || "");
  }

  return (
    <section className={styles.account_container}>
      <div className={styles["account_container-top"]}>
        <div className={styles["account_container-top_left"]}>
          <h3>{title}</h3>
        </div>

        <div className={styles["account_container-top_right"]}>
          <button>
            <img src={pdf_downlaod} alt="" className={styles["icon"]} />
          </button>

          <button onClick={goto_create}>
            <img src={add_icon} alt="" className={styles["icon"]} />
          </button>
        </div>
      </div>

      <div className={styles["account_container-cards"]}>
        {datas.length == 0 && <Empty />}
        {Object.values(datas.all).map((data) => {
          return (
            <Vertical_card
              key={data.id}
              data={data}
              data_type={data_type}
              on_click={goto_details}
            />
          );
        })}
      </div>
    </section>
  );
}
