import api from "../services/api";

const handleLogin = async () => {
  try {
    const response = await api.post("/auth/public/signin", {
      username: "admin",
      password: "adminPass",
    });

    console.log(response.data);

    if (response.status === 200 && response.data.jwtToken) {
      localStorage.setItem("JWT_TOKEN", response.data.jwtToken);
    }
  } catch (error) {}
};

const handleGetUser = async () => {
  const resp = await api.get("/auth/user");

  console.log(resp.data);
};

export const AuthExample = () => {
  return (
    <div>
      <button onClick={handleLogin}>LOG IN</button>
      <button onClick={handleGetUser}>GET USER</button>
    </div>
  );
};
