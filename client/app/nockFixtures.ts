import { mockExercises } from "./components/fixtures/mockExercises";

export const nockBaseUrl = "http://localhost:3000";

export const signIn = {
  path: "/api/v1/auth/public/signin", // POST
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

export const userExercises = {
  path: "/api/v1/user-exercises", // GET
  success: {
    status: 200,
    response: mockExercises,
  },
  noExercises: {
    status: 200,
    response: [],
  },
  unauthorised: {
    status: 401,
    response: {
      path: "/api/v1/user-exercises",
      error: "Unauthorized",
      message: "Full authentication is required to access this resource",
      status: 401,
    },
  },
  internalServerError: {
    status: 500,
    response: undefined,
  },
};
