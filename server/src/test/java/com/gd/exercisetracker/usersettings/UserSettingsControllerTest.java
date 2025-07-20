package com.gd.exercisetracker.usersettings;

import com.gd.exercisetracker.TestHelpers;
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
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.PostgreSQLContainer;

import static io.restassured.RestAssured.given;
import static org.hamcrest.core.Is.is;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class UserSettingsControllerTest {
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:15-alpine");

    @Autowired
    TestHelpers testHelpers;

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserSettingsRepository userSettingsRepository;

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
        userSettingsRepository.deleteAll();
        userRepository.deleteAll();
    }

    @Test
    void getsUserSettings() {
        User user = testHelpers.saveTestUser();
        String jwt = testHelpers.getTestJwt(user.getUserName());

        given()
            .contentType(ContentType.JSON).cookie("JWT_TOKEN", jwt)
        .when()
            .get("/api/v1/user-settings")
        .then().statusCode(200)
            .body("showCompletedExercises", is(true))
            .body("showComments", is(false))
            .body("showMedia", is(false));
    }

    @Test
    void getsAlreadyExistingUserSettings() {
        UserSettings userSettings = new UserSettings();
        userSettings.setShowCompletedExercises(true);
        userSettings.setShowComments(true);
        userSettings.setShowMedia(true);

        User user = testHelpers.saveTestUser();
        userSettings.setUser(user);
        userSettingsRepository.save(userSettings);
        String jwt = testHelpers.getTestJwt(user.getUserName());

        given()
            .contentType(ContentType.JSON)
            .cookie("JWT_TOKEN", jwt)
        .when()
            .get("/api/v1/user-settings")
        .then()
            .statusCode(200)
            .body("showCompletedExercises", is(true))
            .body("showComments", is(true))
            .body("showMedia", is(true));
    }

    @Test
    void savesUserSettings() {
        User user = testHelpers.saveTestUser();
        UserSettings userSettings = new UserSettings();
        userSettings.setUser(user);
        userSettingsRepository.save(userSettings);
        String jwt = testHelpers.getTestJwt(user.getUserName());

        String requestBody = "{\"showCompletedExercises\": true, \"showComments\": false, \"showMedia\": true}";

        given()
            .contentType(ContentType.JSON)
            .cookie("JWT_TOKEN", jwt)
            .body(requestBody)
        .when()
            .post("/api/v1/user-settings/save")
        .then()
            .statusCode(200)
            .body("showCompletedExercises", is(true))
            .body("showComments", is(false))
            .body("showMedia", is(true));
    }
}
