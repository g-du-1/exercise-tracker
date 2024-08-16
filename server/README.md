# Server

Add .env

## Run DB

```
docker run --name exercise-tracker-postgres -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres 
```

## Run Spring Boot

```
./mvnw clean spring-boot:run
```

## Export db

```
docker exec exercise-tracker-postgres pg_dump -U postgres exercise_tracker > exercise_tracker.sql
```

## Import db

```
docker exec -it exercise-tracker-postgres psql -U postgres -c "DROP DATABASE IF EXISTS exercise_tracker"
```

```
docker cp exercise_tracker.sql exercise-tracker-postgres:/
```

```
docker exec -it exercise-tracker-postgres psql -U postgres -c "CREATE DATABASE exercise_tracker"
```

```
docker exec -i exercise-tracker-postgres psql -U postgres -d exercise_tracker < exercise_tracker.sql
```

## PGAdmin

```
docker run --name pgadmin-container -p 5050:80 -e PGADMIN_DEFAULT_EMAIL=user@example.com -e PGADMIN_DEFAULT_PASSWORD=test1234 -d dpage/pgadmin4
```

Use `host.docker.internal` for host name in PGAdmin