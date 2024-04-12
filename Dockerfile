# Use AdoptOpenJDK 11 as base image
FROM adoptopenjdk:11-jre-hotspot as builder

# Set working directory inside the container
WORKDIR /app

# Copy the Maven project
COPY . .

# Build the Maven project
RUN mvn -B clean package

# Set up the production environment
FROM adoptopenjdk:11-jre-hotspot

# Set working directory inside the container
WORKDIR /app

# Copy the packaged Spring Boot application JAR file from the builder stage
COPY --from=builder /app/target/testDemo-0.0.1-SNAPSHOT.jar /app/testDemo.jar

# Expose the port that the Spring Boot application will run on
EXPOSE 8080

# Command to run the Spring Boot application
CMD ["java", "-jar", "testDemo.jar"]
