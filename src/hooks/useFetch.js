// import { useState } from "react";

// export default function useFetch(url) {
//   const [loading, setLoading] = useState(true);
//   const [err, setErr] = useState(false);
//   const [data, setData] = useState(null);

//   fetch(url)
//     .then((res) => {
//       if (res.status > 400) {
//         throw Error(data.message);
//       } else {
//         res.json();
//       }
//     })
//     .then((dat) => {
//       setData(dat);
//       setLoading(false);
//     })
//     .catch((err) => {
//       setData(null);
//       setLoading(false);
//       setErr(true);
//       console.log(err);
//     });
//   console.log(data);
//   return { loading, data, err };
// }

import { useEffect, useState } from "react";
export default function useFetch(url, opt) {
  // eslint-disable-next-line no-undef
  const url_string = process.env.REACT_APP_SERVER + url;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    async function requestFetch() {
      try {
        setLoading(true);
        setError(false);

        let res;
        if (opt) {
          res = await fetch(url_string, opt);
        } else {
          res = await fetch(url_string);
        }
        const data = await res.json();
        if (res.status > 200) {
          throw { status: res.status, data };
        }
        setLoading(false);
        setResult({ status: res.status, data });
      } catch (err) {
        setLoading(false);
        setError(err);
      }
    }
    requestFetch();
  }, []);

  return {
    loading,
    error,
    result,
  };
}
