"use client";

import React, { useEffect } from "react";

export type Recipe = {
  id: number;
  title: string;
  image: string;
  summary: string;
  ingredients: string;
  instructions: string;
};

type RecipeModalProps = {
  recipe: Recipe;
  onClose: () => void;
};

export default function RecipeModal({ recipe, onClose }: RecipeModalProps) {
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="relative bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-lg p-6 max-w-lg w-full z-10 max-h-[90vh] overflow-y-auto">
        <button
          className="absolute top-2 right-2 text-3xl font-bold text-gray-600 dark:text-gray-300"
          onClick={onClose}
        >
          &times;
        </button>
        <img
          src={recipe.image}
          alt={recipe.title}
          className="rounded-xl w-full h-64 object-cover mb-4"
        />
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
          {recipe.title}
        </h2>
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
            Ingredients
          </h3>
          <div
            className="text-gray-700 dark:text-gray-300"
            dangerouslySetInnerHTML={{ __html: recipe.ingredients }}
          ></div>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
            Instructions
          </h3>
          <div
            className="text-gray-700 dark:text-gray-300"
            dangerouslySetInnerHTML={{ __html: recipe.instructions }}
          ></div>
        </div>
      </div>
    </div>
  );
}
