"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const access = localStorage.getItem("access_jwt");
  const refresh = localStorage.getItem("refresh_jwt");
  const loggedIn = !!access && !!refresh;

  if (loggedIn) {
    router.push("/welcome");
  } else {
    router.push("/login");
  }
}
