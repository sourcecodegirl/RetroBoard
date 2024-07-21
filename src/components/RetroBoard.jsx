import RetroCategory from './RetroCategory';
import PropTypes from 'prop-types';

const categories = ['Went Well', 'To Improve', 'Action Items'];
const categoryColors = {
  'Went Well': 'var(--wentwell-color)',
  'To Improve': 'var(--toimprove-color)',
  'Action Items': 'var(--actionitems-color)',
};

const RetroBoard = ({ layout = 'row', retroCards, setRetroCards }) => {

  const addCard = (category) => {
    const newCard = { id: Date.now(), category, text: '', likes: 0, dislikes: 0 };
    setRetroCards((prevCards) => [...prevCards, newCard]);
  };

  const updateCardText = (id, newText) => {
    setRetroCards((prevCards) =>
      prevCards.map((card) => (card.id === id ? { ...card, text: newText } : card))
    );
  };

  const deleteCard = (id) => {
    setRetroCards((prevCards) => prevCards.filter((card) => card.id !== id));
  };

  const updateCardCount = (id, type) => {
    setRetroCards((prevCards) =>
      prevCards.map((card) => (card.id === id ? { ...card, [type]: card[type] + 1 } : card))
    );
  };

  // likes and dislikes
  const likeCard = (id) => updateCardCount(id, 'likes');
  const dislikeCard = (id) => updateCardCount(id, 'dislikes');

  // move cards
  const moveCard = (id, direction) => {
    const cardIndex = retroCards.findIndex((card) => card.id === id);
    const currentCategory = retroCards[cardIndex].category;
    const currentCategoryIndex = categories.indexOf(currentCategory);

    const getNewCategoryIndex = (direction) => {
      return direction === 'left'
        ? (currentCategoryIndex - 1 + categories.length) % categories.length
        : (currentCategoryIndex + 1) % categories.length;
    };

    const newCategoryIndex = getNewCategoryIndex(direction);
    const newCards = [...retroCards];
    newCards[cardIndex].category = categories[newCategoryIndex];
    setRetroCards(newCards);
  };

  // handle drag and drop of cards
  const handleDropCard = (id, newCategory) => {
    setRetroCards((prevCards) =>
      prevCards.map((card) => (card.id === parseInt(id) ? { ...card, category: newCategory } : card))
    );
  };

  return (
    <div className={`RetroApp ${layout}`}>
      {categories.map((category) => (
        <RetroCategory
          key={category}
          category={category}
          color={categoryColors[category]}
          cards={retroCards.filter((card) => card.category === category)}
          addCard={addCard}
          updateCardText={updateCardText}
          deleteCard={deleteCard}
          likeCard={likeCard}
          dislikeCard={dislikeCard}
          moveCard={moveCard}
          layout={layout}
          onDropCard={handleDropCard}
        />
      ))}
    </div>
  );
};

RetroBoard.propTypes = {
  layout: PropTypes.string.isRequired,
  retroCards: PropTypes.array.isRequired,
  setRetroCards: PropTypes.func.isRequired,
};

export default RetroBoard;