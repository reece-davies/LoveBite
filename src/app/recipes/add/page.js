"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase.js"
import { addDoc, collection } from "firebase/firestore";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    ingredients: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.ingredients) {
      alert("Please fill in all fields");
      return;
    }
    setLoading(true);

    try {
      // POST to FireStore
      const recipeRef = collection(db, "recipes");
      await addDoc(recipeRef, formData);
      alert("Recipe added successfully!");


      setFormData({name: "", ingredients: ""})
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
        <h1 className="text-xl">Add Recipe</h1>

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
          <textarea
            id="ingredients"
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            placeholder="Enter ingredients"
            className="border rounded p-2"
          />

          <div className="flex gap-4 content-center items-center flex-col sm:flex-row justify-center w-full">
            <button
              type="submit"
              disabled={loading}
              className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            >
              Add Recipe
            </button>
          </div>
        </form>

      </main>
    </div>
  );
}
