import React, { Fragment, useState } from "react";

import styles from "../styles/pages_styles/deshboard.module.css";
import Accounts from "../components/Accounts";
import Pin from "../components/Pin";
import { useAuthor } from "../contexts/AuthorContext";
import change_case from "../hooks/changeCase";

export default function Deshboard() {
  const [is_permited, setIs_permited] = useState(false);
  const { author } = useAuthor();

  const sorted_accounts = author.accounts.sort_by_type();

  return (
    <>
      {is_permited ? (
        <>
          <main className={styles.main}>
            <section className={styles.search}>
              <button className="search_btn">
                <img src="../images/filter.png" alt="" />
              </button>
              <div className="tags"></div>

              <div className="inputs">
                <input type="search" className="" placeholder="Search.." />
                <ol>
                  <li>Google</li>
                  <li>Facebook</li>
                </ol>
              </div>

              <button className="search_btn">
                <img src="../images/search.png" alt="" />
              </button>
            </section>

            <Accounts
              styles={styles}
              title="Phones"
              datas={author.phones}
              data_type={"phone"}
            />

            {Object.keys(sorted_accounts).map((key, index) => (
              <Fragment key={index}>
                <Accounts
                  styles={styles}
                  title={change_case(key) + "s"}
                  datas={sorted_accounts[key]}
                  data_type={key}
                />
              </Fragment>
            ))}
          </main>

          {/* <Fixed_btn /> */}

          <footer></footer>
        </>
      ) : (
        <>
          <Pin author={author} set_permition={setIs_permited} />
        </>
      )}
    </>
  );
}
