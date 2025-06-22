import { useState } from "react";
import "../styles/AddForm.scss";

function AddForm({ onClose, onAdd }) {
  const [newTitle, setNewTitle] = useState("");
  const [newYear, setNewYear] = useState("");
  const [newFormat, setNewFormat] = useState("DVD");
  const [newActors, setNewActors] = useState("");

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1899 }, (_, i) => 1900 + i);
  const formats = ["DVD", "VHS", "Blu-Ray"];

  async function handleAddMovie(e) {
    e.preventDefault();

    const yearNum = Number(newYear);
    if (yearNum < 1900 || yearNum > currentYear) {
      alert(`Year must be between 1900 and ${currentYear}`);
      return;
    }

    const actorNames = newActors
      .split(",")
      .map((name) => name.trim())
      .filter(Boolean);

    if (!actorNames.length) {
      alert("Please enter at least one actor");
      return;
    }

    const movie = {
      title: newTitle.trim(),
      year: yearNum,
      format: newFormat,
      actors: actorNames,
    };

    try {
      await onAdd(movie);
      onClose();
    } catch (err) {
      alert("Error adding movie");
      console.error(err);
    }
  }

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Add movie</h2>
        <form onSubmit={handleAddMovie}>
          <input
            type="text"
            placeholder="Title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            required
          />

          <div className="selects">
            <select
              value={newYear}
              onChange={(e) => setNewYear(e.target.value)}
              required
            >
              <option value="">Select year</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>

            <select
              value={newFormat}
              onChange={(e) => setNewFormat(e.target.value)}
              required
            >
              {formats.map((format) => (
                <option key={format} value={format}>
                  {format}
                </option>
              ))}
            </select>
          </div>

          <input
            type="text"
            placeholder="Actors"
            value={newActors}
            onChange={(e) => setNewActors(e.target.value)}
            required
          />

          <div className="buttons">
            <button type="submit">Add</button>
            <button type="button" onClick={onClose}>
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddForm;
