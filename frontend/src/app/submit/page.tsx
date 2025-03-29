"use client";

import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import { Recipe } from "../components/RecipeModal";

export default function SubmitRecipePage() {
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [createdRecipe, setCreatedRecipe] = useState<Recipe | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newRecipe = {
      title,
      image: imageUrl,
      ingredients,
      instructions,
      summary: `<p>Ingredients: ${ingredients}</p><p>Instructions: ${instructions}</p>`,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/add-recipe/",
        newRecipe
      );
      console.log("Recipe added successfully:", response.data);
      setCreatedRecipe(response.data);
    } catch (err) {
      console.error("Error adding recipe:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#111] px-6 sm:px-10 py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 dark:text-white mb-10">
          Share Your Recipe
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-[#1a1a1a] shadow-lg rounded-2xl p-6 sm:p-10 flex flex-col gap-6"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Recipe Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#111] text-gray-800 dark:text-white"
              placeholder="e.g. Spaghetti Carbonara"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Image URL
            </label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#111] text-gray-800 dark:text-white"
              placeholder="https://example.com/image.jpg"
            />
            {imageUrl && (
              <div className="mt-4 relative h-60 w-full border border-gray-300 dark:border-gray-700 rounded-lg">
                <Image
                  src={imageUrl}
                  alt="Preview"
                  fill
                  style={{ objectFit: "contain" }}
                  className="rounded-lg"
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Ingredients
            </label>
            <textarea
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              required
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#111] text-gray-800 dark:text-white h-32 resize-none"
              placeholder="List ingredients separated by commas or newlines"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Instructions
            </label>
            <textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              required
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#111] text-gray-800 dark:text-white h-40 resize-none"
              placeholder="Step-by-step instructions"
            />
          </div>

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full py-3 px-6 transition"
          >
            Submit Recipe
          </button>
        </form>

        {createdRecipe && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Recipe Created!
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}
