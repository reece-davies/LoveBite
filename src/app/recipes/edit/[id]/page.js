"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase.js"
import { addDoc, collection } from "firebase/firestore";
import { useParams } from "next/navigation";


export default function EditRecipe() {
  //const urlParams = params.id;
  const params = useParams(); // returns an object like { id: "someId" }
  const recipeId = params.id;
  const [formData, setFormData] = useState({
    name: "",
    ingredients: [""],
  });
  const [loading, setLoading] = useState(false);

  // Handle changes to Recipe title/name
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  };

  // Handle changes to each ingredient input
  const handleIngredientChange = (index, value) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index] = value;
    setFormData((prevData) => ({
      ...prevData,
      ingredients: newIngredients,
    }))
  };

  // Add another ingredient text input
  const addIngredientField = () => {
    setFormData((prevData) => ({
      ...prevData,
      ingredients: [...prevData.ingredients, ""],
    }))
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const filteredIngredients = formData.ingredients.filter((ing) => ing.trim() !== "")
    if (!formData.name || filteredIngredients.length === 0) {
      alert("Please fill in all fields");
      return;
    }
    setLoading(true);

    try {
      // POST to FireStore
      const recipeRef = collection(db, "recipes");
      await addDoc(recipeRef, {...formData, ingredients: filteredIngredients});
      alert("Recipe added successfully!");

      setFormData({name: "", ingredients: [""]})
    } catch (error) {
      console.error("Error adding recipe: ", error);
      alert("Error adding recipe. See console for more info.");
    } finally {
      setLoading(false);
    }
  }


  return (
    // Removed styling: min-h-screen
    <div className="bg-zinc-100 min-h-screen grid grid-rows-[auto_1fr_20px] items-start justify-items-center p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="bg-white flex flex-col p-8 gap-8 row-start-2 items-center sm:items-start min-w-[300px] max-w-[500px]">
        <h1 className="text-xl">Edit Recipe: {recipeId}</h1>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <label htmlFor="name" className="text-sm font-medium">
            Recipe Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter recipe name"
            className="border rounded p-2"
          />

          <label htmlFor="ingredients" className="text-sm font-medium">
            Ingredients
          </label>
          
          {formData.ingredients.map((ingredient, index) => (
            <input
              key={index}
              type="text"
              value={ingredient}
              onChange={(e) => handleIngredientChange(index, e.target.value)}
              placeholder={`Ingredient ${index + 1}`}
              className="border rounded p-2"
            />
          ))}

          <button
            type="button"
            onClick={addIngredientField}
            className="border rounded p-2 bg-gray-200 hover:bg-gray-300"
          >+ Add ingredient</button>

          <div className="flex gap-4 content-center items-center flex-col sm:flex-row justify-center w-full">
            <button
              type="submit"
              disabled={loading}
              className="rounded-full border border-solid border-black/[.08] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            >
              {loading ? "Editing..." : "Edit Recipe"}
            </button>
            <a
                className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-red-500 text-background gap-2 hover:bg-[#383838] hover:text-red-500 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
                href="/recipes"
                rel="noopener noreferrer"
              >
                Delete Recipe
              </a>
          </div>
          
        </form>

      </main>
    </div>
  );
}
