import { useEffect, useState, useRef, use } from "react";
import { loginUser, getMovies, deleteMovie, addMovie } from "../services/api";
import AddForm from "./AddForm";
import "../styles/HomePage.scss";

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const tokenRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    const query = searchQuery.toLowerCase();

    const filtered = movies.filter((movie) => {
      const titleMatch = movie.title.toLowerCase().includes(query);
      const actorMatch = (movie.actors || []).some((actor) =>
        actor.name?.toLowerCase().includes(query)
      );
      return titleMatch || actorMatch;
    });

    setFilteredMovies(filtered);
  }, [searchQuery, movies]);

  useEffect(() => {
    async function loginAndLoad() {
      try {
        const token = await loginUser();
        tokenRef.current = token;

        const moviesData = await getMovies(token);

        const sortedMovies = moviesData.sort((a, b) =>
          a.title.localeCompare(b.title, "en")
        );
        setMovies(sortedMovies);
      } catch (error) {
        console.error("Login error:", error);
      }
    }

    loginAndLoad();
  }, []);

  async function handleDelete(id) {
    try {
      await deleteMovie(id, tokenRef.current);
      setMovies(movies.filter((movie) => movie.id !== id));
    } catch (error) {
      console.error("Failed to delete movie:", error);
      alert("Failed to delete movie. Please try again later.");
    }
  }

  async function handleAddMovie(movie) {
    try {
      const added = await addMovie(movie, tokenRef.current);

      setMovies((prev) =>
        [...prev, added.data].sort((a, b) =>
          a.title.localeCompare(b.title, "en")
        )
      );
    } catch (err) {
      console.error("Error adding movie:", err);
      alert("Error adding movie.");
    }
  }

  async function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    if (file.type !== "text/plain") {
      alert("Only with .txt");
      return;
    }

    const text = await file.text();
    const moviesToAdd = parseMoviesFromText(text);

    for (const movie of moviesToAdd) {
      await handleAddMovie(movie);
    }
  }

  function parseMoviesFromText(text) {
    const movies = [];
    const blocks = text.split(/\n\s*\n/);

    blocks.forEach((block) => {
      const lines = block.split("\n").map((line) => line.trim());
      if (lines.length < 4) return;

      const titleLine = lines.find((l) => l.startsWith("Title:"));
      const yearLine = lines.find((l) => l.startsWith("Release Year:"));
      const formatLine = lines.find((l) => l.startsWith("Format:"));
      const starsLine = lines.find((l) => l.startsWith("Stars:"));

      if (!titleLine || !yearLine || !formatLine || !starsLine) return;

      const title = titleLine.replace("Title:", "").trim();
      const year = parseInt(yearLine.replace("Release Year:", "").trim()) || 0;
      const format = formatLine.replace("Format:", "").trim();
      const actors = starsLine
        .replace("Stars:", "")
        .split(",")
        .map((a) => a.trim());

      movies.push({ title, year, format, actors });
    });

    return movies;
  }

  return (
    <div>
      <div className="header-nav">
        <input
          type="text"
          placeholder="Search by title or actor"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />

        <div>
          <label>Movies from .txt file:</label>
          <input type="file" accept=".txt" onChange={handleFileUpload} />
        </div>

        <div className="add-movie-form">
          <button className="btn add-btn" onClick={() => setShowModal(true)}>
            Add movie
          </button>

          {showModal && (
            <AddForm
              onClose={() => setShowModal(false)}
              onAdd={handleAddMovie}
            />
          )}
        </div>
      </div>

      <ul>
        {filteredMovies.length > 0 &&
          filteredMovies.map((movie) => (
            <li key={movie.id}>
              <div className="movie-info">
                <b>{movie.title}</b> ({movie.year}) — {movie.format} <br />
                Actors:{" "}
                {(movie.actors || []).map((actor) => actor.name).join(", ") ||
                  "No actors listed"}
              </div>
              <button
                className="btn delete-btn"
                onClick={() => handleDelete(movie.id)}
              >
                Delete
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default HomePage;
