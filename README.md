# exercise-tracker

An exercise tracker for bodyweight exercises - https://www.reddit.com/r/bodyweightfitness/wiki/kb/recommended_routine

## Motivation:

There are a couple of apps that do this, however they are annoying to use and not specifically tailored for BWF so I've decided it was worth writing my own.

The goal was to have a web app that can be operated with as little interaction as possible to provide the best UX and to make it easier to track an exercise.

Currently the app is for my own personal use and it has my exercise progression hardcoded both in the client - `constants.ts` and server - `DataLoader.java`. In the future this will be replaced by a login system where users can select their own exercises so that other people can start using it.

## Live URL

The front end is hosted on Vercel. Please bear in mind the design is mobile only at the moment.

https://exercise-tracker-iota-gules.vercel.app

## Features

![](docs/exercise-tracker.gif)

- Warning icons and notifications for rest time

    ![](docs/rest-time-warning.png)

- Stopwatch
- An exercise timer that starts automatically when an exercise is completed when applicable
- Start and end time tracking
- Visual cues and color coding depending on performance and exercise completeness
- Hiding and showing exercise videos / images
- Hiding and showing exercise comments
- Hiding and showing completed exercises

## Technologies / approach

- TDD
- React Testing Library
- Jest
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

- Add a login system
- Add a page where users can select their exercises
- Host the server
- Connect the front end to the server
- Add styling for larger screens
- Dockerise

## Development

### Client

#### Change to the correct folder

```
cd client
```

#### Run the dev app

```
npm run dev
```

#### Run the tests

```
npm run test
```

### Server (WIP)

#### Change to the correct folder

```
cd server
```

Add `.env`

#### Run PostgreSQL

```
docker run --name exercise-tracker-postgres -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres
```

#### Create the DB if it doesn't exist

```
docker exec -it exercise-tracker-postgres psql -U postgres -c "CREATE DATABASE exercise_tracker"
```

#### Run Spring Boot

```
./mvnw clean spring-boot:run
```

More info in `server/README.md`
