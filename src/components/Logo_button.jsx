import React from "react";

export default function Logo_button({
  type,
  alt,
  logo,
  text,
  class_name,
  disabled = false,
  onClick,
}) {
  return (
    <button
      type={type}
      className={`others_container ${class_name}`}
      disabled={disabled}
      onClick={onClick}
    >
      <img src={logo} alt={alt} className="icon" />
      <div className="text">{text}</div>
    </button>
  );
}
