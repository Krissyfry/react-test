import "./ImageCard.css";

function ImageCard({ image, liked, onToggleLike, onRemove, onSelect }) {
  return (
    <div className="card">
      <img src={image.src} alt={image.title} onClick={() => onSelect(image.id)} />
      <p>{image.title}</p>
      <button onClick={() => onToggleLike(image.id)}>{liked ? "♥" : "♡"}</button>
      <button onClick={() => onRemove(image.id)}>✕</button>
    </div>
  );
}

export default ImageCard;