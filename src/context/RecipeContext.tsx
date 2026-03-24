import axios from "axios";
import { createContext, useEffect, useState } from "react";

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

interface RecipeContextType {
  recipes: RecipeDetail[];
  loading: boolean;
  error: string | null;
}

interface Props {
  children: React.ReactNode;
}

export const RecipeContext = createContext<RecipeContextType | null>(null);

export const RecipeProvider = ({ children }: Props) => {
  const [recipes, setRecipes] = useState<RecipeDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:3000/recipes`);
        setRecipes(Array.isArray(response.data) ? response.data : response.data.meals || []);
        setError(null);
      } catch (err) {
        setError("Failed to load recipes. Please try again later.");
        setRecipes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <RecipeContext.Provider value={{ recipes, loading, error }}>
      {children}
    </RecipeContext.Provider>
  );
};
