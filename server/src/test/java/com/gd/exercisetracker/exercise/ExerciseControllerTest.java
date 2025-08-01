package com.gd.exercisetracker.exercise;

import com.gd.exercisetracker.TestHelpers;
import com.gd.exercisetracker.exercise.enums.ExerciseCategory;
import com.gd.exercisetracker.exercise.enums.ExerciseType;
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

import static com.gd.exercisetracker.exercise.enums.ExerciseCategory.WARM_UP;
import static com.gd.exercisetracker.exercise.enums.ExerciseType.PULL_UP;
import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.hasItems;
import static org.hamcrest.Matchers.hasSize;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class ExerciseControllerTest {
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>(
            "postgres:15-alpine");

    @Autowired
    ExerciseRepository exerciseRepository;

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
        exerciseRepository.deleteAll();
    }

    @Test
    void getsAllExercises() {
        String jwt = testHelpers.getTestJwt("admin");

        Exercise exercise1 = new Exercise();

        exercise1.setKey("gmb-wrist-prep");
        exercise1.setName("GMB Wrist Prep");
        exercise1.setCategory(WARM_UP);
        exercise1.setType(ExerciseType.WARM_UP);
        exercise1.setTargetSets(1);
        exercise1.setTargetRepsMin(30);
        exercise1.setTargetRepsMax(30);
        exercise1.setDuration(true);
        exercise1.setTargetRest(0);
        exercise1.setAdditionalRest(0);
        exercise1.setMediaLink("https://www.youtube.com/watch?v=HFv2WwgeVMk");
        exercise1.setComments(null);

        exerciseRepository.save(exercise1);

        Exercise exercise2 = new Exercise();

        exercise2.setKey("arch-hangs");
        exercise2.setName("Arch Hangs");
        exercise2.setCategory(ExerciseCategory.FIRST_PAIR);
        exercise2.setType(PULL_UP);
        exercise2.setTargetSets(3);
        exercise2.setTargetRepsMin(5);
        exercise2.setTargetRepsMax(8);
        exercise2.setDuration(false);
        exercise2.setTargetRest(90);
        exercise2.setAdditionalRest(90);
        exercise2.setMediaLink("https://www.youtube.com/watch?v=C995b3KLXS4&t=7s");
        exercise2.setComments("<ul><li>Do as many reps as you want</li></ul>");

        exerciseRepository.save(exercise2);

        given()
                .contentType(ContentType.JSON)
                .header("Authorization", "Bearer " + jwt)
                .when()
                .get("/api/v1/exercises")
                .then()
                .statusCode(200)
                .body(".", hasSize(2))
                .body("key", hasItems("gmb-wrist-prep", "arch-hangs"))
                .body("name", hasItems("GMB Wrist Prep", "Arch Hangs"))
                .body("category", hasItems("WARM_UP", "FIRST_PAIR"))
                .body("type", hasItems("WARM_UP", "PULL_UP"))
                .body("targetSets", hasItems(1, 3))
                .body("targetRepsMin", hasItems(30, 5))
                .body("targetRepsMax", hasItems(30, 8))
                .body("duration", hasItems(true, false))
                .body("targetRest", hasItems(0, 90))
                .body("additionalRest", hasItems(0, 90))
                .body("mediaLink",
                        hasItems("https://www.youtube.com/watch?v=HFv2WwgeVMk",
                                "https://www.youtube.com/watch?v=C995b3KLXS4&t=7s"))
                .body("comments", hasItems(null, "<ul><li>Do as many reps as you want</li></ul>"));
    }

    @Test
    void returns401WhenNoAuthHeaderSent() {
        given()
                .contentType(ContentType.JSON)
                .when()
                .get("/api/v1/exercises")
                .then()
                .statusCode(401);
    }

    @Test
    void returns401WhenInvalidTokenSent() {
        given()
                .contentType(ContentType.JSON)
                .header("Authorization", "Bearer invalid-token")
                .when()
                .get("/api/v1/exercises")
                .then()
                .statusCode(401);
    }
}
