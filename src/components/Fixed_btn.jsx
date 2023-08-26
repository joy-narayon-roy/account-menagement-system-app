import React from "react";

import up_arrow from "../images/up-arrow.png";
import styles from "../styles/components_styles/fixed_btn.module.css";

export default function Fixed_btn() {
  return (
    <section className={styles.fixed}>
      <button className={styles.up_btn}>
        <img src={up_arrow} alt="" />
      </button>
    </section>
  );
}
