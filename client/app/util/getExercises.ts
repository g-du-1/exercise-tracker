export const getExercises = async () => {
  // TODO Move url to .env
  const res = await fetch("http://localhost:8080/api/v1/exercises");

  return res.json();
};
