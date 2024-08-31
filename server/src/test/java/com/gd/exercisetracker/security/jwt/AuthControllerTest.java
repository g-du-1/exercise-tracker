package com.gd.exercisetracker.security.jwt;

import com.gd.exercisetracker.TestHelpers;
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
import org.springframework.http.HttpStatus;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.PostgreSQLContainer;

import java.util.Collections;
import java.util.List;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.*;
import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class AuthControllerTest {
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>(
            "postgres:15-alpine");

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    TestHelpers testHelpers;

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
    }

    @Test
    void signsUpUser() {
        SignupRequest signupRequest = new SignupRequest();
        signupRequest.setUsername("example-user");
        signupRequest.setEmail("example@example.com");
        signupRequest.setPassword("password");
        signupRequest.setRole(Collections.singleton("USER"));

        given()
                .contentType(ContentType.JSON)
                .body(signupRequest)
                .when()
                .post("/api/v1/auth/public/signup")
                .then()
                .statusCode(HttpStatus.OK.value())
                .body("message", equalTo("User registered successfully!"));

        List<User> users = userRepository.findAll();

        assertEquals(1, users.size());
    }

    @Test
    void signupRespondsWithErrorIfUsernameTaken() {
        User user = new User();
        user.setUserName("username");
        user.setEmail("user@user.com");
        Role userRole = roleRepository.findByRoleName(AppRole.ROLE_USER).orElseGet(() -> roleRepository.save(new Role(AppRole.ROLE_USER)));
        user.setRole(userRole);

        userRepository.save(user);

        SignupRequest signupRequest = new SignupRequest();
        signupRequest.setUsername("username");
        signupRequest.setEmail("other-email@user.com");
        signupRequest.setPassword("password");
        signupRequest.setRole(Collections.singleton("USER"));

        given()
                .contentType(ContentType.JSON)
                .body(signupRequest)
                .when()
                .post("/api/v1/auth/public/signup")
                .then()
                .statusCode(400)
                .body("message", equalTo("Error: Username is already taken!"));

        List<User> users = userRepository.findAll();

        assertEquals(1, users.size());
    }

    @Test
    void signupRespondsWithErrorIfEmailTaken() {
        User user = new User();
        user.setUserName("username");
        user.setEmail("user@user.com");
        Role userRole = roleRepository.findByRoleName(AppRole.ROLE_USER).orElseGet(() -> roleRepository.save(new Role(AppRole.ROLE_USER)));
        user.setRole(userRole);

        userRepository.save(user);

        SignupRequest signupRequest = new SignupRequest();
        signupRequest.setUsername("other-user");
        signupRequest.setEmail("user@user.com");
        signupRequest.setPassword("other-password");
        signupRequest.setRole(Collections.singleton("USER"));

        given()
                .contentType(ContentType.JSON)
                .body(signupRequest)
                .when()
                .post("/api/v1/auth/public/signup")
                .then()
                .statusCode(400)
                .body("message", equalTo("Error: Email is already in use!"));

        List<User> users = userRepository.findAll();

        assertEquals(1, users.size());
    }

    @Test
    void signsUpUserRoleWithoutRoleInRequest() {
        SignupRequest signupRequest = new SignupRequest();
        signupRequest.setUsername("example-user");
        signupRequest.setEmail("example@example.com");
        signupRequest.setPassword("password");

        given()
                .contentType(ContentType.JSON)
                .body(signupRequest)
                .when()
                .post("/api/v1/auth/public/signup")
                .then()
                .statusCode(HttpStatus.OK.value())
                .body("message", equalTo("User registered successfully!"));

        List<User> users = userRepository.findAll();

        assertEquals(1, users.size());

        User user = userRepository.findByUserName("example-user").orElseThrow(() -> new RuntimeException("example-user not found in test"));
        Role role = user.getRole();

        assertEquals(AppRole.ROLE_USER, role.getRoleName());
    }

    @Test
    void registersAnAdminUser() {
        SignupRequest signupRequest = new SignupRequest();
        signupRequest.setUsername("admin-user");
        signupRequest.setEmail("admin@example.com");
        signupRequest.setPassword("password");
        signupRequest.setRole(Collections.singleton("ADMIN"));

        given()
                .contentType(ContentType.JSON)
                .body(signupRequest)
                .when()
                .post("/api/v1/auth/public/signup")
                .then()
                .statusCode(HttpStatus.OK.value())
                .body("message", equalTo("User registered successfully!"));

        List<User> users = userRepository.findAll();

        assertEquals(1, users.size());

        User user = userRepository.findByUserName("admin-user").orElseThrow(() -> new RuntimeException("admin-user not found in test"));
        Role role = user.getRole();

        assertEquals(AppRole.ROLE_ADMIN, role.getRoleName());
    }

    @Test
    void returnsUserDetailsIfReqHasToken() {
        User user = new User();
        user.setUserName("admin");
        user.setEmail("test@test.com");
        Role adminRole = roleRepository.findByRoleName(AppRole.ROLE_ADMIN).orElseGet(() -> roleRepository.save(new Role(AppRole.ROLE_ADMIN)));
        user.setRole(adminRole);

        userRepository.save(user);

        String jwt = testHelpers.getTestJwt("admin");

        given()
                .contentType(ContentType.JSON)
                .header("Authorization", "Bearer " + jwt)
                .when()
                .get("/api/v1/auth/user")
                .then()
                .statusCode(200)
                .body("id", isA(Number.class))
                .body("username", equalTo("admin"))
                .body("email", equalTo("test@test.com"))
                .body("enabled", equalTo(true))
                .body("roles", hasItem("ROLE_ADMIN"));
    }

    @Test
    void doesNotLetUsersAccessOtherUsersData() {
        User user = new User();
        user.setUserName("admin");
        user.setEmail("test@test.com");
        Role adminRole = roleRepository.findByRoleName(AppRole.ROLE_ADMIN).orElseGet(() -> roleRepository.save(new Role(AppRole.ROLE_ADMIN)));
        user.setRole(adminRole);

        userRepository.save(user);

        String jwt = testHelpers.getTestJwt("other-user");

        given()
                .contentType(ContentType.JSON)
                .header("Authorization", "Bearer " + jwt)
                .when()
                .get("/api/v1/auth/user")
                .then()
                .statusCode(401);
    }
}
