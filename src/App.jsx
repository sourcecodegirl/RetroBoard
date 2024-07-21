import { useState } from 'react';
import RetroHeading from './components/RetroHeading';
import RetroBoard from './components/RetroBoard';
import './App.css';

const App = () => {

  const [layout, setLayout] = useState('row');
  const [retroCards, setRetroCards] = useState([
    { id: 1, category: 'Went Well', text: 'This is an example.', likes: 5, dislikes: 0 },
  ]);

  // toggle row or column layout
  const toggleLayout = () => {
    setLayout(layout === 'row' ? 'column' : 'row');
  };

  // clear all cards
  const clearAllCards = () => {
    setRetroCards([]);
  };

  return (
    <div id="root">
      <main className={`content ${layout}`}>
        <RetroHeading layout={layout} toggleLayout={toggleLayout} clearAllCards={clearAllCards} retroCards={retroCards} />
        <RetroBoard layout={layout} retroCards={retroCards} setRetroCards={setRetroCards} />
      </main>
    </div>
  );
};

export default App;