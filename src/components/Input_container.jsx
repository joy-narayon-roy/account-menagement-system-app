import React from "react";

import Input_Box from "./Input_Box";

import styles from "../styles/components_styles/input_container.module.css";

export default function Input_container({
  title = "Set It",
  input_type = "text",
  input_placeholder = "",
  input_name = false,
  input_autoComplete = "",
  input_form = "",
  input_reqired = false,
  input_value,
  on_input,
  button = false,
  data_list = false,
  datas = [],
}) {
  return (
    <div className={styles.input_container}>
      <label>{title}</label>
      <Input_Box
        placeholder={input_placeholder}
        autoComplete={input_autoComplete}
        button={button}
        name={input_name}
        type={input_type}
        form={input_form}
        input_form={input_form}
        reqired={input_reqired}
        input_value={input_value}
        on_input={on_input}
        data_list={data_list ? "dl" : " "}
      />
      {data_list && datas.length > 0 && (
        <datalist id="dl">
          {datas.map((data, ind) => (
            <option key={ind} value={data.value}>
              {data.value}
            </option>
          ))}
        </datalist>
      )}
    </div>
  );
}
