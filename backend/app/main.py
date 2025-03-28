from typing import Union, Annotated, Optional
from contextlib import asynccontextmanager

from fastapi import Depends, FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Field, Session, SQLModel, create_engine, select

app = FastAPI()

# Needed to prevent a CORS error when using the frontend
origins = [
    "http://localhost:80",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#type Recipe = {
#  id: number;
#  title: string;
#  image: string;
#  summary: string;
#};

# Database model
class Recipe(SQLModel, table=True):
    id: Optional[int] | None = Field(default=None, primary_key=True)
    title: str = Field(index=True)
    image: str = Field(index=True)
    summary: str = Field(index=True)
    

postgres_url = "postgresql://localhost:5432"

engine = create_engine(postgres_url)

# Creates the tables for all table models
def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

# Session stores the objects in memory, uses engine to communicate with the database
def get_session():
    with Session(engine) as session:
        yield session

# Simplifaction for everything using the session
SessionDep = Annotated[Session, Depends(get_session)]

# Create the database and tables on startup
# Everything before the yield statement is executed when the app starts
# Everything after the yield statement is executed when the app stops
@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_and_tables()
    yield
    # Close the database connection when the app is stopped
    engine.dispose()

app = FastAPI(lifespan=lifespan)

# add a recipe to the database
# format: 
# {
#   "title": "recipe title",
#   "image": "recipe image",
#   "summary": "recipe summary"
# }
@app.post("/add-recipe/")
def create_recipe(recipe: Recipe, session: SessionDep) -> Recipe:
    session.add(recipe)
    session.commit()
    session.refresh(recipe)
    return recipe

# get all recipes from the database
@app.get("/get-recipes/")
def read_heroes(
    session: SessionDep,
    offset: int = 0,
    limit: Annotated[int, Query(le=100)] = 100,
) -> list[Recipe]:
    heroes = session.exec(select(Recipe).offset(offset).limit(limit)).all()
    return heroes