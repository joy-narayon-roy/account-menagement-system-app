import { useEffect } from "react";
import "../styles/pages_styles/sign.page.css";
import Signin_Form from "../components/Signin_Form";

export default function Signin({ setUser }) {
  useEffect(() => {
    document.title = "Signup";
  }, []);

  return (
    <>
      <main>
        <Signin_Form setUser={setUser} title={"Signup"} />
      </main>
    </>
  );
}
