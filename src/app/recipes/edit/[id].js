// src/app/recipes/edit/[id].js
"use client";

import { useRouter } from "next/router";

const EditRecipe = () => {
  const router = useRouter();
  const { id } = router.query; // Access the dynamic 'id' parameter

  // You can fetch the recipe details here based on the `id`

  return (
    <div>
      <h1>Edit Recipe: {id}</h1>
      {/* Display or edit the recipe */}
    </div>
  );
};

export default EditRecipe;
