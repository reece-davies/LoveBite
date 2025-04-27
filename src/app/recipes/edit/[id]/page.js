"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase.js"
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";

import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function EditRecipe() {
  //const urlParams = params.id;
  const params = useParams(); // returns an object like { id: "someId" }
  const recipeId = params.id;
  console.log("Recipe ID:", recipeId);
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    ingredients: [""],
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const docRef = doc(db, "recipes", recipeId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setFormData({
            name: data.name || "",
            ingredients: data.ingredients || [""],
          });
        } else {
          console.error("No such recipe");
        }
      } catch (error) {
        console.error("Error fetching recipe: ", error);
      }
    }

    if(recipeId) {
      fetchRecipe();
    }
  }, [recipeId]);

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
      // PATCH to Firestore
      const recipeRef = doc(db, "recipes", recipeId);
      await updateDoc(recipeRef, {
        ...formData,
        ingredients: filteredIngredients,
      });
      //await addDoc(recipeRef, {...formData, ingredients: filteredIngredients});
      alert("Recipe updated successfully!");
      router.push("/recipes"); // or "/recipes" or whatever your homepage path is

      //setFormData({name: "", ingredients: [""]}) // Not needed anymore
    } catch (error) {
      console.error("Error adding recipe: ", error);
      alert("Error adding recipe. See console for more info.");
    } finally {
      setLoading(false);
    }
  }

  const deleteRecipe = async () => {
    // DELETE recipe
    await deleteDoc(doc(db, "recipes", recipeId));
    console.log("Deleted recipe")
    alert("Recipe deleted successfully!");

    router.push("/recipes");
  }


  return (
    // Removed styling: min-h-screen
    <div className="bg-zinc-100 min-h-screen grid grid-rows-[auto_1fr_20px] items-start justify-items-center p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="bg-white flex flex-col p-8 gap-8 row-start-2 items-center sm:items-start min-w-[300px] max-w-[500px]">
        <h1 className="text-xl">Edit Recipe</h1>

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
              {loading ? "Editing..." : "Update Recipe"}
            </button>
            <button
              type="button"
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-red-500 text-background gap-2 hover:bg-[#383838] hover:text-red-500 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
              onClick={deleteRecipe}
            >
              Delete Recipe
            </button>
          </div>
          
        </form>

      </main>
    </div>
  );
}
