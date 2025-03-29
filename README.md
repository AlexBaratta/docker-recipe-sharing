# docker-recipe-sharing

This lets people share their favorite recipes to the world! 

## Technical Requirements
### React Frontend
Our project uses React with Next.js to provide a modern frontend UI with Tailwind CSS. Next.js is the recommended framework to use React with. Our frontend contains CRUD and Non-crud pages. 

### FastAPI Backend
Our project uses a fast API backend that creates endpoints that our frontend consumes. These endpoints are `/add-recipe` and `/get-recipes`. Our backend also includes a call to the Spoonacular API in order to populate the database with recipes if the database is empty. 

### PostgreSQL Database
This database is populated with example data from the backend when it is first created. This data persists in the `postgres-data` folder.

### Dockerization
Our services all contain a Dockerfile. These are used in the `docker-compose.yml` in the project root to orchestrate the starting of our services. 

### Environment Variables
We had no global environment variables, hence the root `.env` file being empty. We had database environment variables that were stores in the `/config` folder, these being `backend.env` and `db.env`. Our sensitive data is stored in there including the spoonacular API key which is provided in case it is decided you want to clear the postgres data and start from scratch. 