import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const categories = ['Went Well', 'To Improve', 'Action Items'];

const RetroCard = ({
  card = { id: null, text: '', likes: 0, dislikes: 0 },
  updateCardText = () => {},
  deleteCard = () => {},
  likeCard = () => {},
  dislikeCard = () => {},
  moveCard = () => {},
  layout = 'row',
  onDragStart = () => {},
  onDragOver = () => {},
  onDrop = () => {},
}) => {

  const cardRef = useRef(null);
  const textareaRef = useRef(null);

  const currentCategoryIndex = categories.indexOf(card.category);

  // change tooltip to display left or right or up or down based on layout direction
  const getTooltip = (direction) => {
    const indexChange = direction === 'left' || direction === 'up' ? -1 : 1;
    const newIndex = (currentCategoryIndex + indexChange + categories.length) % categories.length;
    return `Move to ${categories[newIndex]}`;
  };

  // expand textarea when more text is typed
  const adjustHeight = (event) => {
    event.target.style.height = 'auto';
    event.target.style.height = `${event.target.scrollHeight}px`;
    updateCardText(card.id, event.target.value);
  };

  // keep textarea height expanded
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [card.text]);

  // drag and drop cards
  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', card.id);
    e.dataTransfer.setDragImage(cardRef.current, 0, 0);
    onDragStart(e, card.id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    onDragOver(e, card.id);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    onDrop(e, card.id);
  };

  // generate random id if one doesn't exist
  const generateRandomId = () => {
    return Date.now() + Math.random().toString(36).substring(2, 9);
  };

  if (!card.id) {
    console.warn('Card ID is missing, generating random ID.');
    card.id = generateRandomId();
  }

  return (
    <div
      className="RetroCard"
      ref={cardRef}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div
        className="move-icon"
        draggable
        onDragStart={handleDragStart}
        title="Drag to move"
      >
        <span className="material-symbols-outlined">drag_indicator</span>
      </div>
      <textarea
        className="textbox"
        ref={textareaRef}
        placeholder="Enter text here"
        value={card.text}
        id={card.id}
        onChange={adjustHeight}
        title="Click here to enter text"
      />
      <div className="button-group">
        <div className="like-dislike-buttons">
          <button type="button" className="button" onClick={() => likeCard(card.id)} title="Like">
            <span className="material-symbols-outlined like">thumb_up</span> {card.likes}
          </button>
          <button type="button" className="button" onClick={() => dislikeCard(card.id)} title="Dislike">
            <span className="material-symbols-outlined dislike">thumb_down</span> {card.dislikes}
          </button>
        </div>
        <button
          type="button"
          className="button delete-button"
          onClick={() => deleteCard(card.id)}
          title="Delete Card"
        >
          <span className="material-symbols-outlined delete">delete</span>
        </button>
        <div className="move-buttons">
          <button
            type="button"
            className="button"
            onClick={() => moveCard(card.id, layout === 'column' ? 'up' : 'left')}
            title={getTooltip(layout === 'column' ? 'up' : 'left')}
          >
            <span className="material-symbols-outlined up left">
              {layout === 'column' ? 'move_selection_up' : 'move_selection_left'}
            </span>
          </button>
          <button
            type="button"
            className="button"
            onClick={() => moveCard(card.id, layout === 'column' ? 'down' : 'right')}
            title={getTooltip(layout === 'column' ? 'down' : 'right')}
          >
            <span className="material-symbols-outlined down right">
              {layout === 'column' ? 'move_selection_down' : 'move_selection_right'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

RetroCard.propTypes = {
  layout: PropTypes.string.isRequired,
  updateCardText: PropTypes.func.isRequired,
  card: PropTypes.shape({
    id: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    dislikes: PropTypes.number.isRequired,
  }).isRequired,
  deleteCard: PropTypes.func.isRequired,
  likeCard: PropTypes.func.isRequired,
  dislikeCard: PropTypes.func.isRequired,
  moveCard: PropTypes.func.isRequired,
  onDragStart: PropTypes.func.isRequired,
  onDragOver: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
};

export default RetroCard;