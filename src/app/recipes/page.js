"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase.js"
import { collection, getDocs } from "firebase/firestore";
import Image from "next/image";

export default function Home() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        // Process firestore data
        const querySnapshot = await getDocs(collection(db, "recipes"));
        const recipeList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        setRecipes(recipeList);
      } catch (error) {
        console.log("ERROR = ", error)
      }
    };

    fetchRecipes();
  }, []);


  return (
    // Removed styling: min-h-screen
    <div className="bg-zinc-100 min-h-screen grid grid-rows-[auto_1fr_20px] items-start justify-items-center p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="bg-white flex flex-col p-8 gap-8 row-start-2 items-center sm:items-start min-w-[300px] max-w-[500px]">
        <h1 className="text-xl">Recipes</h1>
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li> Get started by adding a new recipe.
          </li>
          <li>Input all necessary ingredients for each recipe.</li>
          <li>Make changes or delete existing recipes through the {" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
            edit
            </code>
            {" "} button.</li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row w-full justify-center">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:text-white hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="/recipes/add"
            rel="noopener noreferrer"
          >
            Add New Recipe
          </a>
          
        </div>

        {/* Recipe */}
        {recipes.map((recipe) => (
          <div key={recipe.id} className="border-2 border-gray-500 w-full">
            <p className="text-gray-800">{recipe.name}</p>
          </div>
        ))}


      </main>
    </div>
  );
}
