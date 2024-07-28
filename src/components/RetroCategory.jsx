import RetroCard from './RetroCard';
import PropTypes from 'prop-types';

const RetroCategory = ({
  category,
  color,
  cards,
  addCard,
  updateCardText,
  deleteCard,
  likeCard,
  dislikeCard,
  moveCard,
  layout,
  onDropCard,
}) => {
  
  // handle drag and drop of cards
  const handleDragOver = (e) => e.preventDefault();

  const handleDrop = (e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    onDropCard(id, category);
  };

  return (
    <div 
      className="RetroCategory" 
      style={{ backgroundColor: color }} 
      onDragOver={handleDragOver} 
      onDrop={handleDrop}
    >
      <h2>{category}</h2>
      <button 
        type="button"
        className="ButtonAdd button button-default"
        onClick={() => addCard(category)} 
        title="Add New Card"
      >
        <span className="material-symbols-outlined add">add</span>
      </button>
      {cards.map((card) => (
        <RetroCard 
          key={card.id}
          card={card}
          updateCardText={updateCardText}
          deleteCard={deleteCard}
          likeCard={likeCard}
          dislikeCard={dislikeCard}
          moveCard={moveCard} 
          layout={layout}
          onDragStart={() => {}}
          onDragOver={() => {}}
          onDrop={() => {}}
        />
      ))}
    </div>
  );
};

RetroCategory.propTypes = {
  layout: PropTypes.string.isRequired,
  updateCardText: PropTypes.func.isRequired,
  deleteCard: PropTypes.func.isRequired,
  likeCard: PropTypes.func.isRequired,
  dislikeCard: PropTypes.func.isRequired,
  moveCard: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  cards: PropTypes.array.isRequired,
  addCard: PropTypes.func.isRequired,
  onDropCard: PropTypes.func.isRequired,
};

export default RetroCategory;