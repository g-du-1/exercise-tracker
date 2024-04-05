export const getExercises = async () => {
  // TODO Make it an env var
  const res = await fetch("http://localhost:8080/api/v1/exercises");

  return res.json();
};
