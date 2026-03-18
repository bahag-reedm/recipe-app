import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

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
    } catch (err) {
      setError("Failed to load recipe details. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchRecipeDetail();
    }
  }, []);

  return (
    <>
      {loading && <h1>Loading</h1>}
      {recipe && !loading && (
        <>
          <h1>{recipe?.strMeal}</h1>
          <h2>
            {recipe?.strCategory} | {recipe?.strArea}
          </h2>
          <h3> {recipe?.strTags} </h3>
          <p> {recipe?.strInstructions} </p>
        </>
      )}
      {error && <h1> {error} </h1>}
    </>
  );
};

export default RecipeDetail;
