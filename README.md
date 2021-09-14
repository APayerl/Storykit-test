# Storykit-test
Storykit test project

## Run
Run below commands or use bash to run the start.sh script.
```
    cd frontend
    docker build -t storykit_test/frontend:latest .
    cd ../backend
    docker build -t storykit_test/backend:latest .
    cd ..
    docker stack deploy -c stack.yml storykit_test
```
When the `stack deploy` command is issued the backend container will most likely crash a couple of times before succeeding as a result of the database not being redy yet... On my machine it crashes 3 times and succeeeds on the fourth... Just have patience! :D
