import React, { useState, useEffect } from "react";
import "./styles.css";

// import { data } from "./data";
import Recepie from "./recepie";

const APP_ID = "2a4102d5";
const APP_KEY = "44b520d587780401b50e4b8d8c3c33df";
const TAG = "chicken";

function App() {
  const [recepies, setRecepies] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");

  const API_URL = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

  useEffect(() => {
    getRecepies();
  }, [query]);

  const getRecepies = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    // console.log(data.hits);
    setRecepies(data.hits);
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(search);
    setQuery(search);
  };

  return (
    <div className="App">
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          className="search-bar"
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button className="search-button" type="submit">
          Submit
        </button>
      </form>

      <div className="recepies">
        {recepies.map((recepie, id) => (
          <Recepie
            key={id}
            title={recepie.recipe.label}
            calories={recepie.recipe.calories}
            image={recepie.recipe.image}
            ingredients={recepie.recipe.ingredientLines}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
