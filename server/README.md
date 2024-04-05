# Server

Add .env

docker run --name exercise-tracker-postgres -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres 

./mvnw clean spring-boot:run