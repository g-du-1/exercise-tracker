package com.gd.exercisetracker.exercise;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.hasItems;
import static org.hamcrest.Matchers.hasSize;

import io.restassured.RestAssured;
import io.restassured.http.ContentType;

import java.util.List;

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

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class ExerciseControllerTest {

    @LocalServerPort
    private Integer port;

    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>(
            "postgres:15-alpine"
    );

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

    @Autowired
    ExerciseRepository exerciseRepository;

    @BeforeEach
    void setUp() {
        RestAssured.baseURI = "http://localhost:" + port;
        exerciseRepository.deleteAll();
    }

    @Test
    void shouldGetAllExercises() {
        List<Exercise> exercises = List.of(
            new Exercise("gmb-wrist-prep", "GMB Wrist Prep", "warmup", "warmup", 1, 30, 30, true, 0, 0, "https://www.youtube.com/watch?v=HFv2WwgeVMk", null),
            new Exercise("arch-hangs" ,"Arch Hangs", "firstPair", "pullUp", 3, 5, 8, false, 90, 90, "https://www.youtube.com/watch?v=C995b3KLXS4&t=7s", "<ul><li>Do as many reps as you want</li></ul>")
        );

        exerciseRepository.saveAll(exercises);

        given()
            .contentType(ContentType.JSON)
        .when()
            .get("/api/v1/exercises")
        .then()
            .statusCode(200)
            .body(".", hasSize(2))
            .body("key", hasItems("gmb-wrist-prep", "arch-hangs"))
            .body("name", hasItems("GMB Wrist Prep", "Arch Hangs"))
            .body("category", hasItems("warmup", "firstPair"))
            .body("type", hasItems("warmup", "pullUp"))
            .body("targetSets", hasItems(1, 3))
            .body("targetRepsMin", hasItems(30, 5))
            .body("targetRepsMax", hasItems(30, 8))
            .body("isDuration", hasItems(true, false))
            .body("targetRest", hasItems(0, 90))
            .body("additionalRest", hasItems(0, 90))
            .body("mediaLink", hasItems("https://www.youtube.com/watch?v=HFv2WwgeVMk", "https://www.youtube.com/watch?v=C995b3KLXS4&t=7s"))
            .body("comments", hasItems(null, "<ul><li>Do as many reps as you want</li></ul>"));
    }
}
