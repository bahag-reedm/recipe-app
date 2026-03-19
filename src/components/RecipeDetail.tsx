import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { RecipeContext } from "../context/RecipeContext";

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
  const context = useContext(RecipeContext);
  const [recipe, setRecipe] = useState<RecipeDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!context) return;

    const foundRecipe = context.recipes.find((r) => r.idMeal === id);

    if (foundRecipe) {
      setRecipe(foundRecipe as RecipeDetail);
      setLoading(false);
      return;
    }

    if (context.loading) {
      setLoading(true);
      return;
    }

    if (!context.loading && !foundRecipe) {
      setError("Recipe not found.");
      setLoading(false);
    }
  }, [id, context]);

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
