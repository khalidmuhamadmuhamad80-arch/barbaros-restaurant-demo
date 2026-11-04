
import './DishCard.css';

function DishCard({ item, onAdd, compact = false }) {
  return (
    <article className={`dish-card ${compact ? 'compact' : ''}`}>
      <div
        className="dish-image"
        style={{
          backgroundColor: item.color,
          backgroundImage: item.image ? `url("${item.image}")` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
        role="img"
        aria-label={item.name}
      />

      <div className="dish-info">
        <h3 className="dish-name">{item.name}</h3>

        {!compact && item.description && (
          <p className="dish-description">{item.description}</p>
        )}

        <div className="dish-footer">
          <span className="dish-price">{item.price} جنيه</span>

          <button
            type="button"
            className="dish-add-button"
            onClick={() => onAdd(item)}
          >
            أضف +
          </button>
        </div>
      </div>
    </article>
  );
}

export default DishCard;
