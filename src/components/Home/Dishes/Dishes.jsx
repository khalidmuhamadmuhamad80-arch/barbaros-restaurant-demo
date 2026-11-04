
import './Dishes.css';
import { dishes } from '../../../data/menuData';
import DishCard from '../DishCard/DishCard';

function Dishes({ onAdd }) {
  return (
    <section className="dishes-section" id="dishes">
      <div className="dishes-heading">
        <h2>منيو الشيف نونوه للأكلات الشعبية</h2>
      </div>

      <div className="dishes-grid">
        {dishes.map((dish) => (
          <DishCard
            key={dish.id}
            item={dish}
            onAdd={onAdd}
          />
        ))}
      </div>
    </section>
  );
}

export default Dishes;
