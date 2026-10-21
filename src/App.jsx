import { useState } from "react";
import ImageCard from "./components/ImageCard";
import { shuffle } from "./utils/shuffle";
import "./App.css";

const startingImages = [
  { id: 1, src: `${import.meta.env.BASE_URL}images/photo1.jpg`, title: "Yesterday" },
  { id: 2, src: `${import.meta.env.BASE_URL}images/photo2.jpg`, title: "Today" },
  { id: 3, src: `${import.meta.env.BASE_URL}images/photo3.jpg`, title: "Tomorrow" },
];

function App() {
  const [images, setImages] = useState(startingImages);
  const [selectedId, setSelectedId] = useState(null);
  const [likedIds, setLikedIds] = useState([]);
  const [query, setQuery] = useState("");

  // calculated from state (not stored)
  const selected = images.find((img) => img.id === selectedId);
  const likedCount = images.filter((img) => likedIds.includes(img.id)).length;
  const visible = images.filter((img) =>
    img.title.toLowerCase().includes(query.toLowerCase())
  );

  function sortByTitle() {
    setImages([...images].sort((a, b) => a.title.localeCompare(b.title)));
  }

  function removeImage(id) {
    setImages(images.filter((img) => img.id !== id));
    if (id === selectedId) setSelectedId(null);
  }

  function toggleLike(id) {
    setLikedIds(
      likedIds.includes(id)
        ? likedIds.filter((x) => x !== id)
        : [...likedIds, id]
    );
  }

  return (
    <>
      {selected && (
        <div className="spotlight">
          <img src={selected.src} alt={selected.title} />
          <button onClick={() => setSelectedId(null)}>Close</button>
        </div>
      )}

      <p>You liked {likedCount} images</p>

      <input
        placeholder="Search…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={() => setImages(shuffle(images))}>Shuffle</button>
      <button onClick={sortByTitle}>Sort A–Z</button>
      <button onClick={() => setImages(startingImages)}>Reset</button>

      <div className="board">
        {visible.map((img) => (
          <ImageCard
            key={img.id}
            image={img}
            liked={likedIds.includes(img.id)}
            onToggleLike={toggleLike}
            onRemove={removeImage}
            onSelect={setSelectedId}
          />
        ))}
      </div>
    </>
  );
}

export default App;
