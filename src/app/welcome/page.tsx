"use client";

import { useRouter } from "next/navigation";
import { logoutUser } from "../utils";
import { useGetHabitsQuery } from "../redux/apiSlice";
import Habit from "./habit";
import { habitType } from "../types/habitTypes";

export default function Welcome() {
  const router = useRouter();
  const { data } = useGetHabitsQuery("string", {
    pollingInterval: 6000,
  });
  console.log("habits", data);

  const HabitsView = () =>
    data ? (
      data.results.map((habit: habitType) => (
        <Habit habit={habit} key={habit.id} />
      ))
    ) : (
      <p>no habits yet</p>
    );

  return (
    <>
      <h1>Hello, Next.js!</h1>
      <button
        onClick={() => {
          logoutUser();
          router.push("/");
        }}
      >
        Log out
      </button>
      <HabitsView />
    </>
  );
}
