import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router";

interface RecipeData {
  idMeal: number;
  strMeal: string;
  strMealThumb?: string;
  strCategory?: string;
  strArea?: string;
}

const RecipeList = () => {
  const [recipes, setRecipes] = useState<RecipeData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRecipeForLetter = async (letter: string = "a") => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`,
      );

      const data = response.data;
      setRecipes(data.meals || []);
    } catch (err) {
      setError("Failed to load recipes. Please try again later.");
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipeForLetter();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <p>Loading recipes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Recipe List</h1>
      {recipes && recipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recipes.map((recipe) => {
            const description = `${recipe.strCategory || "Recipe"} • ${recipe.strArea || "International"}`;
            return (
              <Link
                key={recipe.idMeal}
                to={`/recipe/${recipe.idMeal}`}
                className="group"
              >
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 overflow-hidden h-full flex flex-col">
                  <div className="relative w-full h-32 overflow-hidden bg-gray-200 dark:bg-gray-700">
                    {recipe.strMealThumb ? (
                      <img
                        src={recipe.strMealThumb}
                        alt={recipe.strMeal}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        No image
                      </div>
                    )}
                  </div>
                  <div className="p-3 flex-1 flex flex-col">
                    <h2 className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-2 mb-1">
                      {recipe.strMeal}
                    </h2>
                    <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                      {description}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-gray-500">No recipes found.</p>
      )}
    </div>
  );
};

export default RecipeList;
