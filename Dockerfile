# Step 1: 사용할 베이스 이미지 (GCC 포함)
FROM gcc:latest

# Step 2: 작업 디렉토리 설정
WORKDIR /code

# Step 3: 컨테이너가 실행되면 유지되도록 설정
CMD ["sh", "-c", "tail -f /dev/null"]
