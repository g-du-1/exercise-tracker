import api from "app/services/api";

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

const handleGetUsers = async () => {
  const usersResp = await api.get("/admin/getusers");

  console.log(usersResp.data);
};

export const AuthExample = () => {
  return (
    <div>
      <button onClick={handleLogin}>LOG IN</button>
      <button onClick={handleGetUsers}>GET USERS</button>
    </div>
  );
};
