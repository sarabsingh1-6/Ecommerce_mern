import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

export default function PrivateRoute() {
  const [ok, setOk] = useState(false); // because created same ok as in the authRoute
  const [auth, setAuth] = useAuth(); // our context api

  //to get the user we have to use useEffect
  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API}/api/v1/auth/user-auth`
          // , {
          //   headers: {
          //     Authorization: auth?.token,
          //   },
          // } //header is set as default in auth.js
        );
        if (res.data.ok) {
          setOk(true);
        } else {
          setOk(false);
        }
      } catch (error) {
        // Handle the error here, for example, log it or show a message to the user
        console.error("Error during authentication check:", error);
      }
    };
    if (auth?.token) authCheck(); // if getting the token from auth then run the authCheck fun
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner />;
}
