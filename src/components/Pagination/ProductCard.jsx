import "./styles.css";
export default function ProductCard({ title, images }) {
  return (
    <div className="product-card">
      <img src={images} alt={title + "img"} />
      <p>{title}</p>
    </div>
  );
}
