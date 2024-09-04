# Java 17을 사용하는 기본 이미지
FROM openjdk:17-jdk-slim

# 애플리케이션이 실행될 작업 디렉토리 설정
WORKDIR /app

# 호스트의 JAR 파일을 컨테이너로 복사 (호스트 절대 경로 사용)
COPY /home/ubuntu/Rentmon_Back/build/libs/Rentmon_Back-0.0.1-SNAPSHOT.jar app.jar

# 컨테이너가 사용할 포트 노출
EXPOSE 8070

# 애플리케이션 실행 명령어
ENTRYPOINT ["java", "-jar", "app.jar"]
