# Storykit-test
Storykit test project

## Run
Run below commands or use bash to run the start.sh script.
    cd frontend
    docker build -t storykit_test/frontend:latest .
    cd ../backend
    docker build -t storykit_test/backend:latest .
    cd ..
    docker stack deploy -c stack.yml storykit_test