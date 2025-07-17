export const nockBaseUrl = "http://localhost:3000";

export const signIn = {
  path: "/api/v1/auth/public/signin",
  success: {
    status: 200,
    response: {
      username: "testUser",
      roles: ["ROLE_USER"],
    },
  },
  badCredentials: {
    status: 404,
    response: {
      message: "Bad credentials",
      status: false,
    },
  },
};
