# Use AdoptOpenJDK 11 as base image
FROM adoptopenjdk:11-jre-hotspot

# Set working directory inside the container
WORKDIR /app

# Copy the packaged Spring Boot application JAR file into the container at /app
COPY target/testDemo-0.0.1-SNAPSHOT.jar /app/testDemo.jar

# Expose the port that the Spring Boot application will run on
EXPOSE 8080

# Command to run the Spring Boot application
CMD ["java", "-jar", "testDemo.jar"]
