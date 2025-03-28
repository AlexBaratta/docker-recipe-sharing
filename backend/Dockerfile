
FROM python:3.11


WORKDIR /app

# Copy files and install dependencies
 

COPY requirements.txt .
 

RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the app
 
COPY . .

# Expose FastAPI's default port
EXPOSE 8000


CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]