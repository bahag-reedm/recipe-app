import { Routes, Route } from "react-router";
import "./App.css";
import RecipeDetail from "./components/RecipeDetail";
import RecipeList from "./components/RecipeList.tsx";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<RecipeList />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
      </Routes>
    </>
  );
}

export default App;
