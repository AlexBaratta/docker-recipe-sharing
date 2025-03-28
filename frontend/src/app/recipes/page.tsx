"use client";

import { useEffect, useState } from "react";
import axios from "axios";

type Recipe = {
  id: number;
  title: string;
  image: string;
  summary: string;
};

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchRecipes = async () => {
    setLoading(true);
    try {
      //TODO: fetch from backend instead of this. scrape this stuff into db
      const res = await axios.get(
        "https://api.spoonacular.com/recipes/random",
        {
          params: {
            number: 6,
            apiKey: process.env.RECIPE_API_KEY,
          },
        }
      );
      setRecipes(res.data.recipes);
    } catch (err) {
      console.error("Error fetching recipes:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#111] px-6 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">
        Random Recipes
      </h1>

      {loading ? (
        <div className="text-center text-lg text-gray-500 dark:text-gray-400">
          Loading recipes...
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-md hover:shadow-lg transition p-4"
            >
              <img
                src={recipe.image}
                alt={recipe.title}
                className="rounded-xl w-full h-48 object-cover mb-4"
              />
              <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                {recipe.title}
              </h2>
              <p
                className="text-sm text-gray-600 dark:text-gray-400 line-clamp-4"
                dangerouslySetInnerHTML={{ __html: recipe.summary }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
