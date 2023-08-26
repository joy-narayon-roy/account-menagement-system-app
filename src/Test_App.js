/* eslint-disable no-unused-vars */
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { AuthorProvider, useAuthor } from "./contexts/AuthorContext";

function Test() {
  const { author } = useAuthor();
  console.log(author.id);
  return <div>Test</div>;
}

export default function Test_App() {
  return (
    <Router>
      <AuthProvider>
        <AuthorProvider>
          <Test />
        </AuthorProvider>
      </AuthProvider>
    </Router>
  );
}
