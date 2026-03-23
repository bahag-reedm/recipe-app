import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

interface RecipeDataI {
  id: number;
  name: string;
  ingredients: string[];
}

function App() {
  const [recipesData, setRecipesData] = useState<RecipeDataI[] | []>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error>();

  const fetchRecipes = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:3000/recipes");
      console.log(res.data);
      const data: RecipeDataI[] = res.data;
      setRecipesData(data);
    } catch (err) {
      console.log("error loading recipes");
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);
  return (
    <>
      <h1>Hello</h1>
      {!error &&
        !loading &&
        recipesData.map((recipe: RecipeDataI) => (
          <div key={recipe.id}>{recipe.name}</div>
        ))}
    </>
  );
}

export default App;
