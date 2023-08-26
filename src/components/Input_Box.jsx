import React, { useRef } from "react";

import styles from "../styles/components_styles/input_box.module.css";

import button_eye from "../images/eye.png";
import button_not_eye from "../images/not_eye.png";

export default function Input_Box({
  type = "text",
  name = "",
  placeholder = "",
  button = false,
  reqired = false,
  input_value = "",
  on_input,
  data_list,
}) {
  const inp = useRef(false);
  const img = useRef(false);
  const btn = useRef(false);

  let curr = true;

  const toggle_password = () => {
    inp.current.getAttribute("type") == "password"
      ? inp.current.setAttribute("type", "text")
      : inp.current.setAttribute("type", "password");
    // console.dir((img.current.src = button_not_eye));
    curr ? (img.current.src = button_not_eye) : (img.current.src = button_eye);

    if (curr) {
      setTimeout(() => {
        btn.current.click();
      }, 1000);
    }

    curr = !curr;
  };

  // useEffect(() => {
  //   if (inp.current.value == "thisiscocserver") {
  //     inp.current.value = "";
  //   }
  // });

  function invaild_it({ target }) {
    target.parentElement.classList.add(styles["invalid"]);
  }

  return (
    <div className={styles["input_box"]}>
      <input
        onInvalid={invaild_it}
        ref={inp}
        type={type}
        name={name}
        placeholder={placeholder}
        required={reqired}
        value={input_value}
        onChange={on_input}
        list={data_list}
      />

      {button && (
        <button ref={btn} onClick={toggle_password} type="button">
          <img ref={img} src={button_eye} alt="" />
        </button>
      )}
    </div>
  );
}
