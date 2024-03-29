import { Exercise } from "./types";

export default function Home() {
  const exercises: Exercise[] = [
    { name: "Exercise 1" },
    { name: "Exercise 2" },
  ];

  return (
    <>
      <h1>Exercise Tracker</h1>

      <div>
        {exercises.map((exercise) => (
          <div>{exercise.name}</div>
        ))}
      </div>
    </>
  );
}
