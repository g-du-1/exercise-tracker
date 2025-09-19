# RRLog

An exercise tracker for bodyweight exercises - https://www.reddit.com/r/bodyweightfitness/wiki/kb/recommended_routine

## Motivation:

There are a couple of apps that do this, however they are annoying to use and not specifically tailored for BWF so I've decided it was worth writing my own.

The goal was to have a web app that can be operated with as little interaction as possible to provide the best UX and to make it easier to track an exercise.

## Live URL

The front end is hosted on Vercel. Please bear in mind the design is mobile only at the moment.

https://rr-log-iota-gules.vercel.app

## Features

![](docs/rr-log.gif)

- Warning icons and notifications for rest time

    ![](docs/rest-time-warning.png)

- Stopwatch
- An exercise timer that starts automatically when an exercise is completed when applicable
- Start and end time tracking
- Visual cues and color coding depending on performance and exercise completeness
- Hiding and showing exercise videos / images
- Hiding and showing exercise comments
- Hiding and showing completed exercises

## Roadmap

https://github.com/users/g-du-1/projects/4

## Technologies / approach

- TDD
- React Testing Library
- Vitest
- TypeScript
- Nextjs
- zustand
- Material UI
- Java Spring Boot
- PostgreSQL (Docker)
- Testcontainers
- JUnit
- REST Assured
- CI / CD (GH Actions, Vercel)

## Future work:

- Reduce Readme gif size
- Host the server
- Add styling for larger screens

## Development

Add .envs from the templates.

`docker-compose up -d`

For local dev use the .env.local template and IntelliJ run configs (add these envs) to run the server and client locally to replace the two services running in docker.
