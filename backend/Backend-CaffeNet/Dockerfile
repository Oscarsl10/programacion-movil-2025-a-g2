 # Dockerfile corregido
 # Usa una versión actualizada y disponible de Maven con JDK 17
  FROM maven:3.9-eclipse-temurin-17 AS build
  WORKDIR /app
  COPY . .
  RUN mvn clean package -DskipTests

# Runtime stage con una imagen JDK disponible
  FROM eclipse-temurin:17-jdk
  WORKDIR /app
  COPY --from=build /app/target/*.jar app.jar
  ENTRYPOINT ["java", "-jar", "app.jar"]