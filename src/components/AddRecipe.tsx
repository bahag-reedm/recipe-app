import { useState } from "react";
import axios from "axios";

interface AddRecipeProps {
  fetchRecipes: () => void;
}

interface NewRecipeData {
  name: string;
  category: string;
  area: string;
  image: string;
}

const AddRecipe = ({ fetchRecipes }: AddRecipeProps) => {
  const [newRecipe, setNewRecipe] = useState<NewRecipeData>({
    name: "",
    category: "",
    area: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await axios.post(`http://localhost:3000/recipes`, newRecipe);
      setNewRecipe({
        name: "",
        category: "",
        area: "",
        image: "",
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      fetchRecipes();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add recipe");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Add New Recipe
      </h2>

      {error && (
        <div className="mb-4 p-4 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-lg text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-lg text-sm">
          Recipe added successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
          >
            Recipe Name *
          </label>
          <input
            id="name"
            type="text"
            value={newRecipe.name}
            onChange={(e) =>
              setNewRecipe({ ...newRecipe, name: e.target.value })
            }
            required
            placeholder="e.g., Spaghetti Carbonara"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition"
          />
        </div>

        <div>
          <label
            htmlFor="category"
            className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
          >
            Category *
          </label>
          <input
            id="category"
            type="text"
            value={newRecipe.category}
            onChange={(e) =>
              setNewRecipe({ ...newRecipe, category: e.target.value })
            }
            required
            placeholder="e.g., Pasta"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition"
          />
        </div>

        <div>
          <label
            htmlFor="area"
            className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
          >
            Cuisine/Area *
          </label>
          <input
            id="area"
            type="text"
            value={newRecipe.area}
            onChange={(e) =>
              setNewRecipe({ ...newRecipe, area: e.target.value })
            }
            required
            placeholder="e.g., Italian"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition"
          />
        </div>

        <div>
          <label
            htmlFor="image"
            className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
          >
            Image
          </label>
          <input
            id="image"
            type="text"
            value={newRecipe.image}
            onChange={(e) =>
              setNewRecipe({ ...newRecipe, image: e.target.value })
            }
            placeholder="Link to an image"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white font-semibold px-6 py-2 rounded-lg transition"
        >
          {loading ? "Adding..." : "Add Recipe"}
        </button>
      </form>
    </div>
  );
};

export default AddRecipe;
