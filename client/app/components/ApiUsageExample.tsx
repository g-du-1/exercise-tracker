import { User } from "app/types";
import { fetchWithAuth } from "app/util/fetchWithAuth";

const handleSignup = async () => {
  const response = await fetchWithAuth(
    process.env.NEXT_PUBLIC_API_SIGN_UP_ENDPOINT || "/auth/public/signup",
    {
      method: "POST",
      body: JSON.stringify({
        username: "testuserreact",
        email: "abc@example.com",
        password: "testuser1",
        role: ["user"],
      }),
    }
  );

  const data = await response.json();

  console.log(data);
};

const handleSignin = async () => {
  try {
    const response = await fetchWithAuth(
      process.env.NEXT_PUBLIC_API_SIGN_IN_ENDPOINT || "/auth/public/signin",
      {
        method: "POST",
        body: JSON.stringify({
          username: "testuserreact",
          password: "testuser1",
        }),
      }
    );

    const data = await response.json();

    console.log(data);

    if (response.status === 200 && data.jwtToken) {
      localStorage.setItem("JWT_TOKEN", data.jwtToken);
    }
  } catch (error) {}
};

const handleGetUser = async () => {
  const resp = await fetchWithAuth("/auth/user");

  const data = await resp.json();

  console.log(data);

  return data;
};

const getAllExercises = async () => {
  const resp = await fetchWithAuth("/exercises");

  const data = await resp.json();

  console.log(data);

  return data;
};

const handleLogout = () => {
  localStorage.setItem("CSRF_TOKEN", "");
  localStorage.setItem("JWT_TOKEN", "");

  console.log("Deleted local account state.");
};

const getUserExercises = async () => {
  const user: User = await handleGetUser();

  const resp = await fetchWithAuth(`/user-exercises/${user.id}`);

  const data = await resp.json();

  console.log(data);
};

const saveSingleUserExercise = async () => {
  const response = await fetchWithAuth("/user-exercises/3/save?exerciseId=11", {
    method: "POST",
  });

  const data = await response.json();

  console.log(data);
};

export const ApiUsageExample = () => {
  return (
    <div>
      <button onClick={handleLogout}>handleLogout</button>
      <button onClick={handleSignup}>handleSignup</button>
      <button onClick={handleSignin}>handleSignin</button>
      <button onClick={handleGetUser}>handleGetUser</button>
      <button onClick={getAllExercises}>getAllExercises</button>
      <button onClick={saveSingleUserExercise}>saveSingleUserExercise</button>
      <button onClick={getUserExercises}>getUserExercises</button>
    </div>
  );
};
