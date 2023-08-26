import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
// import { redirect } from "react-router-dom";

export default function Signout() {
  const auth = useAuth();
  const navigator = useNavigate();
  // console.log(auth)
  auth
    .sign_out()
    .then(() => {
      navigator("/signin");
    })
    .catch((err) => {
      console.log(err);
    });

  return <div>Signout</div>;
}
