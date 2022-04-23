import { useEffect, useState } from "react";
import axios from "axios";
const useAxios = (configParams) => {
  axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";
  const [res, setRes] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);
  const fetchDataUsingAxios = async () => {
    await axios.request(configParams).then((res) =>
      setRes(res)
        .catch((err) => setErr(err))
        .finally(() => setLoading(false))
    );
    console.log(res);
  };
  return [fetchDataUsingAxios, res];
};
export default useAxios;
