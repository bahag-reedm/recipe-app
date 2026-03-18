import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";

interface RecipeDetail {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string;
  strYoutube: string;
  [key: string]: string;
}

const RecipeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<RecipeDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRecipeDetail = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
      );
      const meals = response.data.meals;
      if (meals && meals.length > 0) {
        setRecipe(meals[0]);
      } else {
        setError("Recipe not found.");
      }
    } catch {
      setError("Failed to load recipe details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipeDetail();
  }, []);

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {loading && (
        <div className="text-center py-20">
          <p className="text-gray-500 animate-pulse">Loading recipe...</p>
        </div>
      )}

      {error && (
        <div className="text-center py-20">
          <p className="text-red-500">{error}</p>
        </div>
      )}

      {recipe && !loading && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="w-full h-64 bg-gray-200 dark:bg-gray-700 overflow-hidden">
            <img
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-6 md:p-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {recipe.strMeal}
            </h1>

            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {recipe.strCategory} • {recipe.strArea}
            </p>

            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Instructions
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line">
                {recipe.strInstructions}
              </p>
            </div>

            {recipe.strYoutube && (
              <a
                href={recipe.strYoutube}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-sm bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded transition"
              >
                ▶ Watch Recipe
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeDetail;
