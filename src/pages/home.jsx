import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { getUserID } from '../hooks/userID.js';
import { useCookies } from 'react-cookie';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedMap, setSavedMap] = useState({}); // Track saved state per recipe
  const [cookies] = useCookies(["access_token"]);
  const userID = getUserID();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get("https://recipe-app-backend-rho.vercel.app/recipes/");
        setRecipes(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `https://recipe-app-backend-rho.vercel.app/recipes/savedRecipes/ids/${userID}`
        );

        // Initialize savedMap with saved recipes
        const initialSavedMap = response.data.savedRecipes.reduce((acc, recipeId) => {
          acc[recipeId] = true;
          return acc;
        }, {});
        setSavedMap(initialSavedMap);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRecipe();
    if (cookies.access_token) fetchSavedRecipes();
  }, [userID, cookies.access_token]);

  const saveRecipe = async (recipeID) => {
    try {
      await axios.put(
        "https://recipe-app-backend-rho.vercel.app/recipes/",
        { recipeID, userID },
        { headers: { authorization: cookies.access_token } }
      );

      // Directly update savedMap to mark the recipe as saved
      setSavedMap((prevMap) => ({ ...prevMap, [recipeID]: true }));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">Recipes</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe) => (
          <li
            key={recipe._id}
            className="flex flex-col p-5 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 list-none relative"
          >
            <button
              className={`absolute top-3 right-3 px-3 py-1 rounded-full transition duration-300 ${
                savedMap[recipe._id]
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-red-500 text-white hover:bg-red-600"
              }`}
              onClick={() => saveRecipe(recipe._id)}
              disabled={savedMap[recipe._id]}
            >
              {savedMap[recipe._id] ? "Saved" : "Save"}
            </button>

            <img
              src={recipe.imageUrl}
              alt="Image of Recipe"
              className="w-full h-48 object-cover rounded-t-lg mb-4"
            />
            <div className="flex-grow">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">{recipe.name}</h2>
              <div className="mb-4">
                <p className="font-semibold text-gray-600">Ingredients:</p>
                <p className="text-gray-600">{recipe.ingredients}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-600">Instructions:</p>
                <p className="text-gray-600">{recipe.instructions}</p>
              </div>
            </div>
            <p className="text-gray-500 mt-4">Cooking Time: {recipe.cookingTime} minutes</p>
          </li>
        ))}
      </div>
    </div>
  );
};

export default Home;
