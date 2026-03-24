import { useContext } from "react";
import { Link } from "react-router";
import { RecipeContext } from "../context/RecipeContext";
import AddRecipe from "./AddRecipe";

const RecipeList = () => {
  const context = useContext(RecipeContext);

  if (!context) {
    return (
      <div className="error">
        <p>Context not available</p>
      </div>
    );
  }

  const { recipes, loading, error } = context;

  const fetchRecipes = async () => {
    // Trigger context refetch by calling the fetch function
    // This will be handled by the context provider
    window.location.reload();
  };

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
    <>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Recipe List</h1>
        {recipes && recipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recipes.map((recipe) => {
              const description = `${recipe.category || "Recipe"} • ${recipe.area || "International"}`;
              return (
                <Link
                  key={recipe.id}
                  to={`/recipe/${recipe.id}`}
                  className="group"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 overflow-hidden h-full flex flex-col">
                    <div className="relative w-full h-32 overflow-hidden bg-gray-200 dark:bg-gray-700">
                      {recipe.image ? (
                        <img
                          src={recipe.image}
                          alt={recipe.name}
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
                        {recipe.name}
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

      <div className="p-8 max-w-2xl mx-auto">
        <AddRecipe fetchRecipes={fetchRecipes} />
      </div>
    </>
  );
};

export default RecipeList;
