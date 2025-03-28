"use client";

import { useState } from "react";

export default function SubmitRecipePage() {
  const [title, setTitle] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    //TODO: make the thing work
    e.preventDefault();
    console.log({
      title,
      imageFile,
      ingredients,
      instructions,
    });

    alert("GIMME AN ENDPOINT");
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
              Upload Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full text-gray-800 dark:text-white"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-4 rounded-lg max-h-60 object-contain border border-gray-300 dark:border-gray-700"
              />
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
              placeholder="List ingredients separated by commas or lines"
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
      </div>
    </div>
  );
}
