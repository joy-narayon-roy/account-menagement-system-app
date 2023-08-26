import { createContext, useContext, useEffect, useState } from "react";
import { Loading_Page } from "../components/Loading";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { User } from "../models";

const AuthorContext = createContext();
export default AuthorContext;
/**
 *
 * @returns {{author:User,set_author:Function}}
 */
export function useAuthor() {
  return useContext(AuthorContext);
}

export function AuthorProvider({ children }) {
  let navigator = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const { currentUser } = useAuth();
  useEffect(() => {
    if (!currentUser) {
      setLoading(false);
      navigator("/signin");
    } else {
      console.log();
      User.import_db(currentUser.uid)
        .then((dat) => {
          if (!dat) {
            navigator("/profile/create");
          }
          setLoading(false);
          setData(dat);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const set_author = (user) => {
    setData(user);
  };

  const value = {
    author: data,
    set_author,
  };
  return (
    <AuthorContext.Provider value={value}>
      {!loading ? children : <Loading_Page />}
    </AuthorContext.Provider>
  );
}
