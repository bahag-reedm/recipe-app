import { Routes, Route } from "react-router";
import "./App.css";
import RecipeDetail from "./components/RecipeDetail";
import RecipeList from "./components/RecipeList.tsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<RecipeList />} />
      <Route path="/recipe/:id" element={<RecipeDetail />} />
    </Routes>
  );
}

export default App;
