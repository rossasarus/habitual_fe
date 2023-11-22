"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  useGetTokenMutation,
  useRefreshAccessTokenMutation,
} from "../redux/apiSlice";
import { useRouter } from "next/navigation";
export default function Login() {
  const [getToken] = useGetTokenMutation();
  const [refreshToken] = useRefreshAccessTokenMutation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [refreshTokenResult, setRefreshTokenResult] = useState(
    localStorage.getItem("refresh_jwt") || ""
  );
  const [accessTokenResult, setAccessTokenResult] = useState(
    localStorage.getItem("access_jwt") || ""
  );
  const router = useRouter();

  const login = () => {
    getToken({ username, password }).then((response) => {
      console.log(response);
      if ("data" in response) {
        localStorage.setItem("access_jwt", response.data.access);
        localStorage.setItem("refresh_jwt", response.data.refresh);
        setAccessTokenResult(response.data.access);
        setRefreshTokenResult(response.data.refresh);
        router.push("/");
      } else {
        // an error occurred
        console.log(response.error);
        clearJWT();
      }
    });
    return false;
  };

  const clearJWT = () => {
    localStorage.removeItem("access_jwt");
    localStorage.removeItem("refresh_jwt");
    setAccessTokenResult("");
    setRefreshTokenResult("");
  };

  const getAccessToken = useCallback(() => {
    const localRefreshToken = localStorage.getItem("refresh_jwt");
    if (localRefreshToken) {
      refreshToken({ refresh: localRefreshToken }).then((response) => {
        if ("data" in response) {
          setAccessTokenResult(response.data.access);
          localStorage.setItem("access_jwt", response.data.access);
        } else {
          // an error occurred
          console.log(response.error);
          clearJWT();
        }
      });
    }
  }, [refreshToken]);

  // this may still be needed for refreshing when access token expires
  // useEffect(() => {
  //   if (getHabitsError) {
  //     console.log(getHabitsError);
  //     if (localStorage.getItem("refresh_jwt")) {
  //       getAccessToken();
  //     } else {
  //       clearJWT();
  //     }
  //   }
  // }, [getAccessToken, getHabitsError]);

  return (
    <>
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <label htmlFor="password">Password:</label>
      <input
        type="text"
        id="password"
        name="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <br />
      <button onClick={login}>click to login</button>
      <br />
      <button onClick={getAccessToken}>click to refresh</button>
      <br />
      <button onClick={clearJWT}>click to log out</button>
      <br />
      <p>AccessToken: {accessTokenResult ? "true" : "false"}</p>
      <p>RefreshToken: {!!refreshTokenResult ? "true" : "false"}</p>
    </>
  );
}
