import React, { useState } from 'react';
import axios from 'axios'
// import { getUserID } from '../hooks/userID';
import { useNavigate } from 'react-router-dom';



const CreateRecipe = () => {
  const userr = window.localStorage.getItem("userID");
  const [formData, setFormData] = useState({
    name: '',
    ingredients: '',
    instructions: '',
    imageUrl : '',
    cookingTime: '',
    userOwner: userr,
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const navigate = useNavigate()
  const handleSubmit = async(e)=>{
    e.preventDefault()
    try {
      await axios.post("http://localhost:3001/recipes/", formData)
      alert("Created")
      navigate('/')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="flex flex-col items-center bg-white min-h-screen">
      <div className="w-full max-w-md p-8 mt-8 bg-gray-50 shadow-lg rounded-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Create Recipe</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-gray-700 mb-1">Name</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-gray-200"
            />
          </div>

          <div>
            <label htmlFor="ingredients" className="block text-gray-700 mb-1">Ingredients</label>
            <input 
              type="text" 
              id="ingredients" 
              name="ingredients" 
              value={formData.ingredients} 
              onChange={handleChange} 
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-gray-200"
            />
          </div>

          <div>
            <label htmlFor="instructions" className="block text-gray-700 mb-1">Instructions</label>
            <input 
              type="text" 
              id="instructions" 
              name="instructions" 
              value={formData.instructions} 
              onChange={handleChange} 
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-gray-200"
            />
          </div>

          <div>
            <label htmlFor="imageUrl" className="block text-gray-700 mb-1">Image URL</label>
            <input 
              type="text" 
              id="imageUrl" 
              name="imageUrl" 
              value={formData.imageUrl} 
              onChange={handleChange} 
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-gray-200"
            />
          </div>

          <div>
            <label htmlFor="cookingTime" className="block text-gray-700 mb-1">Cooking Time( in mins )</label>
            <input 
              type="number" 
              id="cookingTime" 
              name="cookingTime" 
              value={formData.cookingTime} 
              onChange={handleChange} 
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-gray-200"
            />
          </div>
          

          <button onClick={handleSubmit}
            type="submit" 
            className="w-full py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600 transition-all duration-200"
          >
            Add Recipe
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateRecipe;
