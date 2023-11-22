import { habitType } from "../types/habitTypes";

export default function Habit({ habit }: { habit: habitType }) {
  return (
    <div>
      <h3>
        {habit.name} - ({habit.type})
      </h3>
      <p>{habit.date}</p>
      <p>{habit.notes}</p>
    </div>
  );
}
