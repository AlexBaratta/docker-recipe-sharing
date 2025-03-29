from typing import Union, Annotated, Optional
from contextlib import asynccontextmanager

import httpx
from fastapi import Depends, FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Field, Session, SQLModel, create_engine, select
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    database_url: str
    spoonacular_api_key: str

    model_config = SettingsConfigDict(env_file=".env")


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
    instructions: str = Field(index=True)
    ingredients: str = Field(index=True)
    

postgres_url = Settings().database_url
spoonacular_api_key = Settings().spoonacular_api_key
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
    # Seed recipes if DB is empty
    async with httpx.AsyncClient() as client:
        with Session(engine) as session:
            existing_recipes = session.exec(select(Recipe)).all()
            if not existing_recipes:
                response = await client.get(
                    "https://api.spoonacular.com/recipes/random",
                    params={"number": 20, "apiKey": spoonacular_api_key}
                )
                data = response.json()
                recipes_data = data.get("recipes", [])
                for rec in recipes_data:
                    # Parse instructions if exists, else join from analyzedinstructions
                    instructions_text = rec.get("instructions", "")
                    if not instructions_text:
                        analyzed = rec.get("analyzedInstructions", [])
                        if analyzed and len(analyzed) > 0:
                            steps = analyzed[0].get("steps", [])
                            instructions_text = "\n".join(step["step"] for step in steps)
                    
                    # Parse ingredients from extended ingredients
                    ingredients_list = rec.get("extendedIngredients", [])
                    ingredients_text = ", ".join(
                        ingredient.get("original", ingredient.get("name", ""))
                        for ingredient in ingredients_list
                    )
                    
                    recipe = Recipe(
                        title=rec["title"],
                        image=rec["image"],
                        summary=rec["summary"],
                        instructions=instructions_text,
                        ingredients=ingredients_text,
                    )
                    session.add(recipe)
                session.commit()
                print("Seeded recipes from external API")
    yield
    engine.dispose()

app = FastAPI(lifespan=lifespan)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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