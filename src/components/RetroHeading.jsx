import PropTypes from 'prop-types';

const RetroHeading = ({ layout, toggleLayout, clearAllCards, retroCards }) => {
    const layoutIcon = layout === 'row' ? 'splitscreen_portrait' : 'splitscreen_landscape';
    const layoutTitle = layout === 'row' ? 'Toggle layout to column view' : 'Toggle layout to row view';

    // display a prompt to confirm clearing all cards
    const handleClearAll = () => {
      const confirmClear = window.confirm('Are you sure you want to clear all cards?');
      if (confirmClear) {
        clearAllCards();
      }
    };
  
    return (
      <>
        <h1>RetroBoard</h1>
        <div className="controlLayout">
        <button className="button" onClick={handleClearAll} title="Clear All Cards" disabled={retroCards.length === 0}>
          <span className="material-symbols-outlined clearAll">clear_all</span>
        </button>
          <button className="button" onClick={toggleLayout} title="Change layout">
            <span className="material-symbols-outlined layoutToggle" title={layoutTitle}>
              {layoutIcon}
            </span>
          </button>
        </div>
      </>
    );
  };

  RetroHeading.propTypes = {
    layout: PropTypes.string.isRequired,
    toggleLayout: PropTypes.func.isRequired,
    clearAllCards: PropTypes.func.isRequired,
    retroCards: PropTypes.array.isRequired,
  };
  
  export default RetroHeading;
  