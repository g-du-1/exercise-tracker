package com.gd.exercisetracker.userexercise;

import com.gd.exercisetracker.TestHelpers;
import com.gd.exercisetracker.exercise.Exercise;
import com.gd.exercisetracker.exercise.ExerciseRepository;
import com.gd.exercisetracker.security.role.AppRole;
import com.gd.exercisetracker.security.role.Role;
import com.gd.exercisetracker.security.role.RoleRepository;
import com.gd.exercisetracker.security.user.User;
import com.gd.exercisetracker.security.user.UserRepository;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.PostgreSQLContainer;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class UserExerciseControllerTest {
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:15-alpine");

    @Autowired
    TestHelpers testHelpers;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    BCryptPasswordEncoder passwordEncoder;

    @Autowired
    ExerciseRepository exerciseRepository;

    @Autowired
    UserExerciseRepository userExerciseRepository;

    @LocalServerPort
    private Integer port;

    @BeforeAll
    static void beforeAll() {
        postgres.start();
    }

    @AfterAll
    static void afterAll() {
        postgres.stop();
    }

    @DynamicPropertySource
    static void configureProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", postgres::getJdbcUrl);
        registry.add("spring.datasource.username", postgres::getUsername);
        registry.add("spring.datasource.password", postgres::getPassword);
    }

    @BeforeEach
    void setUp() {
        RestAssured.baseURI = "http://localhost:" + port;
        userRepository.deleteAll();
        exerciseRepository.deleteAll();
        userExerciseRepository.deleteAll();
    }

    @Test
    void savesExercisesForUser() {
        // User

        String username = "user";

        Role userRole = roleRepository.findByRoleName(AppRole.ROLE_USER).orElseGet(() -> roleRepository.save(new Role(AppRole.ROLE_USER)));

        User user = new User(username, "user@example.com", passwordEncoder.encode("password"));

        user.setEnabled(true);
        user.setSignUpMethod("From Test");
        user.setRole(userRole);

        userRepository.save(user);

        String jwt = testHelpers.getTestJwt(username);

        // Exercise

        Exercise exercise = new Exercise();
        exercise.setKey("test-exercise");

        exerciseRepository.save(exercise);

        // Request

        String requestBody = "{\"exerciseId\": " + exercise.getId() + "}";

        given()
                .contentType(ContentType.JSON)
                .header("Authorization", "Bearer " + jwt)
                .body(requestBody)
        .when()
                .post("/api/v1/user-exercises/save")
        .then()
                .statusCode(200)
                .body("exercise.key", equalTo("test-exercise"));
    }

    @Test
    void getsUserExercises() {
        // User

        String username = "user";

        Role userRole = roleRepository.findByRoleName(AppRole.ROLE_USER).orElseGet(() -> roleRepository.save(new Role(AppRole.ROLE_USER)));

        User user = new User(username, "user@example.com", passwordEncoder.encode("password"));

        user.setEnabled(true);
        user.setSignUpMethod("From Test");
        user.setRole(userRole);

        userRepository.save(user);

        String jwt = testHelpers.getTestJwt(username);

        // Exercises

        Exercise exercise1 = new Exercise();
        exercise1.setKey("test-exercise-1");

        exerciseRepository.save(exercise1);

        Exercise exercise2 = new Exercise();
        exercise2.setKey("test-exercise-2");

        exerciseRepository.save(exercise2);

        // User Exercises

        UserExercise userExercise1 = new UserExercise();

        userExercise1.setUser(user);
        userExercise1.setExercise(exercise1);

        userExerciseRepository.save(userExercise1);

        UserExercise userExercise2 = new UserExercise();

        userExercise2.setUser(user);
        userExercise2.setExercise(exercise2);

        userExerciseRepository.save(userExercise2);

        given()
                .contentType(ContentType.JSON)
                .header("Authorization", "Bearer " + jwt)
        .when()
                .get("/api/v1/user-exercises")
        .then()
                .statusCode(200)
                .body("exercise.key", hasItems("test-exercise-1", "test-exercise-2"));
    }
}
