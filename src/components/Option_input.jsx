import React from "react";
import style from "../styles/components_styles/input_container.module.css";
import inp_box from "../styles/components_styles/option_input.module.css";

export default function Option_input({
  title = "",
  input_name = "",
  input_value,
  on_input,
  datas = [],
}) {
  return (
    <div className={style["input_container"]}>
      <label>{title}</label>
      <div className={inp_box["input_box"]}>
        <select name={input_name} value={input_value} onChange={on_input}>
          {datas.map((data, ind) => {
            return (
              <option key={ind} value={data}>
                {data.replace(data[0], data[0].toUpperCase())}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}
