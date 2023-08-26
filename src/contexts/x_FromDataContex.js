import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthor } from "./AuthorContext";

export const FormDataContex = createContext();

export function useFromDataContex() {
  return useContext(FormDataContex);
}

export default function FromDataProvider({ children }) {
  let { author } = useAuthor();
  let navigator = useNavigate();
  const [data, setData] = useState(null);
  const [form_submitted, setForm_submitted] = useState(false);
  const value = {
    author,
    data,
    setData,
    navigator,
    form_submitted,
    setForm_submitted,
  };
  return (
    <FormDataContex.Provider value={value}>{children}</FormDataContex.Provider>
  );
}
