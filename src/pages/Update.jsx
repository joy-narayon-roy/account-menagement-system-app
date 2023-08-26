import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Details_card from "../components/Details_card";
import Details_create from "../components/Details_create";

import { useAuthor } from "../contexts/AuthorContext";

export default function Update() {
  const { author } = useAuthor();
  const navigate = useNavigate();
  const { state } = useLocation();

  function close_on_click() {
    navigate(-1);
  }

  function handel_delete() {
    if (author.phones.find_by_id(state.id)) {
      author.phones.delete_by_id(state.id);
      author
        .save()
        .then(() => {
          alert("Deleted");
          navigate("/");
        })
        .catch((err) => {
          alert("Failed to delete");
          console.log(err);
          navigate("/");
        });
    } else if (author.accounts.find_by_id(state.id)) {
      author.accounts.delete(state.id);
      author
        .save()
        .then(() => {
          alert("Deleted");
          navigate("/");
        })
        .catch((err) => {
          alert("Failed to delete");
          console.log(err);
          navigate("/");
        });
    }
  }

  useEffect(() => {
    const eventHanderler = (ev) => {
      if (ev.keyCode === 27) {
        close_on_click();
      }
    };
    window.addEventListener("keydown", eventHanderler);

    return () => {
      window.removeEventListener("keydown", eventHanderler);
    };
  }, []);

  return (
    <main>
      <Details_card
        title="Update"
        save_btn={true}
        delete_btn={true}
        delete_btn_click={handel_delete}
        close_on_click={close_on_click}
      >
        <Details_create change_type={false}>
          <Outlet />
        </Details_create>
      </Details_card>
    </main>
  );
}
