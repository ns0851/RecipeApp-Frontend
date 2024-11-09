import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { getUserID } from '../hooks/userID.js'
import { useCookies } from 'react-cookie'

const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [cookies, setCookies] = useCookies(["access_token"])
  // const [wishIcon, setWishIcon] = useState('')

  const userID = getUserID()

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    if (cookies.access_token) fetchSavedRecipes();
    // fetchSavedRecipes()
  }, []);


  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">Saved Recipes</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {savedRecipes.map((recipe) => (
          <li
            key={recipe._id}
            className="flex flex-col p-5 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 list-none relative">
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
  )
}

export default SavedRecipes
