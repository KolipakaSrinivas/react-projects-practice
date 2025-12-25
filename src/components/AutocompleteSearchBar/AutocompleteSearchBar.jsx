import { useEffect, useState } from "react";
import "./styles.css";

export default function AutocompleteSearchBar() {
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");
  const [onShow, setOnShow] = useState(false);
  const [cache, setCache] = useState({});

  const fetchData = async () => {
    if (!input) {
      setData([]);
      return;
    }

    // ✅ Serve from cache
    if (cache[input]) {
      console.log("Calling from cache");
      setData(cache[input]);
      return;
    }

    try {
      console.log("API Call");
      const res = await fetch(
        `https://dummyjson.com/recipes/search?q=${input}`
      );
      const json = await res.json();

      setData(json.recipes);
      setCache((prev) => ({
        ...prev,
        [input]: json.recipes,
      }));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData();
    }, 300); // ✅ debounce

    return () => clearTimeout(timer);
  }, [input]);

  return (
    <div className="container">
      <h1>Autocomplete Search Bar</h1>

      <input
        type="text"
        placeholder="Search recipes..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onFocus={() => setOnShow(true)}
        onBlur={() => setTimeout(() => setOnShow(false), 200)}
      />

      {onShow && data.length > 0 && (
        <div className="result-container">
          {data.map((item) => (
            <div
              key={item.id}
              className="result"
              onMouseDown={() => setInput(item.name)}
            >
              {item.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
