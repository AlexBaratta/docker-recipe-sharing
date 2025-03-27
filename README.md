# docker-recipe-sharing

### Create Frontend Docker Image and Run
1. Navigate to the frontend directory 
```bash
cd frontend
```
2. Build the docker image with: 
```bash
docker build -t frontend .
```

3. Run the docker image with:
```bash
docker run -d -p 3000:3000 --env-file .env --name frontend-container frontend
```