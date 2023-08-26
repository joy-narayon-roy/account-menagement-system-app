import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import "./styles/main.css";

import Header from "./components/Header";
import Deshboard from "./pages/Deshboard";
import Signin from "./pages/Signin";
import Signout from "./pages/Signout";
import Create_account from "./pages/Create_account";
import {
  Create_phone,
  Create_email,
  Create_facebook,
  Create_web_account,
  Create_app_account,
} from "./components/create_accounts_forms";
import Details from "./pages/Details_page";

import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { AuthorProvider, useAuthor } from "./contexts/AuthorContext";

import Server_faild from "./pages/Server_faild";
import Not_found from "./pages/Not_found";
import Update from "./pages/Update";
import Profile from "./pages/Profile";

function Rederect({ url }) {
  return <Navigate replace to={url} />;
}

function AuthorProtected({ children }) {
  const { currentUser } = useAuth();
  const { author } = useAuthor();

  if (author && currentUser) {
    return children;
  } else if (!author && currentUser) {
    return <Rederect url={"/profile/create"} />;
  } else {
    return <Rederect url={"/signin"} />;
  }
}

function UserProtected({ children }) {
  const { currentUser } = useAuth();
  if (currentUser) {
    return children;
  } else {
    return <Rederect url={"/signin"} />;
  }
}

function NotProtected({ children }) {
  const auth = useAuth();
  if (!auth.currentUser) {
    return children;
  }
  return <Rederect url={"/deshboard"} />;
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <AuthorProvider>
          <Routes>
            <Route
              index
              element={
                <AuthorProtected>
                  <Deshboard />
                </AuthorProtected>
              }
            />

            <Route
              path="/create"
              element={
                <AuthorProtected>
                  <Create_account />
                </AuthorProtected>
              }
            >
              <Route index element={<Create_phone />} />
              <Route path="phone" element={<Create_phone />} />
              <Route path="email" element={<Create_email />} />
              <Route path="facebook" element={<Create_facebook />} />
              <Route path="web" element={<Create_web_account />} />
              <Route path="app" element={<Create_app_account />} />
              <Route path="*" element={<Rederect url={"phone"} />} />
            </Route>

            <Route
              path="/details"
              element={
                <AuthorProtected>
                  <Details />
                </AuthorProtected>
              }
            />

            <Route
              path="/update"
              element={
                <AuthorProtected>
                  <Update />
                </AuthorProtected>
              }
            >
              <Route index element={<Rederect url={"/"} />} />
              <Route path="phone" element={<Create_phone />} />
              <Route path="email" element={<Create_email />} />
              <Route path="facebook" element={<Create_facebook />} />
              <Route path="web" element={<Create_web_account />} />
              <Route path="app" element={<Create_app_account />} />
              <Route path="*" element={<Rederect url={"/"} />} />
            </Route>

            <Route
              path="/profile/:type"
              element={
                <UserProtected>
                  <Profile />
                </UserProtected>
              }
            />

            {/* <Route
              path="/updateprofile"
              element={
                <UserProtected>
                  <Profile />
                </UserProtected>
              }
            /> */}

            <Route
              path="/signin"
              element={
                <NotProtected>
                  <Signin />
                </NotProtected>
              }
            />

            <Route
              path="/signout"
              element={
                <UserProtected>
                  <Signout />
                </UserProtected>
              }
            />

            <Route path="/failed" element={<Server_faild />} />
            <Route path="/404" element={<Not_found />} />

            <Route path="*" element={<Not_found />} />
          </Routes>
        </AuthorProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
