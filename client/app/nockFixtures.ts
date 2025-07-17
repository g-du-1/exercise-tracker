import { mockUserExercises } from "./fixtures/mockUserExercises";
import { mockExercises } from "./fixtures/mockExercises";

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

export const userSettings = {
  path: "/api/v1/user-settings", // GET
  success: {
    status: 200,
    response: {
      showCompletedExercises: true,
      showComments: true,
      showMedia: true,
    },
  },
};

export const userExercises = {
  path: "/api/v1/user-exercises", // GET
  success: {
    status: 200,
    response: mockUserExercises,
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

export const allExercises = {
  path: "/api/v1/exercises", // GET
  success: {
    status: 200,
    response: mockExercises,
  },
};

export const saveExercise = {
  path: "/api/v1/user-exercises/save", // POST
  success: {
    status: 200,
  },
};

export const deleteAllExercises = {
  path: "/api/v1/user-exercises/all", // DELETE
  success: {
    status: 200,
    response: {
      message: "All exercises deleted for user.",
    },
  },
};
