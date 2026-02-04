import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [animationPhase, setAnimationPhase] = useState('horizontal-line'); // horizontal-line, vertical-line, show-list, active
  const [showCompletion, setShowCompletion] = useState(false);

  useEffect(() => {
    // Animacijski flow na startu
    const timers = [];
    
    // Faza 1: Horizontalna linija (1-2s)
    timers.push(setTimeout(() => {
      setAnimationPhase('vertical-line');
    }, 2000));
    
    // Faza 2: Vertikalna linija (2-3s)
    timers.push(setTimeout(() => {
      setAnimationPhase('show-list');
    }, 3500));
    
    // Faza 3: Prikaži listu (4s)
    timers.push(setTimeout(() => {
      // Proveri da li postoji share ili saved data
      const urlParams = new URLSearchParams(window.location.search);
      const sharedText = urlParams.get('text') || urlParams.get('title') || '';
      
      if (sharedText) {
        const parsedItems = parseShoppingList(sharedText);
        if (parsedItems.length > 0) {
          setItems(parsedItems);
          setAnimationPhase('active');
          window.history.replaceState({}, '', '/');
        }
      } else {
        const savedItems = localStorage.getItem('vaki-items');
        if (savedItems) {
          setItems(JSON.parse(savedItems));
          setAnimationPhase('active');
        }
      }
    }, 4000));
    
    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);

  // Proveri completion
  useEffect(() => {
    if (items.length > 0 && items.every(item => item.checked) && !showCompletion) {
      setTimeout(() => {
        setShowCompletion(true);
      }, 500);
    }
  }, [items, showCompletion]);

  const parseShoppingList = (text) => {
    const lines = text.split('\n').filter(line => line.trim());
    const parsedItems = [];
    
    lines.forEach((line, index) => {
      line = line.trim();
      if (!line) return;
      
      line = line.replace(/^[-•*[\]]+\s*/, '');
      line = line.replace(/^\d+[.)]\s+/, '');
      
      if (line.length > 0) {
        parsedItems.push({
          id: Date.now() + index,
          text: line,
          checked: false
        });
      }
    });
    
    return parsedItems;
  };

  const toggleItem = (id) => {
    const updatedItems = items.map(item =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(updatedItems);
    localStorage.setItem('vaki-items', JSON.stringify(updatedItems));
  };

  const goBack = () => {
    setShowCompletion(false);
    setAnimationPhase('horizontal-line');
    setItems([]);
    localStorage.removeItem('vaki-items');
    
    // Restart animacija
    setTimeout(() => setAnimationPhase('vertical-line'), 2000);
    setTimeout(() => setAnimationPhase('show-list'), 3500);
    setTimeout(() => setAnimationPhase('active'), 4000);
  };

  // EKRAN 7: Completion sa BACK dugmetom
  if (showCompletion) {
    return (
      <div className="app completion-screen">
        <div className="completion-logo-container">
          <img 
            src="/vaki-logo-aki-transparent.svg" 
            alt="AKI" 
            className="completion-logo-base" 
          />
          <img 
            src="/vaki-checkmark-transparent.svg" 
            alt="✓" 
            className="completion-checkmark" 
          />
        </div>
        
        <button onClick={goBack} className="back-btn">
          ← BACK
        </button>
      </div>
    );
  }

  // EKRANI 1-4: Animacije linija
  if (animationPhase === 'horizontal-line' || animationPhase === 'vertical-line' || animationPhase === 'show-list') {
    return (
      <div className="app animation-screen">
        <div className="logo-top-left">
          <img src="/vaki-logo-full.svg" alt="VAKI" className="small-logo" />
        </div>
        
        <div className="line-container">
          {/* Horizontalna linija (Ekrani 1-2) */}
          <div className={`horizontal-line ${animationPhase !== 'horizontal-line' ? 'complete' : ''}`}></div>
          
          {/* Vertikalna linija (Ekrani 3-4) */}
          {(animationPhase === 'vertical-line' || animationPhase === 'show-list') && (
            <div className="vertical-line"></div>
          )}
        </div>
      </div>
    );
  }

  // EKRANI 5-6: Lista aktivna
  return (
    <div className="app active-screen">
      <div className="logo-top-left">
        <img src="/vaki-logo-full.svg" alt="VAKI" className="small-logo" />
      </div>
      
      {/* Gornja linija */}
      <div className="top-line"></div>
      
      {items.length === 0 ? (
        // Ako nema stavki, prikaži placeholder
        <div className="empty-state">
          <p>Deli listu namirnica iz bilo koje aplikacije</p>
          <p className="hint">Koristi Share → VAKI</p>
        </div>
      ) : (
        // Prikaži listu
        <div className="items-list">
          {items.map((item) => (
            <div 
              key={item.id} 
              className={`list-item ${item.checked ? 'checked' : ''}`}
              onClick={() => toggleItem(item.id)}
            >
              <div className="checkbox">
                {item.checked && <span className="checkmark">✓</span>}
              </div>
              <span className="item-text">{item.text}</span>
            </div>
          ))}
        </div>
      )}
      
      {/* Donja linija */}
      <div className="bottom-line"></div>
    </div>
  );
}

export default App;